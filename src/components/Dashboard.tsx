import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  Droplets,
  Thermometer,
  Cloud,
  Wheat,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  X
} from 'lucide-react';
import { ChatbotPanel } from './ChatbotPanel';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface DashboardProps {
  user: User;
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  onNavigateToChat: () => void;
}

const moistureData = [
  { time: '6AM', value: 65 },
  { time: '9AM', value: 62 },
  { time: '12PM', value: 58 },
  { time: '3PM', value: 55 },
  { time: '6PM', value: 60 },
  { time: '9PM', value: 63 },
];

const temperatureData = [
  { time: '6AM', temp: 18 },
  { time: '9AM', temp: 22 },
  { time: '12PM', temp: 28 },
  { time: '3PM', temp: 32 },
  { time: '6PM', temp: 29 },
  { time: '9PM', temp: 24 },
];

const cropYieldData = [
  { crop: 'Tomatoes', yield: 85 },
  { crop: 'Peppers', yield: 78 },
  { crop: 'Lettuce', yield: 92 },
  { crop: 'Carrots', yield: 68 },
];

export function Dashboard({ user, isChatbotOpen, setIsChatbotOpen, onNavigateToChat }: DashboardProps) {
  const currentTime = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`transition-all duration-300 ${isChatbotOpen ? 'mr-80' : ''}`}>
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">
              Here's what's happening on your farm • Last updated: {currentTime}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Soil Moisture</CardTitle>
                <Droplets className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">58%</div>
                <div className="flex items-center space-x-2">
                  <Progress value={58} className="flex-1" />
                  <Badge variant="secondary">Good</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">28°C</div>
                <p className="text-xs text-gray-600">Perfect for growth</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Rainfall Prediction</CardTitle>
                <Cloud className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">12mm</div>
                <p className="text-xs text-gray-600">Expected in 2 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Recommended Crop</CardTitle>
                <Wheat className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">Lettuce</div>
                <p className="text-xs text-gray-600">Best for current conditions</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Soil Moisture Trends</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moistureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temperature Pattern</CardTitle>
                <CardDescription>Today's temperature variation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      dot={{ fill: '#EF4444' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Soil pH</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-2">6.8</div>
                <p className="text-sm text-gray-600">Optimal range for most crops</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>Nutrient Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Nitrogen</span>
                    <span className="text-sm">82%</span>
                  </div>
                  <Progress value={82} />
                  <div className="flex justify-between">
                    <span className="text-sm">Phosphorus</span>
                    <span className="text-sm">76%</span>
                  </div>
                  <Progress value={76} />
                </div>
                <Badge className="bg-blue-100 text-blue-800">Good</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Irrigation Needs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-2">Zone 3</div>
                <p className="text-sm text-gray-600">Requires watering in 6 hours</p>
                <Badge className="mt-2 bg-yellow-100 text-yellow-800">Attention</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Crop Yield Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Current Crop Performance</CardTitle>
              <CardDescription>Yield percentage compared to optimal conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cropYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yield" fill="#22C55E" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Chatbot Button */}
      {!isChatbotOpen && (
        <Button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Collapsible Chatbot Panel */}
      {isChatbotOpen && (
        <div className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-white border-l shadow-lg z-40">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg">AI Assistant</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToChat}
              >
                Full Screen
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatbotOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ChatbotPanel user={user} isCompact={true} />
        </div>
      )}
    </div>
  );
}