import Navbar from './Components/Navbar';
import HeroSection from './Components/Hero';
import FeaturesSection from './Components/Feature';
import Components from './Components/Componets';
import UseCase from './Components/UseCase';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import Login from './Components/Login';
import DesignPage from './DesignPage/DesignPage';
import SimulationOutput from './DesignPage/ResultPage';
import Profile from './Components/Profile';
import AuthCallback from './Auth/Callback/AuthCallback';
import Documentation from './Components/Documentation';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><HeroSection /><Components /><FeaturesSection /><UseCase /><Footer /></>,
    }, {
      path: '/signup',
      element: <><Navbar /><Signup /></>,
    }, {
      path: '/login',
      element: <><Navbar /><Login /></>,
    }, {
      path: '/design',
      element: <DesignPage />,
    }, {
      path: '/result',
      element: <SimulationOutput />,
    }, {
      path: '/profile',
      element: <><Navbar /><Profile /></>,
    },{
      path: '/auth/callback', 
      element: <AuthCallback />,
    },{
      path:'/documentation',
      element:<><Navbar/><Documentation/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
