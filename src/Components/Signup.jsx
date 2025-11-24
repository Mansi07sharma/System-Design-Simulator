import { useTheme } from "../Context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate()
    const [signuping, setSignuping] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Make password same!")
            return;
        }

        console.log(formData)
        setSignuping(true)

        let response = await fetch("https://shimmering-nature-production.up.railway.app/registerUser",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        )

        let json = await response.json()
        console.log(json.message)
        setSignuping(false)
        if (response.ok) {
            navigate('/login')
            return;
        }

        alert("User Already exist!")
    }

    return (
        <>
            {(signuping) && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeIn">
                        <div className="relative mb-6">
                            <div className="h-20 w-20 rounded-full border-4 border-white/40 border-t-blue-500 animate-spin"></div>
                            <div className="absolute inset-0 h-20 w-20 rounded-full blur-xl opacity-40 bg-blue-400 animate-pulse"></div>
                        </div>
                        <h2 className="text-2xl font-semibold text-white drop-shadow-lg tracking-wide">
                            Creating user!
                        </h2>
                        <p className="text-white/80 mt-2 text-sm">
                            Please wait while we creating your account!.
                        </p>
                    </div>
                </div>
            )}
            <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} py-6`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Form Section */}
                        <div className="order-2 lg:order-1 w-full">
                            <div className={`max-w-md mx-auto ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-6 sm:p-8`}>
                                <div className="text-center mb-4">
                                    <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                                        Create Account
                                    </h1>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
                                        Join thousands of developers designing better systems
                                    </p>
                                </div>

                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                            Full Name
                                        </label>
                                        <input
                                            disabled={signuping}
                                            type="text"
                                            required
                                            className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`}
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                            Email Address
                                        </label>
                                        <input
                                            disabled={signuping}
                                            type="email"
                                            required
                                            className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`}
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                            Password
                                        </label>
                                        <input
                                            disabled={signuping}
                                            type="password"
                                            required
                                            className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                            Confirm Password
                                        </label>
                                        <input
                                            disabled={signuping}
                                            type="password"
                                            required
                                            className={`w-full px-4 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        disabled={signuping}
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
                                    >
                                        Create Account
                                    </button>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        Already have an account?{' '}
                                        <NavLink to="/login" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium cursor-pointer`}>
                                            Sign in
                                        </NavLink>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="order-2 text-center lg:text-left w-full">
                            <img
                                src="https://readdy.ai/api/search-image?query=Team%20of%20diverse%20software%20engineers%20and%20architects%20collaborating%20on%20cloud%20infrastructure%20design%20in%20modern%20office%20with%20whiteboards%20showing%20system%20diagrams%20servers%20and%20network%20architecture%20in%20professional%20development%20environment&width=600&height=400&seq=signup-team&orientation=landscape"
                                alt="Team designing architecture"
                                className="w-full max-w-md mx-auto lg:mx-0 h-auto rounded-2xl shadow-2xl object-cover mb-8"
                            />

                            <h2 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                                Start Building Better Systems Today
                            </h2>

                            <div className={`space-y-4 text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <div className="flex items-center justify-center lg:justify-start">
                                    <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                                    <span>Free account with unlimited designs</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start">
                                    <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                                    <span>Access to all infrastructure components</span>
                                </div>
                                <div className="flex items-center justify-center lg:justify-start">
                                    <i className="ri-check-line text-green-500 mr-3 w-5 h-5 flex items-center justify-center"></i>
                                    <span>Real-time collaboration features</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
