import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Users } from 'lucide-react';
import { NotificationToast, useNotifications } from './NotificationToast';
import { LoadingSpinner } from './LoadingSpinner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading } = useAuth();
  const { notifications, addNotification, removeNotification } = useNotifications();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    
    let hasErrors = false;

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      hasErrors = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasErrors = true;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      hasErrors = true;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      hasErrors = true;
    }

    if (hasErrors) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors in the form before submitting.'
      });
      return;
    }
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'The email or password you entered is incorrect.'
      });
    } else {
      addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome to CapTrack!'
      });
    }
  };

  const fillTestAccount = (type: 'student' | 'faculty' | 'admin') => {
    setError('');
    setEmailError('');
    setPasswordError('');
    
    if (type === 'student') {
      setEmail('student@uc.edu.ph');
      setPassword('student123');
    } else if (type === 'faculty') {
      setEmail('faculty@uc.edu.ph');
      setPassword('faculty123');
    } else {
      setEmail('admin@uc.edu.ph');
      setPassword('admin123');
    }
    
    addNotification({
      type: 'info',
      title: 'Demo Account Loaded',
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} credentials have been filled in.`
    });
  };

  return (
    <>
      <NotificationToast 
        notifications={notifications}
        onRemove={removeNotification}
      />
      {isLoading && <LoadingSpinner message="Signing in..." fullScreen />}
      <div className="min-h-screen flex items-center justify-center p-4" 
           style={{
             background: `radial-gradient(ellipse at center, #ffffff 0%, #f8fafc 20%, #f1f5f9 40%, rgba(244, 197, 66, 0.3) 60%, rgba(244, 197, 66, 0.7) 80%, #f4c542 100%)`
           }}>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">CapTrack - University of Cebu</h1>
            <p className="text-muted-foreground mt-2">Capstone Project Management System</p>
          </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Welcome to CapTrack - Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="Enter your email"
                  className={emailError ? 'border-red-500 focus:border-red-500' : ''}
                />
                {emailError && (
                  <p className="text-sm text-red-600">{emailError}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  placeholder="Enter your password"
                  className={passwordError ? 'border-red-500 focus:border-red-500' : ''}
                />
                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-muted-foreground text-center">Quick Demo Access:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestAccount('student')}
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestAccount('faculty')}
                  className="flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Faculty
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestAccount('admin')}
                  className="flex items-center gap-2 bg-uc-gold text-white border-uc-gold hover:bg-uc-gold-dark"
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  Admin
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Click any role above to load demo credentials, or use the demo mode with any valid email/password format.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}