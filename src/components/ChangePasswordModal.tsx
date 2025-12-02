import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Lock, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple math captcha for demo purposes
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let answer;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case '*':
      answer = num1 * num2;
      break;
    default:
      answer = num1 + num2;
  }
  
  return {
    question: `${num1} ${operator} ${num2}`,
    answer
  };
};

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!captchaInput) {
      newErrors.captcha = 'Please solve the captcha';
    } else if (parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = 'Incorrect captcha answer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    // Simulate password change
    toast.success('Password changed successfully!');
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setCaptchaInput('');
    setCaptcha(generateCaptcha());
    setErrors({});
    setShowConfirmation(false);
    onClose();
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setErrors(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-uc-blue" />
              Change Password
            </DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new secure password for your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, currentPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, currentPassword: '' }));
                  }}
                  className={errors.currentPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, newPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, newPassword: '' }));
                  }}
                  className={errors.newPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Captcha */}
            <div className="space-y-2">
              <Label>Security Verification</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-gray-100 rounded border text-center font-mono">
                  {captcha.question} = ?
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={refreshCaptcha}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Input
                type="number"
                placeholder="Enter the answer"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  setErrors(prev => ({ ...prev, captcha: '' }));
                }}
                className={errors.captcha ? 'border-red-500' : ''}
              />
              {errors.captcha && (
                <p className="text-sm text-red-600">{errors.captcha}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-uc-blue hover:bg-uc-blue-dark">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        title="Confirm Password Change"
        message="Are you sure you want to change your password? You will need to use the new password for future logins."
        confirmText="Change Password"
        cancelText="Cancel"
      />
    </>
  );
}