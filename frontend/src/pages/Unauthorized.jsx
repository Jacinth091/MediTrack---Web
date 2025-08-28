import { Home, LogIn, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleDifferentAccount = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log("Logout Failed!: ", error);
    }
  };

  const handleGoHome = () => {
    // Redirect to appropriate dashboard based on user role
    if (user?.role) {
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-2">
          403 - Unauthorized Access
        </p>
        
        <p className="text-gray-500 mb-6">
          You don't have permission to access this page. 
          {user?.role && ` Your role: ${user.role}`}
        </p>

        <p className="text-sm text-gray-400 mb-8">
          Please contact your administrator if you believe this is an error.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back to Previous Page
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to My Dashboard
          </button>
          
          <button
            onClick={handleDifferentAccount}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In with Different Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;