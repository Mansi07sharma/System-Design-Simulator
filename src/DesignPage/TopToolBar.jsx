import { NavLink } from "react-router-dom"

function TopToolBar({ designTitle, setDesignTitle, isDarkMode, setIsDarkMode ,workloadRps, setWorkloadRps, slaLatencyMs, setSlaLatencyMs, onClear, onSave, onStartSimulation}) {
    return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b h-16 px-4 flex items-center justify-between transition-colors duration-200`}>
            <div className="flex items-center space-x-6">
                <NavLink to="/Profile" className="flex items-center text-blue-500 hover:text-blue-600 transition-colors cursor-pointer">
                    <i className="ri-arrow-left-line text-xl w-5 h-5 flex items-center justify-center mr-2"></i>
                    <span className="font-medium whitespace-nowrap">Back to Profile</span>
                </NavLink>

                <div className="h-6 w-px bg-gray-300"></div>

                <input
                    type="text"
                    value={designTitle}
                    onChange={(e) => setDesignTitle(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} px-3 py-2 border rounded-lg font-medium text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all whitespace-nowrap`}
                    placeholder="Enter design title..."
                />

                {/* Workload RPS Input */}
                <input
                    type="number"
                    value={workloadRps}
                    onChange={(e) => setWorkloadRps(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-28`}
                    placeholder="RPS"
                />

                {/* SLA Latency Input */}
                <input
                    type="number"
                    value={slaLatencyMs}
                    onChange={(e) => setSlaLatencyMs(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} px-3 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all w-28`}
                    placeholder="Latency(ms)"
                />
            </div>

            <div className="flex items-center space-x-3">
                <button onClick={onSave} className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer`}>
                    <i className="ri-save-line w-4 h-4 items-center justify-center mr-2 inline-flex"></i>
                    Save
                </button>

                <button onClick={onClear} className={`${isDarkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer`}>
                    <i className="ri-delete-bin-line w-4 h-4 items-center justify-center mr-2 inline-flex"></i>
                    Clear
                </button>

                <div className="w-px h-6 bg-gray-300"></div>

                <button onClick={onStartSimulation} className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed`}>
                    <i className="ri-play-fill w-4 h-4 items-center justify-center mr-2 inline-flex"></i>
                    Start Simulation
                </button>

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-2 rounded-lg transition-colors cursor-pointer`}
                >
                    {isDarkMode ? (
                        <i className="ri-sun-line text-xl w-5 h-5 flex items-center justify-center"></i>
                    ) : (
                        <i className="ri-moon-line text-xl w-5 h-5 flex items-center justify-center"></i>
                    )}
                </button>
            </div>
        </div>
    )
}

export default TopToolBar
