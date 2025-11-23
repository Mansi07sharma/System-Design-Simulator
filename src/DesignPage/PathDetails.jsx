import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

function PathDetails({ paths }) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Path Analysis</h2>

            {paths.map((det, index) => (
                <div key={index} className='bg-gray-50 border border-gray-300 rounded-xl'>
                    <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Path {index+1}</h3>
                            <div className="flex gap-4">
                                <div
                                    className={`text-sm font-semibold ${det.latency<=200?'text-green-600':'text-yellow-500'}`}
                                >
                                    {(det.latency).toFixed(2)} latency
                                </div>
                                <div
                                    className={`text-sm font-semibold ${det.availability*100 > 99.90?'text-green-600':'text-yellow-500'}`}
                                >
                                    {(det.availability*100).toFixed(2)}% availability
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-2 rounded-xl">
                            {det.path.map((node,nodeIndex) => (
                                <div key={nodeIndex} className="flex items-center gap-2">
                                    <span className="rounded text-gray-600 px-3 py-1 text-sm font-medium">
                                        {node}
                                    </span>
                                    {nodeIndex < det.path.length - 1 && (
                                        <ArrowRight className="h-4 w-4 text-gray-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PathDetails
