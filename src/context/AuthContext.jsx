import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Create a custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Use effect to load the user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse only if there's valid JSON
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user'); // Clear invalid data from localStorage
      }
    }
  }, []);

  const login = (userData) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    console.log("Logging out user");
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
