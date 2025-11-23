import { useTheme } from "../Context/ThemeContext";
import { NavLink } from "react-router-dom";

export default function HeroSection() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`relative ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} overflow-hidden transition-colors duration-200`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20technology%20infrastructure%20visualization%20showing%20connected%20servers%20databases%20load%20balancers%20and%20network%20components%20in%20a%20clean%20minimalist%20style%20with%20soft%20blue%20gradients%20and%20geometric%20patterns%20representing%20scalable%20cloud%20architecture%20perfect%20for%20developer%20tools%20and%20system%20design%20applications&width=1920&height=800&seq=hero-bg&orientation=landscape')`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-10 lg:py-15">
        <div className="flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left">
          <div className="space-y-8 w-full">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight transition-colors duration-200`}>
              Design, Simulate, and Learn 
              <span className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} block transition-colors duration-200`}>Scalable Architectures</span>
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-2xl sm:text-3xl lg:text-4xl block mt-2 transition-colors duration-200`}>Visually</span>
            </h1>
            
            <p className={`text-base sm:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed max-w-xl mx-auto lg:mx-0 transition-colors duration-200`}>
              Build and test system architectures with our intuitive drag-and-drop interface. 
              Perfect for developers, engineers, and students learning scalable design patterns.
            </p>
            
            <div className="flex sm:flex-row gap-4 justify-center lg:justify-start">
              <NavLink 
                to="/dashboard" 
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center whitespace-nowrap cursor-pointer"
              >
                Get Started Free
              </NavLink>
              
              <NavLink 
                to="/demo" 
                className={`${isDarkMode ? 'bg-gray-800 text-blue-400 border-blue-400 hover:bg-gray-700' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'} px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold border-2 transition-colors text-center whitespace-nowrap cursor-pointer`}
              >
                Try Demo
              </NavLink>
            </div>
          </div>
          
          <div className="relative overflow-hidden w-full max-w-sm sm:max-w-lg border-2 border-blue-700 rounded-lg shadow-lg">
            <img 
              src="image01.png"
              alt="System Design Components"
              className="w-full h-auto "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
