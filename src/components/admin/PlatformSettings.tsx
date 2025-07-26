import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Globe, 
  Shield, 
  Mail, 
  CreditCard, 
  Bell,
  Save,
  RefreshCw,
  Database,
  Users,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PlatformSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'EduBloom Studio',
    platformDescription: 'Where Knowledge Breeds Knowledge',
    contactEmail: 'support@edubloomstudio.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'UTC-5',
    language: 'en',
    
    // Security Settings
    requireEmailVerification: true,
    requirePhoneVerification: false,
    enableTwoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    
    // Payment Settings
    currency: 'USD',
    enableStripe: true,
    enablePayPal: true,
    platformFee: 10,
    minimumWithdrawal: 50,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    courseUpdates: true,
    
    // Course Settings
    maxCourseDuration: 100,
    maxFileSize: 50,
    enableReviews: true,
    requireApproval: true,
    autoPublish: false,
    
    // User Settings
    allowUserRegistration: true,
    requireAdminApproval: false,
    maxUsersPerCourse: 100,
    enableUserProfiles: true,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    enableLogging: true,
    backupFrequency: 'daily'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Settings Saved',
        description: 'Platform settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    toast({
      title: 'Settings Reset',
      description: 'Settings have been reset to default values.',
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Platform Settings</h2>
          <p className="text-muted-foreground">Configure platform-wide settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => updateSetting('platformName', e.target.value)}
                placeholder="Enter platform name"
              />
            </div>
            <div>
              <Label htmlFor="platformDescription">Platform Description</Label>
              <Textarea
                id="platformDescription"
                value={settings.platformDescription}
                onChange={(e) => updateSetting('platformDescription', e.target.value)}
                placeholder="Enter platform description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSetting('contactEmail', e.target.value)}
                  placeholder="support@example.com"
                />
              </div>
              <div>
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => updateSetting('supportPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                    <SelectItem value="UTC+0">UTC</SelectItem>
                    <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailVerification">Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">Users must verify their email address</p>
              </div>
              <Switch
                id="emailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => updateSetting('requireEmailVerification', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="phoneVerification">Require Phone Verification</Label>
                <p className="text-sm text-muted-foreground">Users must verify their phone number</p>
              </div>
              <Switch
                id="phoneVerification"
                checked={settings.requirePhoneVerification}
                onCheckedChange={(checked) => updateSetting('requirePhoneVerification', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Allow users to enable 2FA</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.enableTwoFactorAuth}
                onCheckedChange={(checked) => updateSetting('enableTwoFactorAuth', checked)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => updateSetting('sessionTimeout', Number(e.target.value))}
                  min="5"
                  max="1440"
                />
              </div>
              <div>
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => updateSetting('maxLoginAttempts', Number(e.target.value))}
                  min="3"
                  max="10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => updateSetting('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableStripe">Enable Stripe Payments</Label>
                <p className="text-sm text-muted-foreground">Accept credit card payments</p>
              </div>
              <Switch
                id="enableStripe"
                checked={settings.enableStripe}
                onCheckedChange={(checked) => updateSetting('enableStripe', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enablePayPal">Enable PayPal</Label>
                <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
              </div>
              <Switch
                id="enablePayPal"
                checked={settings.enablePayPal}
                onCheckedChange={(checked) => updateSetting('enablePayPal', checked)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platformFee">Platform Fee (%)</Label>
                <Input
                  id="platformFee"
                  type="number"
                  value={settings.platformFee}
                  onChange={(e) => updateSetting('platformFee', Number(e.target.value))}
                  min="0"
                  max="50"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="minimumWithdrawal">Minimum Withdrawal ($)</Label>
                <Input
                  id="minimumWithdrawal"
                  type="number"
                  value={settings.minimumWithdrawal}
                  onChange={(e) => updateSetting('minimumWithdrawal', Number(e.target.value))}
                  min="10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send email notifications to users</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Send push notifications</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Send promotional emails</p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="courseUpdates">Course Updates</Label>
                <p className="text-sm text-muted-foreground">Notify users of course updates</p>
              </div>
              <Switch
                id="courseUpdates"
                checked={settings.courseUpdates}
                onCheckedChange={(checked) => updateSetting('courseUpdates', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Course Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxCourseDuration">Max Course Duration (hours)</Label>
                <Input
                  id="maxCourseDuration"
                  type="number"
                  value={settings.maxCourseDuration}
                  onChange={(e) => updateSetting('maxCourseDuration', Number(e.target.value))}
                  min="1"
                  max="1000"
                />
              </div>
              <div>
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => updateSetting('maxFileSize', Number(e.target.value))}
                  min="1"
                  max="500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableReviews">Enable Course Reviews</Label>
                <p className="text-sm text-muted-foreground">Allow students to review courses</p>
              </div>
              <Switch
                id="enableReviews"
                checked={settings.enableReviews}
                onCheckedChange={(checked) => updateSetting('enableReviews', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireApproval">Require Course Approval</Label>
                <p className="text-sm text-muted-foreground">Admin must approve new courses</p>
              </div>
              <Switch
                id="requireApproval"
                checked={settings.requireApproval}
                onCheckedChange={(checked) => updateSetting('requireApproval', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoPublish">Auto-Publish Courses</Label>
                <p className="text-sm text-muted-foreground">Automatically publish approved courses</p>
              </div>
              <Switch
                id="autoPublish"
                checked={settings.autoPublish}
                onCheckedChange={(checked) => updateSetting('autoPublish', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable the platform</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="debugMode">Debug Mode</Label>
                <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
              </div>
              <Switch
                id="debugMode"
                checked={settings.debugMode}
                onCheckedChange={(checked) => updateSetting('debugMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableLogging">Enable Logging</Label>
                <p className="text-sm text-muted-foreground">Log system activities</p>
              </div>
              <Switch
                id="enableLogging"
                checked={settings.enableLogging}
                onCheckedChange={(checked) => updateSetting('enableLogging', checked)}
              />
            </div>
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 