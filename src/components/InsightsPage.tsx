import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Droplets, 
  Thermometer, 
  Cloud, 
  Sprout, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Zap,
  Leaf,
  Sun,
  CloudRain,
  Shield,
  Target,
  BarChart3
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface InsightsPageProps {
  user: User;
}

export function InsightsPage({ user }: InsightsPageProps) {
  const recommendations = [
    {
      id: 1,
      category: 'Water Management',
      priority: 'high',
      icon: Droplets,
      color: 'blue',
      title: 'Optimize Irrigation Schedule',
      description: 'Reduce water usage by 18% while maintaining crop health',
      impact: 'High',
      savings: '$245/month',
      actions: ['Adjust irrigation timer', 'Install moisture sensors', 'Update watering zones'],
      timeline: '2-3 days'
    },
    {
      id: 2,
      category: 'Crop Health',
      priority: 'medium',
      icon: Sprout,
      color: 'green',
      title: 'Nutrient Supplementation',
      description: 'Field B shows phosphorus deficiency affecting yield potential',
      impact: 'Medium',
      savings: 'Up to 12% yield increase',
      actions: ['Apply P2O5 fertilizer', 'Soil pH adjustment', 'Monitor growth response'],
      timeline: '1 week'
    },
    {
      id: 3,
      category: 'Weather Planning',
      priority: 'urgent',
      icon: CloudRain,
      color: 'orange',
      title: 'Storm Preparation',
      description: 'Heavy rainfall predicted - protect vulnerable crops',
      impact: 'Critical',
      savings: 'Prevent $1,200 crop loss',
      actions: ['Deploy protective covers', 'Improve drainage', 'Secure equipment'],
      timeline: '24 hours'
    },
    {
      id: 4,
      category: 'Energy Efficiency',
      priority: 'low',
      icon: Zap,
      color: 'yellow',
      title: 'Solar Integration',
      description: 'Install solar panels for irrigation pumps',
      impact: 'Long-term',
      savings: '$180/month',
      actions: ['Get solar quote', 'Plan installation', 'Grid tie setup'],
      timeline: '2-3 months'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'orange': return 'text-orange-500';
      case 'yellow': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Smart Farm Insights</h1>
        <p className="text-gray-600">AI-powered recommendations for {user.name}'s farm</p>
        {user.farmId && (
          <Badge variant="secondary" className="mt-2">{user.farmId}</Badge>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potential Savings</p>
                <p className="text-xl">$625</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Recommendations</p>
                <p className="text-xl">12</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Score</p>
                <p className="text-xl">87%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sustainability Rating</p>
                <p className="text-xl">A+</p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <Card key={rec.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <Icon className={`h-6 w-6 ${getIconColor(rec.color)}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <CardDescription>{rec.category}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{rec.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Impact</p>
                        <p className="font-medium">{rec.impact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Potential Savings</p>
                        <p className="font-medium text-green-600">{rec.savings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Timeline</p>
                        <p className="font-medium">{rec.timeline}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Action Items:</p>
                      <ul className="space-y-1">
                        {rec.actions.map((action, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Implement Now</Button>
                      <Button variant="outline" size="sm">Learn More</Button>
                      <Button variant="ghost" size="sm">Schedule Later</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Current usage vs optimal levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water Usage</span>
                    <span>82% of optimal</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Energy Consumption</span>
                    <span>95% of optimal</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fertilizer Efficiency</span>
                    <span>78% of optimal</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Land Utilization</span>
                    <span>91% of optimal</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key indicators for farm performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Crop Yield</span>
                  </div>
                  <span className="text-green-600 font-medium">+12.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span>Water Usage</span>
                  </div>
                  <span className="text-red-600 font-medium">-8.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Cost Efficiency</span>
                  </div>
                  <span className="text-green-600 font-medium">+15.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Soil Health</span>
                  </div>
                  <span className="text-green-600 font-medium">+6.7%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <div className="grid gap-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Weather Alert</AlertTitle>
              <AlertDescription>
                Heavy rainfall expected tomorrow evening. Consider protective measures for outdoor crops.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Today</CardTitle>
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">24°C</div>
                  <p className="text-sm text-muted-foreground mb-2">Partly cloudy</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span>65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span>12 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UV Index:</span>
                      <span>7 (High)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Tomorrow</CardTitle>
                    <CloudRain className="h-5 w-5 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">19°C</div>
                  <p className="text-sm text-muted-foreground mb-2">Heavy rain</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Precipitation:</span>
                      <span>25mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span>18 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <span className="text-orange-600">Medium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Day After</CardTitle>
                    <Cloud className="h-5 w-5 text-gray-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">22°C</div>
                  <p className="text-sm text-muted-foreground mb-2">Overcast</p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span>78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span>8 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conditions:</span>
                      <span className="text-green-600">Good</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Carbon Footprint
                </CardTitle>
                <CardDescription>Environmental impact tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">-23%</div>
                  <p className="text-sm text-green-700">Carbon emissions reduced this year</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Water conservation</span>
                    <span className="text-green-600">+18%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Renewable energy use</span>
                    <span className="text-green-600">+45%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Organic practices</span>
                    <span className="text-green-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Sustainability Goals
                </CardTitle>
                <CardDescription>Progress toward environmental targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Organic certification</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water efficiency</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Soil health improvement</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Biodiversity enhancement</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}