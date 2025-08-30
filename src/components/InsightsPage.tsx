import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Droplets, 
  Wheat, 
  Beaker, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Leaf,
  Sun,
  Wind,
  Thermometer,
  Eye
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface InsightsPageProps {
  user: User;
}

const insights = [
  {
    id: 1,
    category: 'Water Management',
    icon: Droplets,
    title: 'Optimize Irrigation Schedule',
    description: 'Based on soil moisture data and weather forecast',
    priority: 'high',
    color: 'blue',
    recommendation: 'Reduce watering frequency by 20% for the next 3 days due to expected rainfall.',
    actionItems: [
      'Adjust irrigation timer for zones 2 and 3',
      'Monitor soil moisture levels daily',
      'Check drainage after rainfall'
    ],
    impact: 'Save 150L of water per day'
  },
  {
    id: 2,
    category: 'Crop Choice',
    icon: Wheat,
    title: 'Plant Heat-Resistant Varieties',
    description: 'Temperature trends suggest warmer than average season',
    priority: 'medium',
    color: 'yellow',
    recommendation: 'Consider planting drought-resistant tomato varieties for the summer season.',
    actionItems: [
      'Source drought-resistant seeds',
      'Prepare soil with extra organic matter',
      'Plan shade structures for peak summer'
    ],
    impact: '30% better yield in hot weather'
  },
  {
    id: 3,
    category: 'Fertilizer Optimization',
    icon: Beaker,
    title: 'Adjust Nitrogen Levels',
    description: 'Soil tests show optimal timing for nutrient application',
    priority: 'medium',
    color: 'green',
    recommendation: 'Apply organic nitrogen fertilizer in 2 weeks for optimal uptake.',
    actionItems: [
      'Purchase organic nitrogen fertilizer',
      'Schedule application for early morning',
      'Test soil pH before application'
    ],
    impact: '15% increase in crop nutrition'
  },
  {
    id: 4,
    category: 'Weather Alert',
    icon: CloudRain,
    title: 'Prepare for Heavy Rain',
    description: 'Storm system approaching in 48 hours',
    priority: 'high',
    color: 'red',
    recommendation: 'Secure loose equipment and ensure proper drainage channels are clear.',
    actionItems: [
      'Clear drainage ditches',
      'Secure greenhouse panels',
      'Harvest ready crops early'
    ],
    impact: 'Prevent crop damage and flooding'
  },
  {
    id: 5,
    category: 'Growth Monitoring',
    icon: TrendingUp,
    title: 'Accelerated Growth Detected',
    description: 'Lettuce crops showing 25% faster growth than expected',
    priority: 'low',
    color: 'green',
    recommendation: 'Monitor closely for early harvest opportunity and plan next planting cycle.',
    actionItems: [
      'Check crop maturity daily',
      'Prepare harvesting equipment',
      'Schedule next planting phase'
    ],
    impact: 'Earlier harvest, increased profits'
  },
  {
    id: 6,
    category: 'Pest Prevention',
    icon: AlertTriangle,
    title: 'Aphid Risk Increasing',
    description: 'Weather conditions favor aphid reproduction',
    priority: 'medium',
    color: 'orange',
    recommendation: 'Deploy beneficial insects and increase plant monitoring frequency.',
    actionItems: [
      'Release ladybugs in affected areas',
      'Apply neem oil preventively',
      'Increase daily crop inspections'
    ],
    impact: 'Prevent pest infestation'
  }
];

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const categoryIcons = {
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  green: 'text-green-600',
  red: 'text-red-600',
  orange: 'text-orange-600'
};

export function InsightsPage({ user }: InsightsPageProps) {
  const highPriorityCount = insights.filter(i => i.priority === 'high').length;
  const totalRecommendations = insights.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Smart Farming Insights</h1>
          <p className="text-gray-600">
            AI-powered recommendations based on your farm's current conditions and data trends
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Insights</p>
                  <p className="text-2xl">{totalRecommendations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl">{highPriorityCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Completed Today</p>
                  <p className="text-2xl">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg. Impact</p>
                  <p className="text-2xl">+22%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${insight.color}-100`}>
                        <Icon className={`h-5 w-5 ${categoryIcons[insight.color as keyof typeof categoryIcons]}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <p className="text-sm text-gray-600">{insight.category}</p>
                      </div>
                    </div>
                    <Badge className={priorityColors[insight.priority as keyof typeof priorityColors]}>
                      {insight.priority}
                    </Badge>
                  </div>
                  <CardDescription>{insight.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Recommendation</h4>
                      <p className="text-sm text-gray-600">{insight.recommendation}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Action Items</h4>
                      <ul className="space-y-1">
                        {insight.actionItems.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Expected Impact</p>
                        <p className="text-sm font-medium text-green-600">{insight.impact}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Environmental Conditions Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Current Environmental Conditions</CardTitle>
            <CardDescription>Real-time data affecting your farm's recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <Thermometer className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-xl">28°C</p>
                  <p className="text-xs text-green-600">Optimal</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Droplets className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Soil Moisture</p>
                  <p className="text-xl">58%</p>
                  <p className="text-xs text-yellow-600">Monitor</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Wind className="h-8 w-8 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-xl">12 km/h</p>
                  <p className="text-xs text-green-600">Good</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Sun className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">UV Index</p>
                  <p className="text-xl">7</p>
                  <p className="text-xs text-orange-600">High</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}