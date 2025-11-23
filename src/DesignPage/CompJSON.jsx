const components = [
  {
    style: { width: 50, height: 50 ,backgroundColor: "#3B82F6",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'client',
      label: 'Client',
      category: 'compute',
      icon: 'ri-smartphone-line',
      color: 'bg-blue-500',
      description: 'Frontend application or mobile client that initiates requests',
      metrics: {
        availability: 0.99,
        errorRate: 0.01
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#22C55E",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'load-balancer',
      label: 'Load Balancer',
      category: 'networking',
      icon: 'ri-scales-3-line',
      color: 'bg-green-500',
      description: 'Distributes incoming requests across multiple servers',
      metrics: {
        latency: { min: 1, max: 5, unit: "ms" },
        throughput: 100000,
        availability: 0.9999,
        scalability: "horizontal"
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#A855F7",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'api-gateway',
      label: 'API Gateway',
      category: 'networking',
      icon: 'ri-door-open-line',
      color: 'bg-purple-500',
      description: 'Single entry point for all client requests to backend services',
      metrics: {
        latency: { min: 5, max: 10, unit: "ms" },
        throughput: 50000,
        availability: 0.999,
        faultTolerance: true
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#6366F1",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'web-server',
      label: 'Web Server',
      category: 'compute',
      icon: 'ri-server-line',
      color: 'bg-indigo-500',
      description: 'Handles HTTP requests and serves web content',
      metrics: {
        latency: { min: 10, max: 20, unit: "ms" },
        throughput: 10000,
        availability: 0.999,
        scalability: "horizontal"
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#F97316",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'application-server',
      label: 'App Server',
      category: 'compute',
      icon: 'ri-code-box-line',
      color: 'bg-orange-500',
      description: 'Executes business logic and application code',
      metrics: {
        latency: { min: 20, max: 50, unit: "ms" },
        throughput: 5000,
        availability: 0.999,
        scalability: "horizontal"
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#EF4444",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'cache',
      label: 'Cache (Redis)',
      category: 'storage',
      icon: 'ri-flashlight-line',
      color: 'bg-red-500',
      description: 'In-memory data store for fast data retrieval',
      metrics: {
        latency: { min: 0.1, max: 1, unit: "ms" },
        capacity: 100,
        hitRate: 0.9,
        availability: 0.999,
        evictionPolicy: "LRU"
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#2563EB",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'relational-db',
      label: 'Relational DB',
      category: 'storage',
      icon: 'ri-database-line',
      color: 'bg-blue-600',
      description: 'SQL database for structured data with ACID properties',
      metrics: {
        latency: { min: 5, max: 50, unit: "ms" },
        capacity: 5000,
        consistency: "strong",
        availability: 0.9995
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#16A34A",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'nosql-db',
      label: 'NoSQL DB',
      category: 'storage',
      icon: 'ri-leaf-line',
      color: 'bg-green-600',
      description: 'Document or key-value database for flexible data models',
      metrics: {
        latency: { min: 1, max: 20, unit: "ms" },
        capacity: 1000000,
        consistency: "eventual",
        availability: 0.9999
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#EAB308",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'message-queue',
      label: 'Message Queue',
      category: 'messaging',
      icon: 'ri-send-plane-line',
      color: 'bg-yellow-500',
      description: 'Asynchronous communication between services',
      metrics: {
        latency: { min: 10, max: 50, unit: "ms" },
        throughput: 1000000,
        partitionCount: 10,
        durability: 0.99999,
        availability: 0.9999
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#06B6D4",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'object-storage',
      label: 'Object Storage',
      category: 'storage',
      icon: 'ri-folder-cloud-line',
      color: 'bg-cyan-500',
      description: 'Scalable storage for files, images, and unstructured data',
      metrics: {
        latency: { min: 50, max: 200, unit: "ms" },
        capacity: 1000000000,
        durability: 0.999999999,
        availability: 0.9999,
        cost: 0.023
      }
    }
  },
  {
    style: { width: 50, height: 50 ,backgroundColor: "#14B8A6",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    position: { x: 0, y: 0 },
    data: {
      key: 'cdn',
      label: 'CDN',
      category: 'networking',
      icon: 'ri-global-line',
      color: 'bg-teal-500',
      description: 'Content delivery network for faster global content distribution',
      metrics: {
        latency: { min: 10, max: 30, unit: "ms" },
        cacheHitRate: 0.9,
        availability: 0.9999,
        coverage: "global"
      }
    }
  },
  {
    position: { x: 0, y: 0 },
    style: { width: 50, height: 50 ,backgroundColor: "#6B7280",color: "white", display: "flex", alignItems: "center", justifyContent: "center",fontSize: "8px",},
    data: {
      key: 'worker',
      label: 'Background Worker',
      category: 'compute',
      icon: 'ri-tools-line',
      color: 'bg-gray-500',
      description: 'Processes background tasks and long-running operations',
      metrics: {
        latency: { min: 100, max: 1000, unit: "ms" },
        throughput: 1000,
        availability: 0.999,
        scalability: "horizontal",
        reliability: "retry-with-DLQ"
      }
    }
  }
];
export default components;