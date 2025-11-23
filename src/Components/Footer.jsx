import { useTheme } from "../Context/ThemeContext";
export default function Footer() {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`${isDarkMode ? 'bg-black text-white' : 'bg-gray-900 text-white'} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="flex gap-8">
                    <div className="">
                        <h3 className="text-xl font-bold mb-2">
                            <span className={`font-pacifico ${isDarkMode ? 'text-blue-400' : 'text-blue-400'} transition-colors duration-200`}>System Design Simulator</span>
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-400'} mb-2 leading-relaxed  transition-colors duration-200`}>
                            The ultimate visual tool for designing, simulating, and learning scalable system architectures.
                            Perfect for developers, engineers, and students.
                        </p>
                        <div className="flex">
                            <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}>
                                <i className="ri-github-fill text-2xl w-8 h-8 flex items-center justify-center"></i>
                            </a>
                            <a href="#" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}>
                                <i className="ri-linkedin-fill text-2xl w-8 h-8 flex items-center justify-center"></i>
                            </a>
                        </div>
                    </div>
                </div>


                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-800'} mt-6 pt-8 flex flex-col md:flex-row justify-between items-center transition-colors duration-200`}>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'} text-sm transition-colors duration-200`}>
                        © 2025 System Design Simulator. ~by Mansi Sharma
                    </p>
                </div>
            </div>
        </footer>
    );
}
