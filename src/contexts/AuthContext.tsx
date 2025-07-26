import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app load
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (isAuthenticated && userRole && userEmail) {
      setUser({
        id: '1',
        email: userEmail,
        name: userName || 'User',
        role: userRole as 'admin' | 'user'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@wetute.com' && password === 'admin123') {
        const adminUser = {
          id: '1',
          email: 'admin@wetute.com',
          name: 'Administrator',
          role: 'admin' as const
        };
        
        setUser(adminUser);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', adminUser.email);
        localStorage.setItem('userName', adminUser.name);
        setLoading(false);
        return true;
      } else {
        // Regular user login
        const regularUser = {
          id: '2',
          email: email,
          name: email.split('@')[0],
          role: 'user' as const
        };
        
        setUser(regularUser);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userEmail', regularUser.email);
        localStorage.setItem('userName', regularUser.name);
        setLoading(false);
        return true;
      }
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Mock signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Date.now().toString(),
        email: email,
        name: name,
        role: 'user' as const
      };
      
      setUser(newUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userEmail', newUser.email);
      localStorage.setItem('userName', newUser.name);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 