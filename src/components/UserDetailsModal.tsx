import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, Mail, Calendar, Edit3, Save, X } from 'lucide-react';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner@2.0.3';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    course?: string;
    studentId?: string;
    employeeId?: string;
    status: string;
    lastLogin: string;
    joinDate: string;
  } | null;
  mode?: 'view' | 'edit';
  onSave?: (userData: any) => void;
}

export function UserDetailsModal({ 
  isOpen, 
  onClose, 
  user, 
  mode: initialMode = 'view',
  onSave 
}: UserDetailsModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    course: user?.course || '',
    studentId: user?.studentId || '',
    employeeId: user?.employeeId || '',
    status: user?.status || 'active'
  });

  // Return early if user is null
  if (!user) {
    return null;
  }

  const handleEdit = () => {
    setMode('edit');
  };

  const handleCancel = () => {
    setMode('view');
    setUserData({
      name: user?.name || '',
      email: user?.email || '',
      course: user?.course || '',
      studentId: user?.studentId || '',
      employeeId: user?.employeeId || '',
      status: user?.status || 'active'
    });
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = () => {
    // Simulate saving
    toast.success(`User ${userData.name} updated successfully!`);
    onSave?.(userData);
    setMode('view');
    setShowSaveConfirm(false);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-uc-gold text-white';
      case 'faculty': return 'bg-uc-blue text-white';
      case 'student': return 'bg-uc-gray-100 text-uc-gray-800';
      default: return 'bg-uc-gray-100 text-uc-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-uc-gray-100 text-uc-gray-800';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-uc-blue" />
                {mode === 'edit' ? 'Edit User' : 'User Details'}
              </div>
              {mode === 'view' && (
                <Button onClick={handleEdit} size="sm" className="bg-uc-blue hover:bg-uc-blue-dark">
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              {mode === 'edit' 
                ? 'Edit user account information and settings.' 
                : 'View detailed information about this user account.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* User Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-uc-blue" />
                      {mode === 'edit' ? (
                        <Input
                          value={userData.name}
                          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                          className="font-semibold text-lg border-0 p-0 h-auto"
                        />
                      ) : (
                        user.name
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4" />
                      {mode === 'edit' ? (
                        <Input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                          className="text-sm border-0 p-0 h-auto"
                        />
                      ) : (
                        user.email
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(userData.status)}>
                      {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-uc-gray-700">User ID:</span>
                    <p className="text-uc-gray-600">{user.id}</p>
                  </div>
                  <div>
                    <span className="font-medium text-uc-gray-700">Join Date:</span>
                    <p className="text-uc-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {user.joinDate}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-uc-gray-700">Last Login:</span>
                    <p className="text-uc-gray-600">{user.lastLogin}</p>
                  </div>
                  <div>
                    <span className="font-medium text-uc-gray-700">Role:</span>
                    <p className="text-uc-gray-600">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role-specific Information */}
            {user.role === 'student' && (
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="course">Course</Label>
                    {mode === 'edit' ? (
                      <Input
                        id="course"
                        value={userData.course}
                        onChange={(e) => setUserData(prev => ({ ...prev, course: e.target.value }))}
                      />
                    ) : (
                      <p className="text-uc-gray-600">{user.course || 'Not specified'}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    {mode === 'edit' ? (
                      <Input
                        id="studentId"
                        value={userData.studentId}
                        onChange={(e) => setUserData(prev => ({ ...prev, studentId: e.target.value }))}
                      />
                    ) : (
                      <p className="text-uc-gray-600">{user.studentId || 'Not specified'}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {(user.role === 'faculty' || user.role === 'admin') && (
              <Card>
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="employeeId">Employee ID</Label>
                    {mode === 'edit' ? (
                      <Input
                        id="employeeId"
                        value={userData.employeeId}
                        onChange={(e) => setUserData(prev => ({ ...prev, employeeId: e.target.value }))}
                      />
                    ) : (
                      <p className="text-uc-gray-600">{user.employeeId || 'Not specified'}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Activity Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-uc-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-semibold text-uc-blue">
                      {user.role === 'student' ? '3' : user.role === 'faculty' ? '12' : '45'}
                    </p>
                    <p className="text-sm text-uc-gray-600">
                      {user.role === 'student' ? 'Projects' : user.role === 'faculty' ? 'Reviews' : 'Users Managed'}
                    </p>
                  </div>
                  <div className="bg-uc-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-semibold text-uc-gold">
                      {user.role === 'student' ? '2' : user.role === 'faculty' ? '8' : '120'}
                    </p>
                    <p className="text-sm text-uc-gray-600">
                      {user.role === 'student' ? 'Completed' : user.role === 'faculty' ? 'Feedback Given' : 'Actions'}
                    </p>
                  </div>
                  <div className="bg-uc-gray-50 rounded-lg p-3">
                    <p className="text-2xl font-semibold text-green-600">85%</p>
                    <p className="text-sm text-uc-gray-600">Activity Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {mode === 'edit' ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-uc-blue hover:bg-uc-blue-dark">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={confirmSave}
        title="Confirm User Changes"
        message={`Are you sure you want to save the changes to ${userData.name}'s account? This will update their profile information.`}
        confirmText="Save Changes"
        cancelText="Cancel"
      />
    </>
  );
}