
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  memberLevel: 'Elite' | 'Standard';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for persisted session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('ep_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    // Mock API Call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          name: 'Ospite Elena',
          email: email,
          memberLevel: 'Elite'
        };
        setUser(mockUser);
        localStorage.setItem('ep_auth_user', JSON.stringify(mockUser));
        resolve();
      }, 1000);
    });
  };

  const register = async (name: string, email: string, pass: string) => {
    // Mock API Call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          name: name,
          email: email,
          memberLevel: 'Standard'
        };
        setUser(newUser);
        localStorage.setItem('ep_auth_user', JSON.stringify(newUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ep_auth_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
