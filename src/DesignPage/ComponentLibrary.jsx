import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import components from './CompJSON';

function ComponentLibrary({ isDarkMode , setNodes}) {
    const [activeCategory, setActiveCategory] = useState('all');
    const categories = [
        { key: 'all', name: 'All Components', icon: 'ri-apps-line' },
        { key: 'compute', name: 'Compute', icon: 'ri-cpu-line' },
        { key: 'storage', name: 'Storage', icon: 'ri-database-2-line' },
        { key: 'networking', name: 'Networking', icon: 'ri-global-line' },
        { key: 'messaging', name: 'Messaging', icon: 'ri-message-2-line' }
    ];

    const filteredComponents = activeCategory === 'all'
        ? components
        : components.filter(comp => comp.data.category === activeCategory);

    return (
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} w-80 border-r flex flex-col transition-colors duration-200`}>
            <div className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b p-4`}>
                <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
                    Component Library
                </h2>

                <div className="space-y-1">
                    {categories.map(category => (
                        <button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            className={`${activeCategory === category.key
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-100 text-blue-700'
                                    : isDarkMode
                                        ? 'text-gray-300 hover:bg-gray-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                } w-full text-left px-3 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer`}
                        >
                            <i className={`${category.icon} w-4 h-4 items-center justify-center mr-3 inline-flex`}></i>
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                    {filteredComponents.map(component => (
                        <div onClick={()=>setNodes((nodes)=>[...nodes,{ ...component, id: uuidv4() }])}
                            key={component.data.key}
                            draggable
                            className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-3 rounded-lg border-2 border-transparent hover:border-blue-400 transition-all cursor-move group relative`}>
                            <div className="flex items-center space-x-3">
                                <div className={`${component.data.color} p-2 rounded-lg text-white flex-shrink-0`}>
                                    <i className={`${component.data.icon} text-lg w-6 h-6 flex items-center justify-center`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium text-sm`}>
                                        {component.data.label}
                                    </h3>
                                </div>
                                <i className={`ri-drag-move-2-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 flex items-center justify-center`}></i>
                            </div>

                            {/* {hoveredComponent?.key === component.data.key && (
                <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-200'} absolute left-full ml-2 top-0 p-3 rounded-lg border shadow-lg z-50 w-64`}>
                  <h4 className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium mb-1`}>
                    {component.name}
                  </h4>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                    {component.description}
                  </p>
                </div>
              )} */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ComponentLibrary
