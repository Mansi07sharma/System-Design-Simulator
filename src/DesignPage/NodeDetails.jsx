import React from 'react'


function NodeDetails({nodeDetails}) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Node Performance Details</h2>
      
      {Object.values(nodeDetails).map((node, index) => (
        <div key={index} className='bg-gray-50 p-5 border border-gray-300 rounded-xl'>
          <div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{node.name}</div>
              <div 
                className={`px-2 py-1 text-sm font-semibold ${node.availability*100 > 99.95 ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}}}`}
              >
                {(node.availability*100).toFixed(2)}% uptime
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-2">
              {/* Latency */}
              <div>
                <p className="text-sm text-gray-600">Latency</p>
                <p className={`mt-1 text-xl font-bold text-${node.latency <= 200 ? 'green-600' :'yellow-600'}`}>
                  {(node.latency).toFixed(2)}
                </p>
              </div>
              
              {/* Error Rate */}
              <div>
                <p className="text-sm text-gray-600">Error Rate</p>
                <p className={`mt-1 text-xl font-bold text-${node.errorRate*100 <= 3.00 ? 'green-600' :'yellow-600' }`}>
                  {(node.errorRate*100).toFixed(2)}%
                </p>
              </div>
              
              {/* Capacity Usage */}
              <div>
                <p className="text-sm text-gray-600">Capacity Usage</p>
                <p className={`mt-1 text-xl font-bold text-${((node.incoming*100)/node.capacity) < (node.capacity/2) ? 'green-600' :'yellow-600' }`}>
                  {((node.incoming*100)/node.capacity).toFixed(2)}%
                </p>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-600">Incoming: <span className="font-medium text-black">{node.incoming} RPS</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Outgoing: <span className="font-medium text-black">{node.outgoing} RPS</span></p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacity: <span className="font-medium text-black">{node.capacity} RPS</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NodeDetails
