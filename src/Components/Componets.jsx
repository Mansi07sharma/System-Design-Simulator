import { useTheme } from "../Context/ThemeContext";
export default function Components() {
  const { isDarkMode } = useTheme();

  const components = [
    {
      name: 'Load Balancer',
      description: 'Distribute traffic across multiple servers',
      image: 'https://readdy.ai/api/search-image?query=Load%20balancer%20server%20infrastructure%20with%20multiple%20server%20racks%20connected%20through%20network%20switches%20showing%20traffic%20distribution%20in%20a%20clean%20technical%20illustration%20style%20with%20blue%20and%20gray%20colors%20perfect%20for%20system%20design%20tools&width=200&height=150&seq=load-balancer&orientation=squarish',
      icon: 'ri-share-forward-line'
    },
    {
      name: 'Database',
      description: 'Store and manage your application data',
      image: 'https://readdy.ai/api/search-image?query=Database%20server%20infrastructure%20showing%20data%20storage%20cylinders%20and%20server%20racks%20in%20a%20modern%20technical%20style%20with%20organized%20data%20flow%20visualization%20perfect%20for%20system%20architecture%20design%20tools&width=200&height=150&seq=database&orientation=squarish',
      icon: 'ri-database-2-line'
    },
    {
      name: 'Cache Layer',
      description: 'High-speed data access and storage',
      image: 'https://readdy.ai/api/search-image?query=Memory%20cache%20server%20with%20fast%20access%20storage%20chips%20and%20data%20flow%20indicators%20in%20a%20sleek%20technical%20illustration%20showing%20high%20performance%20computing%20components%20for%20system%20design&width=200&height=150&seq=cache&orientation=squarish',
      icon: 'ri-flashlight-line'
    },
    {
      name: 'Message Queue',
      description: 'Asynchronous communication between services',
      image: 'https://readdy.ai/api/search-image?query=Message%20queue%20system%20showing%20data%20packets%20flowing%20through%20conveyor%20belt%20style%20processing%20pipeline%20with%20organized%20message%20handling%20in%20clean%20technical%20visualization%20for%20system%20architecture&width=200&height=150&seq=queue&orientation=squarish',
      icon: 'ri-mail-send-line'
    },
    {
      name: 'API Gateway',
      description: 'Manage and route API requests',
      image: 'https://readdy.ai/api/search-image?query=API%20gateway%20infrastructure%20showing%20request%20routing%20through%20central%20hub%20with%20multiple%20endpoints%20and%20security%20layers%20in%20modern%20technical%20diagram%20style%20for%20system%20design%20tools&width=200&height=150&seq=api-gateway&orientation=squarish',
      icon: 'ri-route-line'
    },
    {
      name: 'Web Server',
      description: 'Handle HTTP requests and responses',
      image: 'https://readdy.ai/api/search-image?query=Web%20server%20infrastructure%20with%20HTTP%20request%20handling%20capabilities%20showing%20server%20racks%20and%20network%20connections%20in%20clean%20technical%20illustration%20for%20system%20architecture%20design&width=200&height=150&seq=web-server&orientation=squarish',
      icon: 'ri-server-line'
    }
  ];

  return (
    <section className={`md:py-20 py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:mb-16 mb-10">
          <h2 className={`md:text-4xl text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-200`}>
            Drag & Drop Infrastructure Components
          </h2>
          <p className={`md:text-xl text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto transition-colors duration-200`}>
            Choose from a comprehensive library of system components to build your architecture
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:shadow-lg'} rounded-xl p-6 transition-all duration-200`}>
              <div className={`w-full h-32 mb-4 rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-600' : 'bg-white'} transition-colors duration-200`}>
                <img 
                  src={component.image}
                  alt={component.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              
              <div className="flex items-center mb-3">
                <i className={`${component.icon} text-2xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mr-3 w-6 h-6 flex items-center justify-center transition-colors duration-200`}></i>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>{component.name}</h3>
              </div>
              
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-200`}>{component.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
