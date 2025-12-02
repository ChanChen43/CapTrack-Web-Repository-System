import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Save, AlertCircle } from 'lucide-react';

interface SaveSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  settingsType?: string;
}

export function SaveSettingsModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Save Settings",
  message,
  settingsType = "settings"
}: SaveSettingsModalProps) {
  const defaultMessage = `Are you sure you want to apply these ${settingsType} changes? The changes will be saved to your account.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-uc-blue" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Please confirm that you want to save these changes to your account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600">
            {message || defaultMessage}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-uc-blue hover:bg-uc-blue-dark">
            <Save className="h-4 w-4 mr-2" />
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}