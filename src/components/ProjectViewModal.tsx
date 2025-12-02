import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Eye, 
  Download, 
  FileText, 
  Calendar, 
  User, 
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProjectData {
  id: string;
  title: string;
  student: {
    name: string;
    studentId: string;
    email: string;
  };
  status: 'submitted' | 'reviewed' | 'approved' | 'needs-revision';
  submissionDate: string;
  lastModified: string;
  description: string;
  files: Array<{
    name: string;
    size: string;
    type: string;
    uploadDate: string;
  }>;
  feedback?: string;
  grade?: string;
  advisor?: string;
}

interface ProjectViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'submitted':
      return <Clock className="w-4 h-4 text-blue-500" />;
    case 'reviewed':
      return <Eye className="w-4 h-4 text-orange-500" />;
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'needs-revision':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-100 text-blue-800';
    case 'reviewed':
      return 'bg-orange-100 text-orange-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'needs-revision':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function ProjectViewModal({ isOpen, onClose, project }: ProjectViewModalProps) {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  if (!project) return null;

  const handleDownloadFile = (fileName: string) => {
    setDownloadingFile(fileName);
    toast.success(`Downloading ${fileName}...`);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloadingFile(null);
    }, 2000);
  };

  const handlePreviewFile = (fileName: string) => {
    toast.info(`Opening preview for ${fileName}...`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-uc-blue" />
            Project Details
          </DialogTitle>
          <DialogDescription>
            View comprehensive details about this project submission including files and feedback.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Project Header */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2">
                  {getStatusIcon(project.status)}
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  {project.grade && (
                    <Badge variant="outline">
                      Grade: {project.grade}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{project.student.name}</p>
                    <p className="text-xs text-gray-500">{project.student.studentId}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-gray-500">{project.submissionDate}</p>
                  </div>
                </div>
                
                {project.advisor && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Advisor</p>
                      <p className="text-xs text-gray-500">{project.advisor}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Project Description */}
            <div>
              <h3 className="text-lg font-medium mb-3">Project Description</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <Separator />

            {/* Project Files */}
            <div>
              <h3 className="text-lg font-medium mb-3">Project Files</h3>
              <div className="space-y-3">
                {project.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-uc-blue" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {file.size} • Uploaded {file.uploadDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreviewFile(file.name)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadFile(file.name)}
                        disabled={downloadingFile === file.name}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {downloadingFile === file.name ? 'Downloading...' : 'Download'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            {project.feedback && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-3">Feedback</h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {project.feedback}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Student Contact */}
            <Separator />
            <div>
              <h3 className="text-lg font-medium mb-3">Student Contact</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {project.student.email}</p>
                  <p><span className="font-medium">Student ID:</span> {project.student.studentId}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}