import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Leaf, Droplets, Sun, Users } from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface WelcomePageProps {
  onLogin: (user: User) => void;
}

export function WelcomePage({ onLogin }: WelcomePageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onLogin({
        name: formData.name,
        email: formData.email,
        farmId: formData.farmId || undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full mr-4">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl text-green-800">
              Smart Farming Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Harness the power of IoT and AI to optimize your farm's productivity, 
            reduce costs, and make data-driven decisions for sustainable agriculture.
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white/80 rounded-lg shadow-sm">
            <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="mb-2">Smart Irrigation</h3>
            <p className="text-gray-600">Monitor soil moisture and automate watering schedules</p>
          </div>
          <div className="text-center p-6 bg-white/80 rounded-lg shadow-sm">
            <Sun className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="mb-2">Weather Insights</h3>
            <p className="text-gray-600">Get accurate forecasts and climate recommendations</p>
          </div>
          <div className="text-center p-6 bg-white/80 rounded-lg shadow-sm">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="mb-2">AI Assistant</h3>
            <p className="text-gray-600">Chat with our farming expert for personalized advice</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Enter your details to access your farm dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="farmId">Farm ID (Optional)</Label>
                  <Input
                    id="farmId"
                    type="text"
                    placeholder="e.g., FARM001"
                    value={formData.farmId}
                    onChange={(e) => setFormData({ ...formData, farmId: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Access Dashboard
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}