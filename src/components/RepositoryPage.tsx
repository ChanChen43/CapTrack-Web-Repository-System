import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockUploads, mockProjects } from '../lib/mockData';
import { useAuth } from '../contexts/AuthContext';
import { DocumentModal } from './DocumentModal';
import { ConfirmationDialog } from './ConfirmationDialog';
import { toast } from 'sonner@2.0.3';
import { 
  Search, 
  Download, 
  Eye, 
  Filter,
  FileText,
  Code,
  Image,
  Archive,
  Calendar,
  User,
  Folder
} from 'lucide-react';

interface RepositoryPageProps {
  onNavigate?: (view: string) => void;
}

export function RepositoryPage({ onNavigate }: RepositoryPageProps = {}) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [downloadConfirmOpen, setDownloadConfirmOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const isStudent = user?.role === 'student';

  // Get files based on user role
  const availableFiles = isStudent 
    ? mockUploads.filter(upload => {
        const project = mockProjects.find(p => p.id === upload.projectId);
        return project?.studentId === user?.id;
      })
    : mockUploads; // Faculty can see all files

  // Filter and sort files
  const filteredFiles = availableFiles
    .filter(file => {
      const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || file.type === typeFilter;
      const matchesProject = projectFilter === 'all' || file.projectId === projectFilter;
      return matchesSearch && matchesType && matchesProject;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fileName.localeCompare(b.fileName);
        case 'size':
          return b.fileSize - a.fileSize;
        case 'type':
          return a.type.localeCompare(b.type);
        default: // date
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

  const getFileIcon = (filename: string, type: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (type === 'code' || ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(extension || '')) {
      return <Code className="w-5 h-5 text-blue-500" />;
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-green-500" />;
    }
    if (['zip', 'rar', '7z', 'tar'].includes(extension || '')) {
      return <Archive className="w-5 h-5 text-orange-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-800';
      case 'code':
        return 'bg-green-100 text-green-800';
      case 'presentation':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getProjectTitle = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project?.title || 'Unknown Project';
  };

  const handleViewFile = (file: any) => {
    setSelectedFile(file);
    setViewModalOpen(true);
  };

  const handleDownloadFile = (file: any) => {
    setSelectedFile(file);
    setDownloadConfirmOpen(true);
  };

  const confirmDownload = () => {
    if (selectedFile) {
      // Simulate download
      toast.success(`Downloaded ${selectedFile.fileName} successfully!`);
      setDownloadConfirmOpen(false);
      setSelectedFile(null);
    }
  };

  const totalFiles = filteredFiles.length;
  const totalSize = filteredFiles.reduce((acc, file) => acc + file.fileSize, 0);
  const fileTypes = [...new Set(filteredFiles.map(f => f.type))].length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Repository</h1>
          <p className="text-muted-foreground">
            {isStudent 
              ? 'Browse and manage your project files'
              : 'Browse all project files and submissions'
            }
          </p>
        </div>
        {onNavigate && (
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-uc-blue">Total Files</CardTitle>
            <FileText className="w-5 h-5 text-uc-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-uc-blue mb-2">{totalFiles}</div>
            <p className="text-xs text-muted-foreground">Files in repository</p>
          </CardContent>
        </Card>

        <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-uc-gold">Total Size</CardTitle>
            <Archive className="w-5 h-5 text-uc-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-uc-gold mb-2">{formatFileSize(totalSize)}</div>
            <p className="text-xs text-muted-foreground">Storage used</p>
          </CardContent>
        </Card>

        <Card className="border-uc-blue/30 bg-gradient-to-br from-white via-uc-blue/5 to-uc-blue/10 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-uc-blue">File Types</CardTitle>
            <Folder className="w-5 h-5 text-uc-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-uc-blue mb-2">{fileTypes}</div>
            <p className="text-xs text-muted-foreground">Different file types</p>
          </CardContent>
        </Card>

        <Card className="border-uc-gold/30 bg-gradient-to-br from-white via-uc-gold/5 to-uc-gold/10 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-uc-gold">Projects</CardTitle>
            <User className="w-5 h-5 text-uc-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-uc-gold mb-2">
              {isStudent ? 1 : mockProjects.length}
            </div>
            <p className="text-xs text-muted-foreground">{isStudent ? 'Your project' : 'Total projects'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Search Files</Label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>File Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="presentation">Presentations</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isStudent && (
              <div className="space-y-2">
                <Label>Project</Label>
                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {mockProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Upload Date</SelectItem>
                  <SelectItem value="name">File Name</SelectItem>
                  <SelectItem value="size">File Size</SelectItem>
                  <SelectItem value="type">File Type</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setProjectFilter('all');
                  setSortBy('date');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files Table */}
      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardDescription>
            {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No files found</h3>
              <p className="text-muted-foreground">
                {searchTerm || typeFilter !== 'all' || projectFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No files have been uploaded yet'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    {!isStudent && <TableHead>Project</TableHead>}
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.fileName, file.type)}
                          <div>
                            <div className="font-medium">{file.fileName}</div>
                            <div className="text-sm text-muted-foreground">
                              {file.fileName.split('.').pop()?.toUpperCase()} file
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      {!isStudent && (
                        <TableCell>
                          <div className="max-w-40 truncate" title={getProjectTitle(file.projectId)}>
                            {getProjectTitle(file.projectId)}
                          </div>
                        </TableCell>
                      )}
                      
                      <TableCell>
                        <Badge className={getTypeColor(file.type)}>
                          {file.type}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>{formatFileSize(file.fileSize)}</TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      
                      <TableCell>{file.uploadedBy}</TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewFile(file)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadFile(file)}
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
          )}
        </CardContent>
      </Card>

      {/* Document View Modal */}
      {selectedFile && (
        <DocumentModal
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedFile(null);
          }}
          title={selectedFile.fileName}
          fileName={selectedFile.fileName}
          fileType={selectedFile.type}
          onDownload={() => handleDownloadFile(selectedFile)}
        />
      )}

      {/* Download Confirmation */}
      <ConfirmationDialog
        isOpen={downloadConfirmOpen}
        onClose={() => {
          setDownloadConfirmOpen(false);
          setSelectedFile(null);
        }}
        onConfirm={confirmDownload}
        title="Confirm Download"
        message={`Are you sure you want to download "${selectedFile?.fileName}"? The file will be saved to your device.`}
        confirmText="Download"
        cancelText="Cancel"
      />
    </div>
  );
}