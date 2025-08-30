import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, Thermometer, Cloud, Sprout, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';

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

export function Dashboard({ user, isChatbotOpen, setIsChatbotOpen, onNavigateToChat }: DashboardProps) {
  // Mock data for charts
  const moistureData = [
    { time: '6AM', value: 65 },
    { time: '9AM', value: 62 },
    { time: '12PM', value: 68 },
    { time: '3PM', value: 64 },
    { time: '6PM', value: 70 },
    { time: '9PM', value: 68 },
  ];

  const temperatureData = [
    { time: '6AM', value: 18 },
    { time: '9AM', value: 22 },
    { time: '12PM', value: 26 },
    { time: '3PM', value: 24 },
    { time: '6PM', value: 21 },
    { time: '9PM', value: 19 },
  ];

  const chartConfig = {
    value: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's your farm overview for today</p>
        {user.farmId && (
          <p className="text-sm text-muted-foreground">Farm ID: {user.farmId}</p>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24°C</div>
            <p className="text-xs text-muted-foreground">
              Optimal for crops
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weather</CardTitle>
            <Cloud className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cloudy</div>
            <p className="text-xs text-muted-foreground">
              Rain expected in 2 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
            <Sprout className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Excellent</div>
            <p className="text-xs text-muted-foreground">
              All systems healthy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Soil Moisture Trends</CardTitle>
            <CardDescription>24-hour moisture levels across your fields</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moistureData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temperature Profile</CardTitle>
            <CardDescription>Daily temperature variations</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={temperatureData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alerts & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Water Management</p>
              <p className="text-xs text-yellow-600">Consider irrigating Field C - moisture at 45%</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Weather Alert</p>
              <p className="text-xs text-blue-600">Light rain expected in 2 hours - 3mm precipitation</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">Optimization</p>
              <p className="text-xs text-green-600">Soil pH levels are optimal for current crops</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current farm system health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Irrigation System</span>
                <span className="text-green-600">Online</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Soil Sensors</span>
                <span className="text-green-600">Active</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weather Station</span>
                <span className="text-green-600">Connected</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Crop Monitoring</span>
                <span className="text-green-600">Healthy</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Droplets className="h-4 w-4 mr-2 text-blue-500" />
              Start Irrigation Cycle
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Thermometer className="h-4 w-4 mr-2 text-red-500" />
              Check All Sensors
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Cloud className="h-4 w-4 mr-2 text-gray-500" />
              Weather Forecast
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            >
              <MessageCircle className="h-4 w-4 mr-2 text-purple-500" />
              Ask AI Assistant
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}