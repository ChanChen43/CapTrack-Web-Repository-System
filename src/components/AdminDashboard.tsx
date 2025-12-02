import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockSystemStats, mockUserActivities, mockSystemSettings, mockProjects } from '../lib/mockData';
import { SettingsPage } from './SettingsPage';
import { AdminSettings } from './AdminSettings';
import { AdminUserManagement } from './AdminUserManagement';
import { NotificationToast, useNotifications } from './NotificationToast';
import { useConfirmation } from './ConfirmationDialog';
import { ProjectViewModal } from './ProjectViewModal';
import { 
  Shield,
  Users,
  Database,
  Activity,
  Settings,
  UserPlus,
  Download,
  Upload,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  LogOut,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  HardDrive,
  Zap,
  TrendingUp,
  Server
} from 'lucide-react';

interface AdminDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminDashboard({ currentView, setCurrentView }: AdminDashboardProps) {
  const { user, requestLogout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showProjectView, setShowProjectView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedUserRole, setSelectedUserRole] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activityFilter, setActivityFilter] = useState({
    action: 'all',
    user: 'all',
    dateRange: 'all'
  });
  const { notifications, addNotification, removeNotification } = useNotifications();
  const { showConfirmation, confirmDialog } = useConfirmation();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'system', label: 'System Health', icon: Server },
    { id: 'activity', label: 'Activity Logs', icon: Activity },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  // Filter users based on search and role
  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (u.studentId && u.studentId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedUserRole === 'all' || u.role === selectedUserRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-uc-accent text-white';
      case 'faculty':
        return 'bg-uc-blue text-white';
      case 'student':
        return 'bg-uc-gray-100 text-uc-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'uploaded_file':
        return <Upload className="w-4 h-4 text-uc-blue" />;
      case 'provided_feedback':
        return <FileText className="w-4 h-4 text-uc-gold" />;
      case 'created_project':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'graded_submission':
        return <CheckCircle className="w-4 h-4 text-uc-blue" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleViewProject = (project: any) => {
    // Transform project data to match ProjectViewModal format
    const projectData = {
      id: project.id,
      title: project.title,
      student: {
        name: project.studentName,
        studentId: project.studentId || 'STU-' + Math.random().toString(36).substr(2, 9),
        email: project.studentName.toLowerCase().replace(' ', '.') + '@uc.edu.ph'
      },
      status: project.status === 'in-progress' ? 'submitted' : project.status === 'planning' ? 'needs-revision' : 'approved',
      submissionDate: '2024-11-15',
      lastModified: '2024-11-20',
      description: `This capstone project titled "${project.title}" represents comprehensive research and development work in the field. The project demonstrates advanced understanding of core concepts and practical application of learned methodologies.`,
      files: [
        {
          name: 'Final_Report.pdf',
          size: '2.5 MB',
          type: 'PDF',
          uploadDate: '2024-11-15'
        },
        {
          name: 'Source_Code.zip',
          size: '15.2 MB',
          type: 'ZIP',
          uploadDate: '2024-11-15'
        },
        {
          name: 'Presentation.pptx',
          size: '8.7 MB',
          type: 'PowerPoint',
          uploadDate: '2024-11-14'
        }
      ],
      feedback: project.status === 'completed' ? 'Excellent work! The project demonstrates thorough understanding and practical application.' : undefined,
      grade: project.status === 'completed' ? 'A' : undefined,
      advisor: project.advisorName
    };
    
    setSelectedProject(projectData);
    setShowProjectView(true);
  };

  const handleExportLogs = () => {
    addNotification({
      type: 'success',
      title: 'Export Started',
      message: 'Exporting logs...'
    });
  };

  const handleApplyFilter = () => {
    addNotification({
      type: 'success',
      title: 'Filter Applied',
      message: 'Activity logs have been filtered successfully.'
    });
    setShowFilterModal(false);
  };

  const resetFilter = () => {
    setActivityFilter({
      action: 'all',
      user: 'all',
      dateRange: 'all'
    });
  };

  return (
    <>
      <NotificationToast 
        notifications={notifications}
        onRemove={removeNotification}
      />
      {confirmDialog}
      <div className="flex h-screen bg-background">
      {/* Sidebar with UC Theme */}
      <div className="w-64 bg-card border-r border-border shadow-uc-blue flex flex-col">
        <div className="border-b border-border p-4 bg-gradient-to-r from-uc-blue to-uc-blue-dark">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-uc-gold">
              <Shield className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-foreground">CapTrack - UC</h2>
              <p className="text-sm text-accent">Admin Portal</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-2">
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Administration
            </p>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  currentView === item.id
                    ? 'bg-primary text-primary-foreground shadow-uc-blue'
                    : 'text-foreground hover:bg-secondary hover:shadow-uc-gold/20'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border p-2">
          <button
            onClick={requestLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-semibold text-foreground">System Administrator</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-uc-gold text-white">Admin</Badge>
            <Badge variant="secondary">{user?.department}</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {currentView === 'settings' && <AdminSettings />}
          
          {currentView === 'dashboard' && (
            <div className="p-6">
              <div className="space-y-6">
                {/* System Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="shadow-uc-blue/5 border-uc-blue/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="w-4 h-4 text-uc-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue">{mockSystemStats.totalUsers}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-uc-gold font-medium">{mockSystemStats.activeUsers}</span> active this month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-uc-gold/5 border-uc-gold/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                      <FileText className="w-4 h-4 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold">{mockSystemStats.totalProjects}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-uc-blue font-medium">{mockSystemStats.completedProjects}</span> completed
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-uc-blue/5 border-uc-blue/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                      <Upload className="w-4 h-4 text-uc-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue">{mockSystemStats.totalSubmissions}</div>
                      <p className="text-xs text-muted-foreground">Total submissions received</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-uc-gold/5 border-uc-gold/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                      <HardDrive className="w-4 h-4 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold">{mockSystemStats.totalStorage} GB</div>
                      <Progress value={65} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">65% of allocated space</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="shadow-uc-blue/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-uc-blue">
                      <Zap className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button onClick={() => setCurrentView('users')} className="h-auto p-4 flex flex-col gap-2">
                        <UserPlus className="w-6 h-6" />
                        <span className="text-sm">Add User</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col gap-2 border-uc-gold/50 text-uc-gold hover:bg-uc-gold hover:text-white hover:border-uc-gold transition-all"
                        onClick={() => {
                          addNotification({
                            type: 'success',
                            title: 'Export Started',
                            message: 'Exporting system data... This may take a few minutes.'
                          });
                        }}
                      >
                        <Download className="w-6 h-6" />
                        <span className="text-sm">Export Data</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentView('system')} 
                        className="h-auto p-4 flex flex-col gap-2 border-uc-blue/50 text-uc-blue hover:bg-uc-blue hover:text-white hover:border-uc-blue transition-all"
                      >
                        <Database className="w-6 h-6" />
                        <span className="text-sm">System Health</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentView('activity')} 
                        className="h-auto p-4 flex flex-col gap-2 border-uc-gold/50 text-uc-gold hover:bg-uc-gold hover:text-white hover:border-uc-gold transition-all"
                      >
                        <Activity className="w-6 h-6" />
                        <span className="text-sm">View Logs</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-uc-blue">
                      <TrendingUp className="w-5 h-5" />
                      Recent System Activity
                    </CardTitle>
                    <CardDescription>Latest user actions and system events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUserActivities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                          {getActivityIcon(activity.action)}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{activity.userName}</div>
                            <div className="text-sm text-muted-foreground">{activity.details}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setCurrentView('activity')}
                    >
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'users' && (
            <div className="p-6">
              <AdminUserManagement
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedUserRole={selectedUserRole}
                setSelectedUserRole={setSelectedUserRole}
              />
            </div>
          )}

          {currentView === 'projects' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-uc-blue">Project Management</h2>
                  <p className="text-muted-foreground">Overview of all capstone projects</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-uc-blue/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-uc-blue">Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue">
                        {mockProjects.filter(p => p.status === 'in-progress').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-uc-gold/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-uc-gold">Planning Phase</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold">
                        {mockProjects.filter(p => p.status === 'planning').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-600">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {mockProjects.filter(p => p.status === 'completed').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-uc-blue/10 hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <div className="font-medium text-uc-blue">{project.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {project.studentName} • Advisor: {project.advisorName}
                            </div>
                            <div className="mt-2">
                              <Progress value={project.progress} className="w-32" />
                              <span className="text-xs text-muted-foreground ml-2">{project.progress}%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              project.status === 'completed' ? 'bg-green-100 text-green-700' :
                              project.status === 'in-progress' ? 'bg-uc-blue text-white' :
                              'bg-uc-gold text-white'
                            }>
                              {project.status.replace('-', ' ')}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleViewProject(project)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'system' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-uc-blue">System Health</h2>
                  <p className="text-muted-foreground">Monitor system performance and resources</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Server Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-green-600">Online</div>
                      <div className="text-xs text-muted-foreground">99.9% uptime</div>
                    </CardContent>
                  </Card>

                  <Card className="border-uc-blue/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-uc-blue">CPU Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-uc-blue">45%</div>
                      <Progress value={45} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card className="border-uc-gold/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-uc-gold">Memory Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-uc-gold">62%</div>
                      <Progress value={62} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card className="border-orange-500/20">
                    <CardHeader>
                      <CardTitle className="text-sm text-orange-600">Disk Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-orange-600">78%</div>
                      <Progress value={78} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-uc-blue">System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSystemSettings.map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <div className="font-medium">{setting.description}</div>
                            <div className="text-sm text-muted-foreground">{setting.category}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {setting.key === 'auto_backup_enabled' || setting.key === 'notification_emails' ? (
                              <Switch checked={setting.value === 'true'} />
                            ) : (
                              <Input 
                                value={setting.value} 
                                className="w-20 text-center"
                                disabled
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'activity' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-uc-blue">Activity Logs</h2>
                  <p className="text-muted-foreground">Monitor user actions and system events</p>
                </div>

                <Card className="border-uc-blue/20 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-uc-blue">Recent Activity</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleExportLogs}
                          className="border-uc-gold text-uc-gold hover:bg-uc-gold hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Logs
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowFilterModal(true)}
                          className="border-uc-blue text-uc-blue hover:bg-uc-blue hover:text-white"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUserActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-4 border border-uc-blue/20 rounded-lg hover:shadow-md hover:border-uc-blue/40 transition-all bg-gradient-to-r from-white to-uc-blue/5">
                          <div className="p-2 bg-uc-gold/10 rounded-full">
                            {getActivityIcon(activity.action)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-uc-blue">{activity.userName}</span>
                              <Badge variant="secondary" className="text-xs bg-uc-gold/10 text-uc-gold border-uc-gold/20">
                                {activity.action.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {activity.details}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
      </div>

      {/* Project View Modal */}
      <ProjectViewModal
        isOpen={showProjectView}
        onClose={() => setShowProjectView(false)}
        project={selectedProject}
      />

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-uc-blue">Filter Activity Logs</DialogTitle>
            <DialogDescription>
              Apply filters to view specific activity logs
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="action-filter">Action Type</Label>
              <Select 
                value={activityFilter.action} 
                onValueChange={(value) => setActivityFilter(prev => ({ ...prev, action: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="uploaded_file">File Uploads</SelectItem>
                  <SelectItem value="provided_feedback">Feedback</SelectItem>
                  <SelectItem value="created_project">Project Creation</SelectItem>
                  <SelectItem value="graded_submission">Grading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="user-filter">User Type</Label>
              <Select 
                value={activityFilter.user} 
                onValueChange={(value) => setActivityFilter(prev => ({ ...prev, user: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="date-filter">Date Range</Label>
              <Select 
                value={activityFilter.dateRange} 
                onValueChange={(value) => setActivityFilter(prev => ({ ...prev, dateRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetFilter}>
              Reset
            </Button>
            <Button onClick={handleApplyFilter} className="bg-uc-blue hover:bg-uc-blue-dark text-white">
              Apply Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}