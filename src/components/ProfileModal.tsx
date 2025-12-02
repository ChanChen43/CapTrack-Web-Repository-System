import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, Lock, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner@2.0.3';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    role: string;
    course?: string;
    studentId?: string;
    employeeId?: string;
  };
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    course: user.course || '',
    studentId: user.studentId || '',
    employeeId: user.employeeId || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [showProfileConfirm, setShowProfileConfirm] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileSave = () => {
    setShowProfileConfirm(true);
  };

  const confirmProfileSave = () => {
    // Simulate saving profile
    toast.success('Profile information updated successfully!');
    setShowProfileConfirm(false);
    onClose();
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long!');
      return;
    }
    setShowPasswordConfirm(true);
  };

  const confirmPasswordChange = () => {
    // Simulate password change
    toast.success('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordConfirm(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // Simulate account deletion
    toast.success('Account deletion initiated. You will be logged out shortly.');
    setShowDeleteConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-uc-blue" />
              Profile Settings
            </DialogTitle>
            <DialogDescription>
              Manage your personal information, security settings, and account preferences.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="profile" className="flex-1 overflow-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your profile information. Changes will be reviewed before being applied.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  {user.role === 'student' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course">Course</Label>
                        <Input
                          id="course"
                          value={profileData.course}
                          onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          value={profileData.studentId}
                          onChange={(e) => setProfileData(prev => ({ ...prev, studentId: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                  
                  {(user.role === 'faculty' || user.role === 'admin') && (
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={profileData.employeeId}
                        onChange={(e) => setProfileData(prev => ({ ...prev, employeeId: e.target.value }))}
                      />
                    </div>
                  )}
                  
                  <Button onClick={handleProfileSave} className="w-full bg-uc-blue hover:bg-uc-blue-dark">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="password" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Ensure your account is secure with a strong password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                      >
                        {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                      >
                        {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                      >
                        {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handlePasswordChange} className="w-full bg-uc-blue hover:bg-uc-blue-dark">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                  <CardDescription>
                    Manage your account settings and data.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">Danger Zone</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button 
                      onClick={handleDeleteAccount}
                      variant="destructive"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={showProfileConfirm}
        onClose={() => setShowProfileConfirm(false)}
        onConfirm={confirmProfileSave}
        title="Confirm Profile Changes"
        message="Are you sure you want to save these profile changes? The changes will be reviewed before being applied to your account."
        confirmText="Save Changes"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={showPasswordConfirm}
        onClose={() => setShowPasswordConfirm(false)}
        onConfirm={confirmPasswordChange}
        title="Confirm Password Change"
        message="Are you sure you want to change your password? You will need to use the new password for future logins."
        confirmText="Change Password"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteAccount}
        title="Delete Account"
        message="Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}