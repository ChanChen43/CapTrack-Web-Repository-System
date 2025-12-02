import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Upload, X, File, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  acceptedTypes?: string;
  maxSizeMB?: number;
}

export function FileUploadModal({ 
  isOpen, 
  onClose,
  title = "Import Users",
  acceptedTypes = ".csv,.xlsx,.xls",
  maxSizeMB = 10
}: FileUploadModalProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast.error(`File type not supported. Please use: ${acceptedTypes}`);
      return;
    }

    setSelectedFile(file);
    startUpload(file);
  };

  const startUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          toast.success(`${file.name} uploaded successfully!`);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (isUploading) {
      // Don't close while uploading unless user really wants to cancel
      if (confirm('Upload in progress. Are you sure you want to cancel?')) {
        resetUpload();
        onClose();
      }
    } else {
      resetUpload();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-uc-blue" />
              {title}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Upload a file by dragging and dropping it here or clicking to browse your device.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!selectedFile && (
            <>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-uc-blue bg-blue-50' 
                    : 'border-gray-300 hover:border-uc-blue hover:bg-gray-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: {acceptedTypes} (max {maxSizeMB}MB)
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes}
                onChange={handleFileInputChange}
                className="hidden"
              />
            </>
          )}

          {selectedFile && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {uploadComplete ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <File className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {(isUploading || uploadComplete) && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {uploadComplete ? 'Upload Complete' : 'Uploading...'}
                    </span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}

              {!isUploading && !uploadComplete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetUpload}
                  className="w-full"
                >
                  Choose Different File
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}