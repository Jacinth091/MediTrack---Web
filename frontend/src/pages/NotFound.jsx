import { FileSearch, Home, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const NotFound = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleGoHome = async() =>{
    try {
      if(user?.role){
        navigate(`/${user?.role.toLowerCase()}/dashboard`)
      }
      else{
        await logout()
        navigate('/')
      }
    } catch (error) {
      console.error("Error in navigating to dashboard: ", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full">
            <FileSearch className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <div className="text-6xl font-bold text-purple-600 mb-4">
          404
        </div>
        
        <p className="text-gray-600 mb-2">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <p className="text-gray-500 mb-8">
          It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
          
          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-2">
              Still can't find what you're looking for?
            </p>
            <button
              onClick={() => {
                // You can implement a search function or contact support
                console.log('Search or contact support');
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
            >
              <Search className="w-4 h-4 mr-1" />
              Try searching or contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;