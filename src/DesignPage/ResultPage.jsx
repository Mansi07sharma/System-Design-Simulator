import React, { useState } from 'react'
import { BarChart3, X, Server, Route, Lightbulb } from 'lucide-react'
import Overview from './Overview'
import NodeDetails from './NodeDetails'
import PathDetails from './PathDetails'
import Suggestions from './Suggestions'

function ResultPage({results, setShowResults}) {
    const [activeTab, setActiveTab] = useState("overview");

    const ite = [
        {
            id: "overview",
            label: "Overview",
            icon: BarChart3,
        },
        {
            id: "node-details",
            label: "Node Details",
            icon: Server,
        },
        {
            id: "path-analysis",
            label: "Path Analysis",
            icon: Route,
        },
        {
            id: "recommendations",
            label: "Recommendations",
            icon: Lightbulb,
        },
    ]

    return (
        <div className='flex items-center justify-center h-screen '>
            <div className='h-[90%] w-[80%] border-2 border-gray-300 rounded-lg relative bg-white'>
                {/* header */}
                <div>
                    <div className="flex ite-center justify-between border-b-2 border-gray-300 px-6 py-4 bg-gray-50">
                        <div className="flex ite-center gap-3">
                            <div className="flex h-10 w-10 ite-center justify-center rounded-lg bg-orange-100">
                                <BarChart3 className="h-5 w-5 text-orange-400" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold ">System Analysis Results</h1>
                                <p className="text-xs text-gray-700">
                                    Generated on {new Date(results.timeStamp).toLocaleDateString()} {new Date(results.timeStamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                        <button onClick={()=>setShowResults(false)} className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-100">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* body */}
                <div className='flex h-[86%]'>
                    {/* sidebar */}
                    <div className="w-[22%] justify-center border-r-2 border-gray-300 bg-gray-50">
                        <div className='mt-3 space-y-1'>
                            {ite.map((item => {
                                return (
                                    <div className={`flex ite-center gap-3 p-6 pt-3 pb-3 m-2 rounded-lg cursor-pointer ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : ' text-gray-700 hover:bg-gray-100'}`}
                                        onClick={() => setActiveTab(item.id)}>
                                        <item.icon className="h-4 w-4" />
                                        <h1 className='font-semibold'>{item.label}</h1>
                                    </div>
                                )
                            }))}
                        </div>
                    </div>

                    {/* main content */}
                    <div className='overflow-y-auto w-full p-6'>
                        <div className=''>
                            {activeTab === "overview" ? <Overview overallStatus={results.overallStatus}
                                avgLatency={results.avgLatency} overallAvailability={results.overallAvailability}
                                avgCapacity={results.avgCapacity} bottleNecks={results.bottleneckNodes}
                                overallError={results.overallError} slaLatency={results.slaLatency} rps={results.rps} /> :
                                activeTab === "node-details" ? <NodeDetails nodeDetails={results.nodeDetails} /> :
                                    activeTab === "path-analysis" ? <PathDetails paths={results.paths} /> :
                                        activeTab === "recommendations" ? <Suggestions suggestions={results.suggestions}/>: null}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ResultPage
