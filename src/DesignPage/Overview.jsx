import React from 'react'
import { ShieldCheck, Clock3, CheckCheck, FastForwardIcon, AlertTriangle } from 'lucide-react'

function Overview({ overallAvailability, overallError, overallStatus, avgLatency, avgCapacity, bottleNecks, slaLatency, rps }) {
    const items = [
        {
            label: 'System Status', value: overallStatus ? 'Healthy' : 'Unhealthy', icon: ShieldCheck,
            desc: 'Overall health status', color: overallStatus ? 'text-green-600' : 'text-red-600', textCol: `text-${overallStatus ? 'yellow' : 'red'}-500`
        },
        {
            label: 'Avg Latency', value: `${(avgLatency).toFixed(2)} ms`, icon: Clock3,
            val: `${slaLatency}ms`, desc: 'sla', color: 'text-blue-700', textCol: `${{ avgLatency } <= { slaLatency } ? 'text-yellow' : 'text-red'}-500`
        },
        {
            label: 'Avg Capacity', value: `${(avgCapacity)}`, icon: FastForwardIcon,
            val: rps, desc: 'rps', color: 'text-red-500', textCol: 'text-black'
        },
        {
            label: 'Availability', value: `${(overallAvailability * 100).toFixed(2)} %`, icon: CheckCheck,
            desc: 'System uptime', color: 'text-purple-500', textCol: 'text-yellow-500'
        },
    ]
    return (
        <div>
            <div className='flex gap-5 pl-4 pr-4'>
                {items.map((item => {
                    return (
                        <div className='bg-gray-50 p-4 rounded-lg w-1/4'>
                            <div className='flex items-center justify-between mb-4'>
                                <item.icon className={`w-5 h-5 inline-flex mr-2 ${item.color}`} />
                                <span className={`font-bold text-xl ${item.textCol}`}>{item.value}</span>
                            </div>
                            <h1 className='text-xl font-semibold '>{item.label}</h1>
                            <div className='text-sm text-gray-600'>{item.desc} {item.val}</div>
                        </div>)
                }))}
            </div>

            <div>
                <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg mx-4'>
                    <div className='flex items-center gap-3 mb-3'>
                        <AlertTriangle className='w-6 h-6 font-bold text-red-700 ' />
                        <h2 className='text-lg font-semibold text-red-700 '>Bottleneck Components Detected</h2>
                    </div>

                    {bottleNecks.length > 0 ?
                        <>
                            <p className='text-red-600 text-sm mb-3 font-semibold'>The following components are identified as bottlenecks in your system design:</p>
                            <div className='flex gap-3 flex-wrap'>
                                {bottleNecks.map((bottleneck) => {
                                    return (
                                        <div className='text-red-700 font-semibold bg-red-100 p-1 pl-4 pr-4 rounded-2xl'>
                                            {bottleneck}
                                        </div>
                                    )
                                })}
                            </div>
                        </> :
                        <>
                            <p className='text-red-700 text-sm mb-3 font-semibold'>No bottleneck components detected. Your system design appears to be healthy!</p>
                        </>}
                </div>
            </div>

            <div className='m-4 bg-gray-50 p-4 rounded-lg'>
                <h1 className='text-lg font-semibold'>System Health Overview</h1>
                <div className='flex gap-3 mb-3'>
                    <div className='flex w-1/2 flex-col gap-2 mt-4'>
                        <div className='flex justify-between pl-1 pr-1'>
                            <span className='text-sm text-gray-500'>Error Rate</span>
                            <span className='text-sm font-semibold text-yellow-500'>{(overallError * 100).toFixed(2)}%</span>
                        </div>
                        <div className='h-2 rounded-2xl bg-gray-300 overflow-hidden'>
                            <div className='h-full bg-yellow-400' style={{ width: `${overallError * 1000}%` }}></div>
                        </div>
                    </div>

                    <div className='flex w-1/2 flex-col gap-2 mt-4'>
                        <div className='flex justify-between pl-1 pr-1'>
                            <span className='text-sm text-gray-500'>Latency Rate</span>
                            <span className='text-sm font-semibold text-yellow-500'>{((avgLatency * 100) / slaLatency).toFixed(2)}%</span>
                        </div>
                        <div className='h-2 rounded-2xl bg-gray-300 overflow-hidden'>
                            <div className='h-full bg-yellow-400' style={{ width: `${(avgLatency * 100) / slaLatency}%` }}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Overview
