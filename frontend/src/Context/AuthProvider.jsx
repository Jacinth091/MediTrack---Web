import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getUser } from '../api/user.js';

const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Main provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    const token = sessionStorage.getItem('Token') || sessionStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await getUser();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error("Authentication check failed:", error);
      sessionStorage.removeItem('Token');
      sessionStorage.removeItem('token');
      setUser(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback((userData, token) => {
    if (token) {
      sessionStorage.setItem('Token', token);
    }
    setUser(userData);
    setError(null);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('token');
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    refreshAuth: checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Optional: If you need to export the context for some reason
export { AuthContext };
