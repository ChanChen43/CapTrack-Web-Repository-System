import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../contexts/AuthContext';
import { mockFeedback, mockProjects } from '../lib/mockData';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner@2.0.3';
import { 
  MessageSquare, 
  Send, 
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react';

interface FeedbackPageProps {
  onNavigate?: (view: string) => void;
}

export function FeedbackPage({ onNavigate }: FeedbackPageProps = {}) {
  const { user } = useAuth();
  const [newFeedback, setNewFeedback] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [showSendConfirm, setShowSendConfirm] = useState(false);

  const isStudent = user?.role === 'student';
  
  // Get relevant feedback based on user role
  const relevantFeedback = mockFeedback.filter(feedback => {
    if (isStudent) {
      return feedback.toUserId === user?.id;
    } else {
      return feedback.fromUserId === user?.id;
    }
  });

  // Filter feedback
  const filteredFeedback = relevantFeedback.filter(feedback => {
    if (filterType !== 'all' && feedback.type !== filterType) return false;
    if (filterRead === 'read' && !feedback.isRead) return false;
    if (filterRead === 'unread' && feedback.isRead) return false;
    return true;
  });

  const handleSendFeedback = () => {
    if (!newFeedback.trim() || (!isStudent && !selectedProject)) return;
    setShowSendConfirm(true);
  };

  const confirmSendFeedback = () => {
    // In a real app, this would send to an API
    console.log('Sending feedback:', {
      content: newFeedback,
      projectId: selectedProject,
      type: 'general'
    });
    
    const selectedProjectName = mockProjects.find(p => p.id === selectedProject)?.title || 'Unknown Project';
    toast.success(`Feedback sent successfully to ${selectedProjectName}!`);
    
    setNewFeedback('');
    setSelectedProject('');
    setShowSendConfirm(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'progress':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'submission':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = relevantFeedback.filter(f => !f.isRead).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Feedback</h1>
          <p className="text-muted-foreground">
            {isStudent 
              ? 'View feedback from your advisors and instructors'
              : 'Provide feedback to your students'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onNavigate && (
            <Button variant="outline" onClick={() => onNavigate('dashboard')}>
              Back to Dashboard
            </Button>
          )}
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="submission">Submission</SelectItem>
                      <SelectItem value="progress">Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={filterRead} onValueChange={setFilterRead}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {isStudent ? 'Received Feedback' : 'Sent Feedback'}
              </CardTitle>
              <CardDescription>
                {filteredFeedback.length} {filteredFeedback.length === 1 ? 'item' : 'items'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFeedback.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No feedback found</h3>
                  <p className="text-muted-foreground">
                    {filterType !== 'all' || filterRead !== 'all' 
                      ? 'Try adjusting your filters'
                      : 'No feedback has been shared yet'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFeedback.map((feedback) => (
                    <div 
                      key={feedback.id} 
                      className={`p-4 border rounded-lg ${
                        !feedback.isRead ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {isStudent ? feedback.fromUserName : `To: ${feedback.toUserId}`}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                              {new Date(feedback.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!feedback.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                          <div className="flex items-center gap-1">
                            {getTypeIcon(feedback.type)}
                            <Badge className={getTypeColor(feedback.type)}>
                              {feedback.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pl-11">
                        <p className="text-sm leading-relaxed">{feedback.content}</p>
                        
                        {feedback.submissionId && (
                          <div className="mt-3 p-2 bg-muted rounded text-xs">
                            <span className="text-muted-foreground">Related to submission:</span>
                            <span className="ml-1">Midterm Report</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Send New Feedback (Faculty Only) */}
          {!isStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Send Feedback</CardTitle>
                <CardDescription>
                  Provide feedback to a student
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title} - {project.studentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Write your feedback here..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleSendFeedback}
                  disabled={!newFeedback.trim() || !selectedProject}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Feedback Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-medium">{relevantFeedback.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Unread</span>
                <span className="font-medium">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-medium">
                  {relevantFeedback.filter(f => {
                    const feedbackDate = new Date(f.createdAt);
                    const now = new Date();
                    return feedbackDate.getMonth() === now.getMonth() && 
                           feedbackDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All as Read
              </Button>
              {isStudent && (
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Request Feedback
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Send Feedback Confirmation */}
      <ConfirmationDialog
        isOpen={showSendConfirm}
        onClose={() => setShowSendConfirm(false)}
        onConfirm={confirmSendFeedback}
        title="Send Feedback"
        message={`Are you sure you want to send this feedback? The student will be notified immediately.`}
        confirmText="Send Feedback"
        cancelText="Cancel"
      />
    </div>
  );
}