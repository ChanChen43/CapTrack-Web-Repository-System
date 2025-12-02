export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  studentId?: string;
  department?: string;
  permissions?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  studentId: string;
  studentName: string;
  status: 'planning' | 'in-progress' | 'completed' | 'submitted';
  progress: number;
  createdAt: string;
  updatedAt: string;
  advisorId?: string;
  advisorName?: string;
}

export interface Submission {
  id: string;
  projectId: string;
  projectTitle: string;
  studentName: string;
  studentId: string;
  submittedAt: string;
  fileUrl: string;
  fileName: string;
  status: 'pending' | 'reviewed' | 'approved' | 'needs-revision';
  grade?: number;
}

export interface Feedback {
  id: string;
  projectId: string;
  submissionId?: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  content: string;
  type: 'general' | 'submission' | 'progress';
  createdAt: string;
  isRead: boolean;
}

export interface Upload {
  id: string;
  projectId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: string;
  type: 'document' | 'presentation' | 'code' | 'other' | 'image' | 'video' | 'data' | 'design';
}

export interface SystemStats {
  totalUsers: number;
  totalProjects: number;
  totalSubmissions: number;
  totalStorage: number;
  activeUsers: number;
  completedProjects: number;
  totalFeedback?: number;
  activeProjects?: number;
  pendingSubmissions?: number;
  totalUploads?: number;
}

export interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  details?: string;
  resourceType?: string;
  resourceId?: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
}

export interface RepositoryFile {
  id: string;
  name: string;
  type: 'document' | 'template' | 'guide' | 'sample' | 'resource' | 'presentation';
  category: string;
  description: string;
  downloadCount: number;
  uploadedAt: string;
  uploadedBy: string;
  fileSize?: number;
  size?: number;
  tags?: string[];
  isPublic?: boolean;
}