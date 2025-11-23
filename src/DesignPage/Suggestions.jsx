import React from 'react'
import { Lightbulb } from 'lucide-react'

function Suggestions({ suggestions }) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Performance Recommendations</h2>

            {suggestions.length > 0 ?
                <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="border-blue-400 border bg-blue-50 rounded-xl flex items-center">
                            <div className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg bg-blue-500 p-2 ">
                                        <Lightbulb className="h-5 w-5 text-white font-semibold" />
                                    </div>
                                    <div className="flex-1">
                                        <p className=" text-blue-700 font-semibold">{suggestion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <>
                    <h1 className='flex items-center p-20 justify-center bg-gray-50 text-gray-600'>No Suggestions:</h1>
                </>}
        </div>
    )
}

export default Suggestions
