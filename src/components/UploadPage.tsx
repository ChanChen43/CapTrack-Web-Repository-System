import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner';
import { 
  Upload, 
  File, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image,
  Code,
  Archive
} from 'lucide-react';

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  type: 'document' | 'presentation' | 'code' | 'other';
}

export function UploadPage() {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('document');
  const [validationError, setValidationError] = useState<string>('');

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_EXTENSIONS = [
    'pdf', 'doc', 'docx', 'txt', 'ppt', 'pptx',
    'jpg', 'jpeg', 'png', 'gif', 'svg',
    'js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css',
    'zip', 'rar', '7z', 'tar'
  ];

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return { 
        valid: false, 
        error: `File "${file.name}" exceeds the maximum size of 50MB.` 
      };
    }

    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      return { 
        valid: false, 
        error: `File "${file.name}" has an unsupported file type.` 
      };
    }

    return { valid: true };
  };

  const handleFiles = useCallback((files: FileList) => {
    setValidationError('');
    
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(files).forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else if (validation.error) {
        errors.push(validation.error);
      }
    });

    // Show validation errors
    if (errors.length > 0) {
      const errorMessage = errors.join(' ');
      setValidationError(errorMessage);
      toast.error('Upload Failed', {
        description: errorMessage
      });
    }

    // Process valid files
    if (validFiles.length > 0) {
      const newUploads: FileUpload[] = validFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        progress: 0,
        status: 'uploading' as const,
        type: selectedType as FileUpload['type']
      }));

      setUploads(prev => [...prev, ...newUploads]);

      // Simulate upload progress
      newUploads.forEach(upload => {
        const interval = setInterval(() => {
          setUploads(prev => prev.map(u => {
            if (u.id === upload.id) {
              const newProgress = Math.min(u.progress + Math.random() * 30, 100);
              const newStatus = newProgress === 100 ? 'completed' : u.status;
              return { ...u, progress: newProgress, status: newStatus };
            }
            return u;
          }));
        }, 200);

        setTimeout(() => {
          clearInterval(interval);
          setUploads(prev => prev.map(u => 
            u.id === upload.id ? { ...u, progress: 100, status: 'completed' } : u
          ));
          toast.success(`Successfully uploaded "${upload.file.name}"`);
        }, 2000);
      });
    }
  }, [selectedType]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(u => u.id !== id));
  };

  const getFileIcon = (filename: string, type: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    
    if (type === 'code' || ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(extension || '')) {
      return <Code className="w-6 h-6 text-blue-500" />;
    }
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
      return <Image className="w-6 h-6 text-green-500" />;
    }
    if (['zip', 'rar', '7z', 'tar'].includes(extension || '')) {
      return <Archive className="w-6 h-6 text-orange-500" />;
    }
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Upload Files</h1>
        <p className="text-muted-foreground">
          Upload your project files, documents, and resources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Upload New Files</CardTitle>
              <CardDescription>
                Drag and drop files here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-type">File Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-muted-foreground mb-4">
                  Supports all file types up to 100MB each
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="bg-uc-blue hover:bg-uc-blue-dark text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {uploads.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Progress</CardTitle>
                <CardDescription>
                  {uploads.filter(u => u.status === 'completed').length} of {uploads.length} files completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploads.map((upload) => (
                    <div key={upload.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {getFileIcon(upload.file.name, upload.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium truncate">{upload.file.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {upload.type}
                            </Badge>
                            {upload.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : upload.status === 'error' ? (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            ) : null}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>{formatFileSize(upload.file.size)}</span>
                          <span>{upload.progress.toFixed(0)}%</span>
                        </div>
                        
                        <Progress value={upload.progress} className="h-2" />
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUpload(upload.id)}
                        className="flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  <strong>File Size Limit:</strong> Maximum 100MB per file
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2 text-sm">
                <h4 className="font-medium">Recommended File Types:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• <strong>Documents:</strong> PDF, DOCX, TXT</li>
                  <li>• <strong>Presentations:</strong> PPTX, PDF</li>
                  <li>• <strong>Code:</strong> ZIP, TAR, Individual files</li>
                  <li>• <strong>Images:</strong> PNG, JPG, SVG</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">project-report.pdf</div>
                    <div className="text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">source-code.zip</div>
                    <div className="text-muted-foreground">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Image className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">ui-mockups.png</div>
                    <div className="text-muted-foreground">3 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}