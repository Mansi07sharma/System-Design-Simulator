import React from 'react'
import { useJwt } from '../Context/JwtContext.jsx';
import { useEffect, useState } from 'react';
import { useTheme } from '../Context/ThemeContext.jsx';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { jwtToken } = useJwt();
    const { isDarkMode } = useTheme();
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (!jwtToken) {
            navigate('/');
            return;
        }
        const getDesigns = async () => {
            try {
                const response = await fetch(`https://shimmering-nature-production.up.railway.app/designs?userEmail=${jwtToken.email}`);
                const data = await response.json();
                setDesigns(data);
            } catch (e) {
                console.error("Error fetching designs:", e);
            }
        }
        getDesigns();
    }, [jwtToken])

    const handleDesign = (e) => {
        const designTitle = e.currentTarget.querySelector('h3').innerText;
        const selectedDesign = designs.find(design => design.title === designTitle);
        console.log("Selected design:", selectedDesign);
        navigate('/design', { state: selectedDesign })
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 w-full">
                    <div className="w-full lg:w-auto">
                        <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1 sm:mb-2`}>My Designs</h1>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>Manage and organize your system architecture designs</p>
                    </div>

                    <NavLink
                        to="/design"
                        className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center whitespace-nowrap cursor-pointer"
                    >
                        <i className="ri-add-line w-5 h-5 flex items-center justify-center mr-2"></i>
                        Create New Design
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designs.length > 0 ? designs.map((design) => (
                        <div onClick={handleDesign} key={design.id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl hover:shadow-lg transition-all cursor-pointer`}>
                            <div className={`h-32 sm:h-40 md:h-48 rounded-t-xl overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <img
                                    src={design.thumbnail}
                                    alt={design.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} line-clamp-1`}>{design.title}</h3>
                                    <div className="flex space-x-2">
                                        <button className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} whitespace-nowrap cursor-pointer`}>
                                            <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                                        </button>
                                        <button className={`${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-400 hover:text-red-600'} whitespace-nowrap cursor-pointer`}>
                                            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                                        </button>
                                    </div>
                                </div>

                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm mb-4 line-clamp-2`}>{design.description}</p>

                                <div className={`flex items-center justify-between text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <div className="flex items-center">
                                        <i className="ri-puzzle-line mr-1 w-4 h-4 flex items-center justify-center"></i>
                                        <span>{design.components} components</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className={`col-span-full text-center py-16 sm:py-20 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            You have no designs yet. Click "Create New Design" to get started!
                        </div>
                    }
                </div>
            </div >
        </div>
    )
}

export default Profile
