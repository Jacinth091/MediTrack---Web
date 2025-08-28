import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Checking authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if requiredRole is specified
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the children
  return children;
};

// Role-specific route components
const AdminRoute = ({ children }) => <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
const DoctorRoute = ({ children }) => <ProtectedRoute requiredRole="doctor">{children}</ProtectedRoute>;
const NurseRoute = ({ children }) => <ProtectedRoute requiredRole="nurse">{children}</ProtectedRoute>;
const StaffRoute = ({ children }) => <ProtectedRoute requiredRole="staff">{children}</ProtectedRoute>;
const ReceptionistRoute = ({ children }) => <ProtectedRoute requiredRole="receptionist">{children}</ProtectedRoute>;

export { AdminRoute, DoctorRoute, NurseRoute, ProtectedRoute, ReceptionistRoute, StaffRoute };
