import React, { useState, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { useAuth } from '../contexts/AuthContext';
import { mockSubmissions, mockProjects, mockFeedback } from '../lib/mockData';
import { FeedbackPage } from './FeedbackPage';
import { RepositoryPage } from './RepositoryPage';
import { SettingsPage } from './SettingsPage';
import { ProfileModal } from './ProfileModal';
import { DocumentModal } from './DocumentModal';
import { toast } from 'sonner@2.0.3';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Search,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  GraduationCap,
  Star,
  Home,
  Settings,
  User,
  TrendingUp,
  Target
} from 'lucide-react';

interface FacultyDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function FacultyDashboard({ currentView, setCurrentView }: FacultyDashboardProps) {
  const { user, requestLogout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'submissions', label: 'Submissions', icon: FileText },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'repository', label: 'Repository', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Filter submissions based on search term
  const filteredSubmissions = mockSubmissions.filter(submission =>
    submission.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'needs-revision':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'reviewed':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'needs-revision':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const pendingSubmissions = mockSubmissions.filter(s => s.status === 'pending').length;
  const totalProjects = mockProjects.length;
  const averageGrade = mockSubmissions
    .filter(s => s.grade)
    .reduce((acc, s) => acc + (s.grade || 0), 0) / mockSubmissions.filter(s => s.grade).length || 0;

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission);
    setViewModalOpen(true);
  };

  const handleDownloadSubmission = (submission: any) => {
    toast.success(`Downloading ${submission.fileName}...`, {
      description: 'The file will be saved to your downloads folder.'
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="border-b p-4 bg-gradient-to-r from-primary to-primary/90">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-foreground">CapTrack - UC</h2>
              <p className="text-sm text-accent">Faculty Portal</p>
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
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  currentView === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
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
            <div>
              <h1 className="text-xl font-semibold">Welcome back, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Faculty Portal - {user?.department}</p>
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
          {currentView === 'feedback' && <FeedbackPage />}
          {currentView === 'repository' && <RepositoryPage />}
          {currentView === 'settings' && <SettingsPage />}
          
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <div className="p-6">
              <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Total Projects Card */}
                  <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-blue">Total Projects</CardTitle>
                      <FileText className="w-5 h-5 text-uc-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue mb-2">{totalProjects}</div>
                      <p className="text-xs text-muted-foreground">Active capstone projects</p>
                    </CardContent>
                  </Card>

                  {/* Pending Reviews Card */}
                  <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-gold">Pending Reviews</CardTitle>
                      <Clock className="w-5 h-5 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold mb-2">{pendingSubmissions}</div>
                      <p className="text-xs text-muted-foreground">Submissions awaiting review</p>
                    </CardContent>
                  </Card>

                  {/* Average Grade Card */}
                  <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-blue">Average Grade</CardTitle>
                      <Star className="w-5 h-5 text-uc-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-blue mb-2">{averageGrade.toFixed(1)}%</div>
                      <p className="text-xs text-muted-foreground">Across all graded submissions</p>
                    </CardContent>
                  </Card>

                  {/* Students Card */}
                  <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-sm font-semibold text-uc-gold">Students</CardTitle>
                      <Users className="w-5 h-5 text-uc-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-uc-gold mb-2">{mockProjects.length}</div>
                      <p className="text-xs text-muted-foreground">Under supervision</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Projects */}
                <Card className="border-uc-blue/20 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-uc-blue">Active Projects</CardTitle>
                    <CardDescription>Overview of current capstone projects under supervision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockProjects.slice(0, 6).map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border border-uc-blue/20 rounded-lg hover:shadow-md hover:border-uc-blue/40 transition-all bg-gradient-to-r from-white to-uc-blue/5">
                          <div className="flex-1">
                            <div className="font-semibold text-uc-blue">{project.title}</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {project.studentName} • {project.progress}% complete
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.replace('-', ' ')}
                            </Badge>
                            <Button size="sm" variant="outline" className="border-uc-gold text-uc-gold hover:bg-uc-gold hover:text-white">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Feedback
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {mockProjects.length > 6 && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-uc-blue text-uc-blue hover:bg-uc-blue hover:text-white"
                        onClick={() => setCurrentView('submissions')}
                      >
                        View All Projects ({mockProjects.length})
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Submissions View */}
          {currentView === 'submissions' && (
            <div className="p-6">
              <div className="space-y-6">
                {/* Submissions Table */}
                <Card className="shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-uc-blue">Student Submissions</CardTitle>
                        <CardDescription>Review and manage student project submissions</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Search submissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Project Title</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{submission.studentName}</div>
                                  <div className="text-sm text-muted-foreground">{submission.studentId}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="max-w-48 truncate" title={submission.projectTitle}>
                                  {submission.projectTitle}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <div className="font-medium text-sm">{submission.fileName}</div>
                                  <div className="text-xs text-muted-foreground">PDF Document</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(submission.status)}
                                  <Badge className={getStatusColor(submission.status)}>
                                    {submission.status.replace('-', ' ')}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                {submission.grade ? (
                                  <span className="font-medium">{submission.grade}%</span>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-uc-blue text-uc-blue hover:bg-uc-blue hover:text-white"
                                    onClick={() => handleViewSubmission(submission)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-uc-gold text-uc-gold hover:bg-uc-gold hover:text-white"
                                    onClick={() => handleDownloadSubmission(submission)}
                                  >
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
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
            employeeId: user.id
          }}
        />
      )}

      {/* Document View Modal */}
      {selectedSubmission && (
        <DocumentModal
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedSubmission(null);
          }}
          document={{
            fileName: selectedSubmission.fileName,
            fileUrl: selectedSubmission.fileUrl,
            projectTitle: selectedSubmission.projectTitle,
            studentName: selectedSubmission.studentName,
            submittedAt: selectedSubmission.submittedAt
          }}
        />
      )}
    </div>
  );
}
