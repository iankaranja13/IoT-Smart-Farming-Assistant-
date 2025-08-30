import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Send, Bot, User, Lightbulb, Droplets, Sprout, Cloud, TrendingUp, MessageSquare } from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface ChatbotPageProps {
  user: User;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatbotPage({ user }: ChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${user.name}! I'm your AI farming assistant. I have access to your farm data and can help you with irrigation, crop management, weather planning, and optimization strategies. What would you like to know?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    "What's the optimal irrigation schedule for this week?",
    "Which crops should I plant next season?",
    "How can I improve soil health in Field B?",
    "When should I apply fertilizer?",
    "What does the weather forecast mean for my crops?",
    "How can I reduce water usage without affecting yield?"
  ];

  const quickActions = [
    { label: "Irrigation Help", icon: Droplets, color: "blue" },
    { label: "Crop Advice", icon: Sprout, color: "green" },
    { label: "Weather Info", icon: Cloud, color: "gray" },
    { label: "Analytics", icon: TrendingUp, color: "purple" }
  ];

  // Smart response system with different responses based on input
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('irrigation') || input.includes('water')) {
      return `Based on your current soil moisture levels (68%) and upcoming weather (light rain tomorrow), I recommend reducing irrigation by 15% this week. Field C needs attention - moisture is at 45%. Would you like me to create an automated irrigation schedule?`;
    }
    
    if (input.includes('crop') || input.includes('plant')) {
      return `For your region and soil conditions, I recommend drought-resistant corn varieties for next season. Your soil pH (6.8) is optimal for most crops. Field A shows excellent conditions for leafy greens. Would you like specific variety recommendations?`;
    }
    
    if (input.includes('weather')) {
      return `Tomorrow's forecast shows 25mm rainfall with strong winds. I recommend:\n• Deploy protective covers for vulnerable crops\n• Check drainage systems\n• Postpone any planned spraying\n• Monitor for potential flooding in low-lying areas`;
    }
    
    if (input.includes('fertilizer') || input.includes('nutrient')) {
      return `Soil analysis shows nitrogen levels are optimal, but phosphorus is low in Field B (18 ppm, should be 25-30 ppm). I recommend applying 50kg/ha of P2O5 fertilizer. Best timing would be early next week before the expected rain.`;
    }
    
    if (input.includes('yield') || input.includes('productivity')) {
      return `Your current yield is tracking 12.5% above last season! Key factors: improved irrigation scheduling (+8% efficiency) and optimal soil management. To maximize further, consider precision fertilizer application in underperforming zones.`;
    }
    
    if (input.includes('cost') || input.includes('save') || input.includes('money')) {
      return `I've identified potential monthly savings of $625:\n• Water efficiency improvements: $245\n• Energy optimization: $180\n• Precision fertilizer application: $150\n• Preventive maintenance: $50\n\nShall I create an implementation plan?`;
    }

    return `Great question! Based on your farm data (${user.farmId || 'current conditions'}), I can provide detailed insights. Your farm is currently performing well with 87% efficiency. For specific recommendations, could you tell me which aspect you'd like to focus on: irrigation, crop health, weather planning, or cost optimization?`;
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
        timestamp: new Date()
      };

      const botResponse: Message = {
        id: messages.length + 2,
        text: generateResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };

      setMessages([...messages, userMessage, botResponse]);
      setInputText('');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">AI Farm Assistant</h1>
        <p className="text-gray-600">Get personalized farming advice powered by your real-time farm data</p>
        {user.farmId && (
          <Badge variant="secondary" className="mt-2">Connected to {user.farmId}</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-green-600" />
                <CardTitle>AI Farm Assistant</CardTitle>
                <Badge variant="outline" className="ml-auto">Online</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start space-x-2 max-w-md lg:max-w-lg">
                      {!message.isUser && (
                        <div className="p-2 bg-green-100 rounded-full mt-1">
                          <Bot className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      <div
                        className={`px-4 py-3 rounded-lg ${
                          message.isUser
                            ? 'bg-green-600 text-white ml-12'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="p-2 bg-green-600 rounded-full mt-1">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about irrigation, crops, weather, or any farming question..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm" disabled={!inputText.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => handleSuggestedQuestion(`Help me with ${action.label.toLowerCase()}`)}
                    >
                      <Icon className={`h-4 w-4 mr-2 text-${action.color}-500`} />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded transition-colors w-full"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Farm Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Farm Efficiency</span>
                  <Badge variant="secondary">87%</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Active Sensors</span>
                  <Badge variant="secondary">24/24</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Weather Alert</span>
                  <Badge variant="outline" className="text-orange-600">Rain Tomorrow</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>AI Confidence</span>
                  <Badge variant="secondary">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}