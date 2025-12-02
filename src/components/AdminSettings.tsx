import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { AdminSecurityModal } from './AdminSecurityModal';
import { mockSystemSettings } from '../lib/comprehensive-system-settings';
import { toast } from 'sonner@2.0.3';
import { 
  Save,
  RotateCcw,
  Database,
  Mail,
  Upload,
  Shield,
  Clock,
  AlertTriangle
} from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState(mockSystemSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [changedCategories, setChangedCategories] = useState<Set<string>>(new Set());
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [pendingChange, setPendingChange] = useState<{id: string, value: string, category?: string} | null>(null);
  const [tempSettings, setTempSettings] = useState(mockSystemSettings);

  const updateSetting = (id: string, value: string) => {
    // Update temporary settings without showing modal
    setTempSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
    
    // Track which category has changes
    const setting = settings.find(s => s.id === id);
    if (setting) {
      setChangedCategories(prev => new Set(prev).add(setting.category));
      setHasChanges(true);
    }
  };

  const handleSaveCategoryChanges = (category: string) => {
    // Show security modal for category save
    setPendingChange({ id: 'save_category', value: 'true', category });
    setShowSecurityModal(true);
  };

  const handleSecurityConfirm = () => {
    if (pendingChange) {
      if (pendingChange.category) {
        // Save all changes for this category
        setSettings(prev => prev.map(setting => {
          if (setting.category === pendingChange.category) {
            const tempSetting = tempSettings.find(s => s.id === setting.id);
            return tempSetting || setting;
          }
          return setting;
        }));
        
        // Remove category from changed categories
        setChangedCategories(prev => {
          const newSet = new Set(prev);
          newSet.delete(pendingChange.category!);
          return newSet;
        });
        
        if (changedCategories.size <= 1) {
          setHasChanges(false);
        }
        
        toast.success(`${pendingChange.category.charAt(0).toUpperCase() + pendingChange.category.slice(1)} settings updated successfully!`);
      } else if (pendingChange.id === 'save_all') {
        // Save all changes
        setSettings(tempSettings);
        setChangedCategories(new Set());
        setHasChanges(false);
        toast.success('All settings saved successfully!');
      }
    }
    setPendingChange(null);
    setShowSecurityModal(false);
  };

  const handleSaveChanges = () => {
    setShowSecurityModal(true);
    setPendingChange({ id: 'save_all', value: 'true' });
  };

  const handleCancelCategoryChanges = (category: string) => {
    // Revert temp settings to original for this category
    setTempSettings(prev => prev.map(setting => {
      if (setting.category === category) {
        const originalSetting = settings.find(s => s.id === setting.id);
        return originalSetting || setting;
      }
      return setting;
    }));
    
    // Remove category from changed categories
    setChangedCategories(prev => {
      const newSet = new Set(prev);
      newSet.delete(category);
      return newSet;
    });
    
    if (changedCategories.size <= 1) {
      setHasChanges(false);
    }
    
    toast.info(`${category.charAt(0).toUpperCase() + category.slice(1)} changes discarded.`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'uploads':
        return <Upload className="w-4 h-4 text-uc-blue" />;
      case 'submissions':
        return <Clock className="w-4 h-4 text-uc-gold" />;
      case 'system':
        return <Database className="w-4 h-4 text-uc-blue" />;
      case 'notifications':
        return <Mail className="w-4 h-4 text-uc-gold" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, typeof settings>);

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-uc-blue">System Settings</h2>
            <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="secondary" className="bg-uc-gold/10 text-uc-gold border-uc-gold/20">
                Unsaved Changes
              </Badge>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setSettings(mockSystemSettings);
                setHasChanges(false);
              }}
              disabled={!hasChanges}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              className="bg-gradient-uc-primary"
              disabled={!hasChanges}
              onClick={handleSaveChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
            <Card key={category} className="shadow-uc-blue/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-uc-blue capitalize">
                  {getCategoryIcon(category)}
                  {category} Settings
                </CardTitle>
                <CardDescription>
                  Configure {category}-related system behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySettings.map((setting, index) => {
                    const tempSetting = tempSettings.find(s => s.id === setting.id);
                    const currentValue = tempSetting?.value || setting.value;
                    
                    return (
                      <div key={setting.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium">{setting.description}</div>
                            <div className="text-sm text-muted-foreground">
                              Setting key: <code className="text-xs bg-secondary px-1 rounded">{setting.key}</code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {setting.key.includes('enabled') || setting.key.includes('notification') ? (
                              <Switch 
                                checked={currentValue === 'true'}
                                onCheckedChange={(checked) => 
                                  updateSetting(setting.id, checked ? 'true' : 'false')
                                }
                              />
                            ) : (
                              <Input
                                value={currentValue}
                                onChange={(e) => updateSetting(setting.id, e.target.value)}
                                className="w-24 text-center"
                                type={setting.key.includes('size') || setting.key.includes('days') ? 'number' : 'text'}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Category Save/Cancel Buttons */}
                  {changedCategories.has(category) && (
                    <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-uc-gold/30 bg-gradient-to-r from-uc-gold/5 to-uc-blue/5 rounded-lg p-3 shadow-sm">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelCategoryChanges(category)}
                        className="border-gray-300 hover:bg-gray-100 shadow-sm"
                      >
                        Cancel Changes
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-uc-blue hover:bg-uc-blue-dark text-white shadow-md hover:shadow-lg transition-all"
                        onClick={() => handleSaveCategoryChanges(category)}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save {category.charAt(0).toUpperCase() + category.slice(1)} Settings
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Information */}
        <Card className="border-uc-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-uc-gold">
              <Database className="w-4 h-4" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">System Version:</span>
                <span className="ml-2 font-medium">CapTrack v2.1.0</span>
              </div>
              <div>
                <span className="text-muted-foreground">Database Version:</span>
                <span className="ml-2 font-medium">PostgreSQL 15.4</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Backup:</span>
                <span className="ml-2 font-medium">2024-12-11 02:00 AM</span>
              </div>
              <div>
                <span className="text-muted-foreground">System Uptime:</span>
                <span className="ml-2 font-medium">15 days, 8 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="w-4 h-4" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700">
              Changes to system settings will affect all users. Please review carefully before saving.
              Critical settings like file size limits and security configurations should be tested in a development environment first.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Security Modal */}
      <AdminSecurityModal
        isOpen={showSecurityModal}
        onClose={() => {
          setShowSecurityModal(false);
          setPendingChange(null);
        }}
        onConfirm={handleSecurityConfirm}
        title="Admin Verification Required"
        message={
          pendingChange?.id === 'save_all' 
            ? "Please verify your admin credentials to save all system settings changes."
            : pendingChange?.category
            ? `Please verify your admin credentials to save ${pendingChange.category} settings.`
            : "Please verify your admin credentials to modify this system setting."
        }
      />
    </div>
  );
}
