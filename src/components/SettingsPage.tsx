import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Database, 
  LogOut,
  Save,
  Smartphone,
  Mail,
  Clock
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface SettingsPageProps {
  user: User;
  onLogout: () => void;
}

export function SettingsPage({ user, onLogout }: SettingsPageProps) {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    farmId: user.farmId || '',
    phone: '',
    timezone: 'UTC+0',
    language: 'en'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weather: true,
    irrigation: true,
    harvest: true,
    pests: false
  });

  const [preferences, setPreferences] = useState({
    units: 'metric',
    theme: 'light',
    autoSync: true,
    dataRetention: '1year'
  });

  const handleSaveProfile = () => {
    // Save profile logic would go here
    alert('Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    // Save notification preferences logic would go here
    alert('Notification preferences updated!');
  };

  const handleSavePreferences = () => {
    // Save general preferences logic would go here
    alert('Preferences updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account, preferences, and notification settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 text-gray-900">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                  <a href="#notifications" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </a>
                  <a href="#preferences" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>Preferences</span>
                  </a>
                  <a href="#privacy" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Privacy</span>
                  </a>
                  <a href="#data" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                    <Database className="h-4 w-4" />
                    <span>Data</span>
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card id="profile">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and farm details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmId">Farm ID</Label>
                    <Input
                      id="farmId"
                      value={profile.farmId}
                      onChange={(e) => setProfile({ ...profile, farmId: e.target.value })}
                      placeholder="e.g., FARM001"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
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
                <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card id="notifications">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose how you want to receive updates and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Delivery Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive updates via email</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-600">Instant alerts on your device</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-4">Alert Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weather Alerts</p>
                          <p className="text-sm text-gray-600">Severe weather warnings and forecasts</p>
                        </div>
                        <Switch
                          checked={notifications.weather}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, weather: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Irrigation Reminders</p>
                          <p className="text-sm text-gray-600">Watering schedule notifications</p>
                        </div>
                        <Switch
                          checked={notifications.irrigation}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, irrigation: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Harvest Notifications</p>
                          <p className="text-sm text-gray-600">Optimal harvest time alerts</p>
                        </div>
                        <Switch
                          checked={notifications.harvest}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, harvest: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Pest Warnings</p>
                          <p className="text-sm text-gray-600">Disease and pest prevention alerts</p>
                        </div>
                        <Switch
                          checked={notifications.pests}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pests: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSaveNotifications} className="mt-6 bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notifications
                </Button>
              </CardContent>
            </Card>

            {/* General Preferences */}
            <Card id="preferences">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Preferences</span>
                </CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="units">Measurement Units</Label>
                    <Select value={preferences.units} onValueChange={(value) => setPreferences({ ...preferences, units: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (°C, cm, kg)</SelectItem>
                        <SelectItem value="imperial">Imperial (°F, in, lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value) => setPreferences({ ...preferences, theme: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-sync Data</p>
                    <p className="text-sm text-gray-600">Automatically sync with IoT devices</p>
                  </div>
                  <Switch
                    checked={preferences.autoSync}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, autoSync: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="dataRetention">Data Retention Period</Label>
                  <Select value={preferences.dataRetention} onValueChange={(value) => setPreferences({ ...preferences, dataRetention: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSavePreferences} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Account Actions</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-sm text-gray-600">Your account is active and secure</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-sm text-gray-600">Today at 9:15 AM</p>
                  </div>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>

                <Separator />

                <div className="flex space-x-3">
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    Download Data
                  </Button>
                  <Button variant="destructive" onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}