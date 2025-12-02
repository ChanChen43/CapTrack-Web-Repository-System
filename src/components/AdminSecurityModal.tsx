import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
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

export function AdminSecurityModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Admin Verification Required",
  message = "Please enter your admin password and complete the security verification to proceed with this action."
}: AdminSecurityModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!password) {
      newErrors.password = 'Admin password is required';
    }
    
    if (!captchaInput) {
      newErrors.captcha = 'Please solve the captcha';
    } else if (parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = 'Incorrect captcha answer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      toast.success('Admin verification successful');
      onConfirm();
      handleClose();
    }
  };

  const handleClose = () => {
    setPassword('');
    setCaptchaInput('');
    setCaptcha(generateCaptcha());
    setErrors({});
    onClose();
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setErrors(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-uc-blue" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Administrator privileges required. Please verify your identity to continue with this action.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              {message}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Admin Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                className={errors.password ? 'border-red-500' : ''}
                placeholder="Enter your admin password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
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
          <Button onClick={handleConfirm} className="bg-uc-blue hover:bg-uc-blue-dark">
            <Shield className="h-4 w-4 mr-2" />
            Verify & Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}