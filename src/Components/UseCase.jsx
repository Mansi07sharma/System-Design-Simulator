import { useTheme } from "../Context/ThemeContext";
export default function UseCase() {
  const { isDarkMode } = useTheme();

  const useCases = [
    {
      title: 'Software Engineers',
      description: 'Design and validate system architectures before implementation',
      image: 'https://readdy.ai/api/search-image?query=Software%20engineer%20working%20on%20system%20architecture%20design%20with%20multiple%20monitors%20showing%20technical%20diagrams%20and%20code%20in%20a%20modern%20office%20environment%20with%20clean%20professional%20lighting&width=400&height=250&seq=engineer&orientation=landscape',
      features: ['Architecture Planning', 'Performance Testing', 'Code Generation']
    },
    {
      title: 'Engineering Students',
      description: 'Learn system design concepts through interactive visualization',
      image: 'https://readdy.ai/api/search-image?query=Computer%20science%20students%20studying%20system%20design%20and%20distributed%20systems%20with%20laptops%20and%20technical%20books%20in%20a%20modern%20university%20classroom%20environment&width=400&height=250&seq=students&orientation=landscape',
      features: ['Interactive Learning', 'Best Practices', 'Hands-on Experience']
    },
    {
      title: 'Tech Teams',
      description: 'Collaborate on system designs and share architectural decisions',
      image: 'https://readdy.ai/api/search-image?query=Technology%20team%20collaborating%20on%20system%20architecture%20design%20in%20a%20modern%20conference%20room%20with%20whiteboards%20and%20digital%20displays%20showing%20technical%20diagrams&width=400&height=250&seq=team&orientation=landscape',
      features: ['Team Collaboration', 'Design Reviews', 'Documentation']
    }
  ];

  return (
    <section id="usecase" className={`md:py-20 py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:mb-16 mb-10">
          <h2 className={`md:text-4xl text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-200`}>
            Perfect for Every Use Case
          </h2>
          <p className={`md:text-xl text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto transition-colors duration-200`}>
            Whether you're building, learning, or teaching system design
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:shadow-lg'} rounded-2xl overflow-hidden transition-all duration-200`}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="md:p-8 p-4">
                <h3 className={`md:text-2xl text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 transition-colors duration-200`}>{useCase.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} md:mb-6 mb-2 leading-relaxed transition-colors duration-200`}>{useCase.description}</p>
                
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-200`}>
                      <i className="ri-check-line text-green-500 mr-3 w-4 h-4 flex items-center justify-center"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
