import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { mockProjects, mockFeedback } from '../lib/mockData';
import { UploadPage } from './UploadPage';
import { FeedbackPage } from './FeedbackPage';
import { RepositoryPage } from './RepositoryPage';
import { SettingsPage } from './SettingsPage';
import { ProfileModal } from './ProfileModal';
import { 
  Home, 
  Upload, 
  MessageSquare, 
  FileText, 
  Settings,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Menu,
  User,
  TrendingUp,
  Target
} from 'lucide-react';

interface StudentDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function StudentDashboard({ currentView, setCurrentView }: StudentDashboardProps) {
  const { user, requestLogout } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // Get student's project (use optional chaining and fallbacks)
  const studentProject = mockProjects.find(p => p.studentId === user?.id) || null;
  const studentFeedback = mockFeedback.filter(f => f.toUserId === user?.id) || [];
  const unreadFeedback = studentFeedback.filter(f => !f.isRead) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-uc-blue" />;
      case 'planning':
        return <AlertCircle className="w-5 h-5 text-uc-gold" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = unreadFeedback?.length || 0;
  
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Files', icon: Upload },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, badge: unreadCount },
    { id: 'repository', label: 'Repository', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Simplified Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="border-b p-4 bg-gradient-to-r from-primary to-primary/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-foreground">CapTrack - UC</h2>
              <p className="text-sm text-accent">Student Portal</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-2">
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Navigation
            </p>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                  currentView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t p-2">
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
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-muted-foreground" />
            <div>
              <h1 className="text-xl font-semibold">Welcome back, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Student ID: {user?.studentId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Badge variant="secondary">{user?.department}</Badge>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {currentView === 'upload' && <UploadPage />}
          {currentView === 'feedback' && <FeedbackPage />}
          {currentView === 'repository' && <RepositoryPage />}
          {currentView === 'settings' && <SettingsPage />}
          {currentView === 'dashboard' && (
            <div className="p-6">{/* Dashboard content */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Project Status Card */}
                  <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-blue">Project Status</CardTitle>
                      {studentProject && getStatusIcon(studentProject.status)}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue mb-2">
                        {studentProject ? studentProject.status.replace('-', ' ').toUpperCase() : 'No Project'}
                      </div>
                      <p className="text-xs text-muted-foreground">Current project state</p>
                    </CardContent>
                  </Card>

                  {/* Progress Card */}
                  <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-gold">Progress</CardTitle>
                      <Target className="w-5 h-5 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold mb-2">{studentProject?.progress || 0}%</div>
                      <Progress value={studentProject?.progress || 0} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">Project completion</p>
                    </CardContent>
                  </Card>

                  {/* Unread Feedback Card */}
                  <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-blue">Unread Feedback</CardTitle>
                      <MessageSquare className="w-5 h-5 text-uc-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue mb-2">{unreadFeedback.length}</div>
                      <p className="text-xs text-muted-foreground">New messages from advisor</p>
                    </CardContent>
                  </Card>

                  {/* Advisor Card */}
                  <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-gold">Advisor</CardTitle>
                      <User className="w-5 h-5 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold text-uc-gold mb-1">
                        {studentProject?.advisorName || 'Not Assigned'}
                      </div>
                      <p className="text-xs text-muted-foreground">Your project supervisor</p>
                    </CardContent>
                  </Card>
                </div>

                {studentProject && (
                  <Card className="border-uc-blue/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-uc-blue">Current Project</CardTitle>
                      <CardDescription>Your capstone project details and progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-uc-blue">{studentProject.title}</h3>
                        <Badge className={getStatusColor(studentProject.status)}>
                          {studentProject.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground">{studentProject.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-uc-blue font-medium">Progress</span>
                          <span className="font-semibold text-uc-blue">{studentProject.progress}%</span>
                        </div>
                        <Progress value={studentProject.progress} className="h-3" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-uc-blue/5 rounded-lg border border-uc-blue/20">
                          <span className="text-muted-foreground">Started: </span>
                          <span className="font-medium">{new Date(studentProject.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="p-3 bg-uc-gold/5 rounded-lg border border-uc-gold/20">
                          <span className="text-muted-foreground">Last Updated: </span>
                          <span className="font-medium">{new Date(studentProject.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button onClick={() => setCurrentView('upload')} className="bg-uc-blue hover:bg-uc-blue-dark">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Files
                        </Button>
                        <Button variant="outline" onClick={() => setCurrentView('feedback')} className="border-uc-gold text-uc-gold hover:bg-uc-gold hover:text-white">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          View Feedback
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {studentFeedback.length > 0 && (
                  <Card className="border-uc-gold/20 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-uc-gold">Recent Feedback</CardTitle>
                      <CardDescription>Latest feedback from your advisor</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {studentFeedback.slice(0, 5).map((feedback) => (
                          <div key={feedback.id} className="border-l-4 border-uc-blue pl-4 p-3 bg-gradient-to-r from-uc-blue/5 to-transparent rounded-r-lg hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sm text-uc-blue">{feedback.fromUserName}</span>
                              <div className="flex items-center gap-2">
                                {!feedback.isRead && (
                                  <Badge variant="destructive" className="text-xs">New</Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {new Date(feedback.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {feedback.content}
                            </p>
                          </div>
                        ))}
                      </div>
                      {studentFeedback.length > 5 && (
                        <Button 
                          variant="outline" 
                          className="w-full mt-4 border-uc-gold text-uc-gold hover:bg-uc-gold hover:text-white"
                          onClick={() => setCurrentView('feedback')}
                        >
                          View All Feedback ({studentFeedback.length})
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>
        </div>

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={{
            name: user.name,
            email: user.email,
            role: user.role,
            course: user.department,
            studentId: user.studentId
          }}
        />
      )}
      </div>
  );
}
