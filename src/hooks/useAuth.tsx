
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  full_name?: string;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  fakeAdminLogin: () => void;
  fakeUserLogin: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login for now
    const mockUser = { id: '1', email, full_name: 'Test User' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signIn = async (email: string, password: string) => {
    await login(email, password);
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const mockUser = { id: '1', email, full_name: fullName || 'New User' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signInWithGoogle = async () => {
    const mockUser = { id: '1', email: 'google@example.com', full_name: 'Google User' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signInWithGitHub = async () => {
    const mockUser = { id: '1', email: 'github@example.com', full_name: 'GitHub User' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const fakeAdminLogin = () => {
    const mockUser = { 
      id: '1', 
      email: 'admin@example.com', 
      full_name: 'Admin User',
      user_metadata: { role: 'admin' }
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const fakeUserLogin = () => {
    const mockUser = { 
      id: '2', 
      email: 'user@example.com', 
      full_name: 'Test User',
      user_metadata: { role: 'user' }
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const signOut = () => {
    logout();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      signIn, 
      signUp, 
      signInWithGoogle, 
      signInWithGitHub, 
      fakeAdminLogin, 
      fakeUserLogin, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
