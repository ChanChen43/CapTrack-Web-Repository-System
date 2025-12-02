import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  icon?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  icon = true
}: ConfirmationDialogProps) {
  // Use message or description, preferring message for backward compatibility
  const dialogDescription = message || description || '';
  const getIcon = () => {
    if (!icon) return null;
    
    switch (variant) {
      case 'destructive':
        return <X className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-uc-blue hover:bg-uc-blue-dark text-white';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            {dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={getConfirmButtonClass()}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Hook for managing confirmation dialogs
export function useConfirmation() {
  const [dialogState, setDialogState] = React.useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: ConfirmationDialogProps['variant'];
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const showConfirmation = (options: {
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: ConfirmationDialogProps['variant'];
  }) => {
    setDialogState({
      isOpen: true,
      ...options,
    });
  };

  const hideConfirmation = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const confirmAndClose = () => {
    dialogState.onConfirm();
    hideConfirmation();
  };

  return {
    showConfirmation,
    hideConfirmation,
    confirmDialog: (
      <ConfirmationDialog
        isOpen={dialogState.isOpen}
        onClose={hideConfirmation}
        onConfirm={confirmAndClose}
        title={dialogState.title}
        description={dialogState.description}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        variant={dialogState.variant}
      />
    ),
  };
}