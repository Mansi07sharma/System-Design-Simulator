async function createAdj(edges) {
    const map = new Map();
    const inDegree = new Map();

    for (let e in edges) {
        if (!map.has(edges[e].target)) {
            map.set(edges[e].target, []);
        }
        map.get(edges[e].target).push(edges[e].source);
        inDegree.set(edges[e].source, (inDegree.get(edges[e].source) || 0) + 1);
        if (!inDegree.has(edges[e].target)) {
            inDegree.set(edges[e].target, 0);
        }
    }

    return { map, inDegree };
}

async function topSort(map, nodes, rps, inDegree) {
    // Kahn's algorithm
    const queue = [];
    const inRps = new Map(); // incoming RPS for each node
    const nodeDetails = {} // to store node details by id

    const copyDegree = new Map(inDegree); // copy to avoid mutating original

    let totalLatency = 0;
    let totalCapacity = Infinity;

    inDegree.forEach((deg, node) => {
        console.log(deg, node);
        if (deg === 0) {
            queue.push(node);
            inRps.set(node, rps);
        }
    });

    while (queue.length > 0) {
        const node = queue.shift();
        const currentNode = nodes.find(n => n.id === node);
        let incomingRps = inRps.get(node) || 0;

        // Calculate latency and throughput for the current node
        const avgLatency = (currentNode.data.metrics.latency?.min + currentNode.data.metrics.latency?.max) / 2 || 0;
        let latency = avgLatency;
        let capacityRps = currentNode.data.metrics.throughput ?? currentNode.data.metrics.capacity ?? Infinity;
        let outgoingRps = incomingRps;
        let errorRate = currentNode.data.metrics.errorRate ?? 0;
        let availability = currentNode.data.metrics.availability ?? 1;

        //if node is cache
        if (currentNode.data.key === "cache" || currentNode.data.key === "cdn") {
            let hit = currentNode.data.metrics.hitRate ?? currentNode.data.metrics.cacheHitRate;
            latency = hit * currentNode.data.metrics.latency.min + (1 - hit) * currentNode.data.metrics.latency.max;
            outgoingRps = incomingRps * (1 - hit); // only misses propagate
        } else if (currentNode.data.key === "message-queue") {
            capacityRps *= currentNode.data.metrics.partitionCount;
        } else if (currentNode.data.key === "nosql-db" || currentNode.data.key === "relational-db") {
            if (currentNode.data.metrics.consistency === "strong") {
                latency *= 1.5; //strong consistency adds 50% latency
            }
        } else if (currentNode.data.key === "load-balancer") {
            latency *= 1.2; //load balancer adds 20% latency
            const children = map.get(node) || [];
            const numChildren = children.length || 1;
            children.forEach(child => {
                inRps.set(child, (inRps.get(child) || 0) + (outgoingRps / numChildren));
            })
        } else if (currentNode.data.category === "compute" || currentNode.data.category === "networking") {
            //only capacity matters otherwise all miss reqs
            outgoingRps = Math.min(incomingRps, capacityRps);
        }

        //if not load balancer, distribute RPS equally to children
        if (currentNode.data.key !== "load-balancer") {
            const chidren = map.get(node) || [];
            chidren.forEach(child => {
                inRps.set(child, (inRps.get(child) || 0) + outgoingRps)
            })
        }

        //decrease inDegree of neighbors
        const neighbors = map.get(node) || [];
        neighbors.forEach(neighbor => {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        });

        // Store the calculated details
        nodeDetails[node] = {
            id: node,
            name: currentNode.data.label,
            latency,
            incoming:incomingRps,
            outgoing:outgoingRps,
            capacity:capacityRps,
            errorRate,
            availability
        };
    }

    function simulatePaths(nodeID, pathLatency, pathCapacity, pathAvailability, pathError, results, nodeAttach) {
        const node = nodeDetails[nodeID]
        nodeAttach.push(node.name)

        const childs = map.get(nodeID) || [];
        const newLatency = pathLatency + node.latency;
        let newCapacity = pathCapacity;
        let n = nodes.find(n => n.id === nodeID)
        if(n.data.key!=="cache"){
            newCapacity = Math.min(pathCapacity, node.capacity);
        }
        const newAvailability = pathAvailability * node.availability;
        const newError = 1 - (1 - pathError) * (1 - node.errorRate);

        if (childs.length === 0) {
            resultPaths.push({ latency: newLatency, capacity: newCapacity, availability: newAvailability, errorRate: newError, path: [...nodeAttach] });
        } else {
            childs.forEach(child => {
                simulatePaths(child, newLatency, newCapacity, newAvailability, newError, results, nodeAttach);
            })
        }

        nodeAttach.pop();
    }

    //SIMULATE ON EACH PATH AND CAL LATENCY AND CAPACITY
    const resultPaths = [];
    nodes.forEach(node => {
        if (copyDegree.get(node.id) === 0) {
            simulatePaths(node.id, 0, Infinity, 1, 0, resultPaths, []);
        }
    })

    console.log(resultPaths);

    //aggregate path results
    const avgLatency = resultPaths.reduce((sum, p) => sum + p.latency, 0) / resultPaths.length;
    const avgCapacity = Math.min(...resultPaths.map(p => p.capacity));
    const overallAvailability = resultPaths.reduce((sum, p) => sum + p.availability, 0) / resultPaths.length;
    const overallError = resultPaths.reduce((sum, p) => sum + p.errorRate, 0) / resultPaths.length;

    return {
        avgLatency, avgCapacity, overallAvailability, overallError, paths: resultPaths, nodeDetails
    };
};


async function test(totalLatency, totalCapacity, nodeDetails, rps, slalatency, nodes) {
    const capOk = totalCapacity >= rps;
    const latOk = totalLatency <= slalatency;

    const bottleneckNodes = [];
    for (let nodeId in nodeDetails) {
        const details = nodeDetails[nodeId];
        if (details.capacityRps < rps) {
            bottleneckNodes.push(nodeId);
        }
    }

    const suggestions = [];
    bottleneckNodes.forEach(nodeId => {
        const node = nodes.find(n => n.id === nodeId);
        if (node.data.category === "compute") {
            suggestions.push(`Increase replication or choose a more powerful instance type for compute node ${node.data.key}.`);
        } else if (node.data.category === "database") {
            suggestions.push(`DB is bottleneck. Add read replicas or scale instance for ${node.data.key}.`);
        } else if (node.data.key === "message-queue") {
            suggestions.push(`Increase partition count or choose a more powerful instance type for ${node.data.key}.`);
        } else if (node.data.key === "load-balancer") {
            suggestions.push(`Add more instances behind the ${node.data.key}.`);
        } else if (node.data.key === "cache" || node.data.key === "cdn") {
            suggestions.push(`Increase ${node.data.key} size or improve hit rate .`);
        }
    });

    if (!capOk && bottleneckNodes.length === 0) {
        suggestions.push("Path capacity insufficient. Consider horizontal scaling or adding caches.");
    }

    if (!latOk) {
        suggestions.push("Latency exceeds SLA. Add cache before DB, or reduce per-node latency by upgrading instances.");
    }

    return { capOk, latOk, bottleneckNodes, suggestions };
}




export { createAdj, topSort, test };