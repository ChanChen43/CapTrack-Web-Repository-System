import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal';
import { SaveSettingsModal } from './SaveSettingsModal';
import { toast } from 'sonner@2.0.3';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Download,
  Trash2,
  Save
} from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    bio: ''
  });

  // Modal states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showSaveSettings, setShowSaveSettings] = useState(false);
  const [settingsToSave, setSettingsToSave] = useState('');

  const handleSaveSettings = (settingsType: string) => {
    setSettingsToSave(settingsType);
    setShowSaveSettings(true);
  };

  const confirmSaveSettings = () => {
    // In a real app, this would save to an API
    toast.success(`${settingsToSave} settings saved successfully!`);
    setShowSaveSettings(false);
  };

  const handleDownloadData = () => {
    toast.success('Downloading data...', {
      duration: 3000,
      position: 'top-right'
    });
    // Simulate download
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input 
                    id="department" 
                    value={profileData.department}
                    onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                  />
                </div>
                {user?.role === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input 
                      id="studentId" 
                      defaultValue={user?.studentId} 
                      disabled
                      className="bg-gray-100 text-gray-500"
                    />
                    <p className="text-xs text-gray-500">Student ID cannot be changed</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Input 
                  id="bio" 
                  placeholder="Tell us a bit about yourself..." 
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <Button 
                onClick={() => handleSaveSettings('Profile')} 
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about feedback and submissions
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Get real-time notifications in your browser
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your activity
                  </p>
                </div>
                <Switch 
                  checked={weeklyDigest}
                  onCheckedChange={setWeeklyDigest}
                />
              </div>

              <Button 
                onClick={() => handleSaveSettings('Notification')} 
                className="w-full mt-4"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize how CapTrack looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch to a darker color scheme
                  </p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <Button 
                onClick={() => handleSaveSettings('Appearance')} 
                className="w-full mt-4"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDownloadData}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Your Data
              </Button>

              <Separator />

              <div className="space-y-2">
                <Label className="text-destructive">Danger Zone</Label>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => setShowDeleteAccount(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground">
                  This action cannot be undone. This will permanently delete your account.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge variant="secondary">
                  {user?.role === 'student' ? 'Student' : 'Faculty'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Department</span>
                <span className="text-sm font-medium">{user?.department}</span>
              </div>
              
              {user?.role === 'student' && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Student ID</span>
                  <span className="text-sm font-medium">{user?.studentId}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">Sep 2024</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => handleSaveSettings('All')}
                className="w-full justify-start"
              >
                <Save className="w-4 h-4 mr-2" />
                Save All Settings
              </Button>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Report a Bug
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <DeleteAccountModal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
      />

      <SaveSettingsModal
        isOpen={showSaveSettings}
        onClose={() => setShowSaveSettings(false)}
        onConfirm={confirmSaveSettings}
        settingsType={settingsToSave}
        message={`Are you sure you want to apply these ${settingsToSave.toLowerCase()} changes? The changes will be saved to your account.`}
      />
    </div>
  );
}