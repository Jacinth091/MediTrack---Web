// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();
  const role = user?.role?.toLowerCase();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const timer = setTimeout(() => setShouldCheck(true), 100);
    return () => clearTimeout(timer);
  }, [])
  
  console.log("User: ", user)
  console.log("Protected Route Role: ", role)
  console.log("Rendered")
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!allowedRoles.map(r => r.toLowerCase()).includes(role)) {
    return <Navigate to="/unauthorized" replace />;
    // console.log("Error: ", role)
  }


  return children;
};

export default ProtectedRoute;