import { useTheme } from '../Context/ThemeContext';
import { NavLink } from 'react-router-dom';
import { useJwt } from '../Context/JwtContext';
import { useState } from 'react';

export default function Header() {
    const { isDarkMode, toggleTheme } = useTheme();
    const { jwtToken, isAuthenticated } = useJwt();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        window.location.href = 'http://localhost:3000/logout'
    }

    return (
        <header className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center sm:w-fit w-1/2 ">
                        <NavLink to="/" className={`sm:text-2xl text-lg font-bold ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} cursor-pointer`}>
                            <span className="font-pacifico ">System Design Simulator</span>
                        </NavLink>
                    </div>

                    {/* ---------- HAMBURGER BUTTON (Mobile) ---------- */}
                    <button
                        className="md:hidden p-2 rounded-lg focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isDarkMode ? (
                            <i className="ri-menu-3-line text-2xl text-gray-300"></i>
                        ) : (
                            <i className="ri-menu-3-line text-2xl text-gray-700"></i>
                        )}
                    </button>

                    {/* ---------- DESKTOP NAV ---------- */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium cursor-pointer`}>Features</a>
                        <a href="#usecase" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium cursor-pointer`}>Use Cases</a>
                        <NavLink to="/documentation" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium cursor-pointer`}>Documentation</NavLink>
                        <NavLink to="/design" className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium cursor-pointer`}>Create Design</NavLink>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}
                        >
                            {isDarkMode ? (
                                <i className="ri-sun-line text-xl w-6 h-6 flex items-center justify-center text-yellow-400"></i>
                            ) : (
                                <i className="ri-moon-line text-xl w-6 h-6 flex items-center justify-center text-gray-600"></i>
                            )}
                        </button>

                        {isAuthenticated ? <>
                            <NavLink
                                to="/profile"
                                className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium whitespace-nowrap cursor-pointer`}
                            >
                                {jwtToken.name}
                            </NavLink>
                            <NavLink
                                onClick={handleLogout}
                                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer`}
                            >
                                Log out
                            </NavLink></> :
                            <>
                                <NavLink
                                    to="/login"
                                    className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium whitespace-nowrap cursor-pointer`}
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer`}
                                >
                                    Sign Up
                                </NavLink>
                            </>}
                    </div>
                </div>

                {/* ---------- MOBILE DROPDOWN MENU ---------- */}
                {isMenuOpen && (
                    <div className={`md:hidden py-3 space-y-3 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <a href="#features" className={`block px-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Features</a>
                        <a href="#usecase" className={`block px-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Use Cases</a>
                        <NavLink to="/documentation" className={`block px-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Documentation</NavLink>
                        <NavLink to="/design" className={`block px-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}>Create Design</NavLink>

                        <div className="px-4 pt-3 border-t border-gray-500/20">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg mb-3 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}
                            >
                                {isDarkMode ? (
                                    <i className="ri-sun-line text-xl text-yellow-400"></i>
                                ) : (
                                    <i className="ri-moon-line text-xl text-gray-600"></i>
                                )}
                            </button>

                            {isAuthenticated ? <>
                                <NavLink
                                    to="/profile"
                                    className={`block mb-3 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}
                                >
                                    {jwtToken.name}
                                </NavLink>

                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                                >
                                    Log out
                                </button></> :
                                <>
                                    <NavLink
                                        to="/login"
                                        className={`block mb-3 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} font-medium`}
                                    >
                                        Login
                                    </NavLink>

                                    <NavLink
                                        to="/signup"
                                        className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                                    >
                                        Sign Up
                                    </NavLink>
                                </>}
                        </div>
                    </div>
                )}

            </div>
        </header>
    );
}
