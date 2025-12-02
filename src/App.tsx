import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LogoutConfirmDialog } from './components/LogoutConfirmDialog';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, isLoggingOut, showLogoutDialog, cancelLogout, confirmLogout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  // Show loading screen when logging out
  if (isLoggingOut) {
    return <LoadingSpinner message="Signing out..." fullScreen />;
  }

  if (!user) {
    return <LoginPage />;
  }

  // Route to appropriate dashboard based on user role
  if (user.role === 'admin') {
    return (
      <>
        <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />
        <LogoutConfirmDialog 
          isOpen={showLogoutDialog}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
          userName={user.name}
        />
      </>
    );
  }

  if (user.role === 'faculty') {
    return (
      <>
        <FacultyDashboard currentView={currentView} setCurrentView={setCurrentView} />
        <LogoutConfirmDialog 
          isOpen={showLogoutDialog}
          onClose={cancelLogout}
          onConfirm={confirmLogout}
          userName={user.name}
        />
      </>
    );
  }

  // Default to student dashboard
  return (
    <>
      <StudentDashboard 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <LogoutConfirmDialog 
        isOpen={showLogoutDialog}
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        userName={user.name}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}