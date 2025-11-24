import { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [logining, setLogining] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleLogin = async (e) => {
    e.preventDefault();
    setLogining(true)
    let response = await fetch("https://shimmering-nature-production.up.railway.app/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData)
    });

    let json = await response.json();
    console.log(json);

    setLogining(false)
    if (response.ok) {
        navigate('/auth/callback');
    } else {
        alert(json.message);
    }
  }

  const handleLoginGoogle = () => {
    window.location.href = "https://system-design-simulator-production.up.railway.app/auth/google";
  }

  return (
    <>
      {(logining) && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-fadeIn">
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-full border-4 border-white/40 border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-0 h-20 w-20 rounded-full blur-xl opacity-40 bg-blue-400 animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-semibold text-white drop-shadow-lg tracking-wide">
              Logining user!
            </h2>
            <p className="text-white/80 mt-2 text-sm">
              Please wait while we connecting your account!.
            </p>
          </div>
        </div>
      )}
      <div className={`min-h-screen ${isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-indigo-100"} flex  justify-center py-10 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-md w-full">
          <div className={`${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-2xl shadow-xl p-6 sm:p-8`}>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"} mb-2`}>Welcome Back</h1>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm sm:text-base`}>Sign in to your System Design Simulator account</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>Email Address</label>
                <input disabled={logining} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" required className={`w-full px-4 py-2 sm:py-3 border ${isDarkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400" : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`} placeholder="Enter your email" />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>Password</label>
                <input disabled={logining} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" required className={`w-full px-4 py-2 sm:py-3 border ${isDarkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-400" : "border-gray-300 bg-white text-gray-900 focus:border-blue-500"} rounded-lg focus:ring-2 focus:ring-blue-500/20 text-sm transition-colors`} placeholder="Enter your password" />
              </div>
              <button disabled={logining} type="submit" className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer">Sign In</button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}></div></div>
                <div className="relative flex justify-center text-sm"><span className={`px-2 ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-white text-gray-500"}`}>Or continue with</span></div>
              </div>

              {/* Social Buttons */}
              <div className="mt-6 ">
                <button onClick={handleLoginGoogle} className={`w-full inline-flex justify-center items-center py-2 sm:py-3 px-4 border ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"} rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer`}>
                  <i className="ri-google-fill text-lg sm:text-xl mr-2 w-5 h-5 flex items-center justify-center"></i> Google
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Don&apos;t have an account?{" "}
                <NavLink to="/signup" className={`text-sm ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} font-medium cursor-pointer`}>
                  Create account
                </NavLink>
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
