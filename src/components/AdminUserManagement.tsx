import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { FileUploadModal } from './FileUploadModal';
import { UserDetailsModal } from './UserDetailsModal';
import { DeleteAccountModal } from './DeleteAccountModal';
import { AdminSecurityModal } from './AdminSecurityModal';
import { mockUsers } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { 
  Search,
  Filter,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
  GraduationCap,
  Users,
  Download,
  Upload
} from 'lucide-react';

interface AdminUserManagementProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUserRole: string;
  setSelectedUserRole: (role: string) => void;
}

export function AdminUserManagement({ 
  searchTerm, 
  setSearchTerm, 
  selectedUserRole, 
  setSelectedUserRole 
}: AdminUserManagementProps) {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    department: '',
    studentId: ''
  });

  // Modal states
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showEditSecurity, setShowEditSecurity] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [pendingAction, setPendingAction] = useState<string>('');

  // Filter users based on search and role
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.studentId && user.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedUserRole === 'all' || user.role === selectedUserRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'role-admin';
      case 'faculty':
        return 'role-faculty';
      case 'student':
        return 'role-student';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'faculty':
        return <Users className="w-4 h-4" />;
      case 'student':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleAddUser = () => {
    console.log('Adding user:', newUser);
    toast.success('User added successfully!');
    setIsAddUserOpen(false);
    setNewUser({ name: '', email: '', role: 'student', department: '', studentId: '' });
  };

  const handleExportUsers = () => {
    toast.success('Exporting data...', {
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setPendingAction('edit');
    setShowEditSecurity(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteUser(true);
  };

  const handleEditSecurityConfirm = () => {
    if (pendingAction === 'edit') {
      // Show edit modal or redirect to edit page
      toast.success('Admin verification successful. You can now edit the user.');
    }
    setShowEditSecurity(false);
    setPendingAction('');
  };

  const userStats = {
    total: mockUsers.length,
    students: mockUsers.filter(u => u.role === 'student').length,
    faculty: mockUsers.filter(u => u.role === 'faculty').length,
    admin: mockUsers.filter(u => u.role === 'admin').length
  };

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-uc-blue/5 hover-uc-blue transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-uc-blue" />
              <div>
                <div className="text-2xl font-bold text-uc-blue">{userStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-uc-gold/5 hover-uc-gold transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-uc-gold" />
              <div>
                <div className="text-2xl font-bold text-uc-gold">{userStats.students}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-uc-blue/5 hover-uc-blue transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-uc-blue" />
              <div>
                <div className="text-2xl font-bold text-uc-blue">{userStats.faculty}</div>
                <div className="text-sm text-muted-foreground">Faculty</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-uc-gold/5 hover-uc-gold transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-uc-gold" />
              <div>
                <div className="text-2xl font-bold text-uc-gold">{userStats.admin}</div>
                <div className="text-sm text-muted-foreground">Admins</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management Actions */}
      <Card className="admin-card-gradient">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-uc-blue">User Management</CardTitle>
              <CardDescription>Manage system users and their roles</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportUsers}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Users
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFileUpload(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Users
              </Button>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-uc-blue hover:bg-uc-blue-dark text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-uc-blue">Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account in the system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="faculty">Faculty</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newUser.department}
                        onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Enter department"
                      />
                    </div>
                    {newUser.role === 'student' && (
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          value={newUser.studentId}
                          onChange={(e) => setNewUser(prev => ({ ...prev, studentId: e.target.value }))}
                          placeholder="Enter student ID"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser} className="bg-uc-blue hover:bg-uc-blue-dark text-white">
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedUserRole} onValueChange={setSelectedUserRole}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="student">Students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-uc-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Student ID</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow 
                    key={user.id} 
                    className={`hover:bg-uc-gray-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-uc-gray-50/30'
                    }`}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleColor(user.role)} flex items-center gap-1 w-fit`}>
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.department || '-'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{user.studentId || '-'}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No users found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <FileUploadModal
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        title="Import Users"
        acceptedTypes=".csv,.xlsx,.xls"
      />

      <UserDetailsModal
        isOpen={showUserDetails}
        onClose={() => setShowUserDetails(false)}
        user={selectedUser}
      />

      <DeleteAccountModal
        isOpen={showDeleteUser}
        onClose={() => setShowDeleteUser(false)}
        onConfirm={() => {
          toast.success(`User ${selectedUser?.name} has been deleted.`);
          setSelectedUser(null);
        }}
      />

      <AdminSecurityModal
        isOpen={showEditSecurity}
        onClose={() => setShowEditSecurity(false)}
        onConfirm={handleEditSecurityConfirm}
        title="Edit User Verification"
        message="Please verify your admin credentials before editing user information."
      />
    </div>
  );
}