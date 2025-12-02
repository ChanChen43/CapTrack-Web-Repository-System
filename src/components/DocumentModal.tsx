import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { FileText, Download, X } from 'lucide-react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileName: string;
  fileType?: string;
  onDownload?: () => void;
}

export function DocumentModal({ 
  isOpen, 
  onClose, 
  title, 
  fileName, 
  fileType = 'document',
  onDownload 
}: DocumentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-uc-blue" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Preview and manage document files. Use the download button to save files to your device.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0 py-4">
          <div className="bg-uc-gray-50 rounded-lg p-6 border-2 border-dashed border-uc-gray-300">
            <div className="text-center">
              <FileText className="h-16 w-16 text-uc-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-uc-gray-700 mb-2">
                {fileName}
              </h3>
              <p className="text-uc-gray-500 mb-4">
                This is a preview of the {fileType}. In a real application, the actual file content would be displayed here.
              </p>
              
              {/* Mock document content */}
              <div className="bg-white rounded-lg p-6 text-left shadow-sm border">
                <div className="space-y-4">
                  <div className="border-b border-uc-gray-200 pb-2">
                    <h4 className="font-medium text-uc-gray-900">Document Information</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-uc-gray-700">File Name:</span>
                      <p className="text-uc-gray-600">{fileName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-uc-gray-700">File Type:</span>
                      <p className="text-uc-gray-600">{fileType}</p>
                    </div>
                    <div>
                      <span className="font-medium text-uc-gray-700">Size:</span>
                      <p className="text-uc-gray-600">2.4 MB</p>
                    </div>
                    <div>
                      <span className="font-medium text-uc-gray-700">Created:</span>
                      <p className="text-uc-gray-600">Dec 10, 2024</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="font-medium text-uc-gray-900 mb-2">Content Preview</h5>
                    <div className="bg-uc-gray-50 p-4 rounded text-sm text-uc-gray-700 space-y-3">
                      <p>This is a static preview of the document content. In a real implementation, this would show the actual file content, whether it's a PDF, Word document, image, or other file type.</p>
                      <p>The document viewer would support features like zoom, search, and navigation for different file formats.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                      <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                      <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
                      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
                      <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                      <p>This extended content demonstrates the scrollable nature of the document viewer modal. Users should be able to scroll through all the content without any cut-off issues.</p>
                      <p>The modal maintains proper scrolling functionality while keeping the header and footer visible at all times for better user experience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4 border-t flex-shrink-0 bg-background">
          {onDownload && (
            <Button onClick={onDownload} className="bg-uc-blue hover:bg-uc-blue-dark">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}