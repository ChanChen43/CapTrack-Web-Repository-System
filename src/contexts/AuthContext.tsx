import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { testAccounts } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isLoggingOut: boolean;
  requestLogout: () => void;
  cancelLogout: () => void;
  confirmLogout: () => void;
  showLogoutDialog: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo mode - accept any credentials
    // Determine role based on email or use default patterns
    let userData;
    
    // If using test account emails, use specific test data
    if (email === testAccounts.student.email || email.toLowerCase().includes('student')) {
      userData = testAccounts.student.userData;
    } else if (email === testAccounts.faculty.email || email.toLowerCase().includes('faculty') || email.toLowerCase().includes('teacher') || email.toLowerCase().includes('prof')) {
      userData = testAccounts.faculty.userData;
    } else if (email === testAccounts.admin.email || email.toLowerCase().includes('admin') || email.toLowerCase().includes('administrator')) {
      userData = testAccounts.admin.userData;
    } else {
      // Default to student role for any other email
      userData = {
        ...testAccounts.student.userData,
        name: email.split('@')[0] || 'Demo User',
        email: email
      };
    }
    
    setUser(userData);
    setIsLoading(false);
    return true;
  };

  const requestLogout = () => {
    setShowLogoutDialog(true);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  const confirmLogout = async () => {
    setShowLogoutDialog(false);
    setIsLoggingOut(true);
    
    // Simulate logout delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser(null);
    setIsLoggingOut(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      isLoggingOut,
      requestLogout,
      cancelLogout,
      confirmLogout,
      showLogoutDialog
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}