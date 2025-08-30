import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-gray-600">Manage your profile and farm preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div>
              <Label htmlFor="farmId">Farm ID</Label>
              <Input id="farmId" defaultValue={user.farmId || ''} />
            </div>
            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Farm Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Farm Configuration</CardTitle>
            <CardDescription>Customize your farm settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Farm Location</Label>
              <Input id="location" placeholder="Enter your farm location" />
            </div>
            <div>
              <Label htmlFor="size">Farm Size (hectares)</Label>
              <Input id="size" type="number" placeholder="Enter farm size" />
            </div>
            <div>
              <Label htmlFor="crops">Primary Crops</Label>
              <Input id="crops" placeholder="e.g., Wheat, Corn, Soybeans" />
            </div>
            <Button className="w-full" variant="outline">Update Farm Settings</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose what alerts you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Weather Alerts</Label>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label>Irrigation Reminders</Label>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label>Crop Health Updates</Label>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label>Weekly Reports</Label>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Export Farm Data
            </Button>
            <Button variant="outline" className="w-full">
              Download Reports
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}