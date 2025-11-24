import { useTheme } from "../Context/ThemeContext";
export default function FeaturesSection() {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: 'ri-drag-drop-line',
      title: 'Drag & Drop Interface',
      description: 'Intuitive visual builder for creating system architectures without code'
    },
    {
      icon: 'ri-play-line',
      title: 'Real-time Simulation',
      description: 'Test your designs with traffic simulation and performance metrics'
    },
    {
      icon: 'ri-bookmark-line',
      title: 'Save & Share Designs',
      description: 'Keep your architectures organized and collaborate with your team'
    }
  ];

  return (
    <section id="features" className={`md:py-20 py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:mb-16 mb-10">
          <h2 className={`md:text-4xl text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-200`}>
            Powerful Features for System Design
          </h2>
          <p className={`md:text-xl text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto transition-colors duration-200`}>
            Everything you need to design, simulate, and optimize scalable architectures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-5">
          {features.map((feature, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-md'} rounded-xl md:p-8 p-4 ${isDarkMode ? '' : 'shadow-sm'} transition-all duration-200`}>
              <div className="flex items-center gap-5 mb-4">
                <div className={`md:w-12 w-7 md:h-12 h-7 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center transition-colors duration-200`}>
                  <i className={`${feature.icon} md:text-2xl text-xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} md:w-6 w-2 md:h-6 h-2 flex items-center justify-center transition-colors duration-200`}></i>
                </div>

                <h3 className={`md:text-xl text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}  transition-colors duration-200`}>{feature.title}</h3>

              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed transition-colors duration-200`}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
