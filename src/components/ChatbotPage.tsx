import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
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

const fetchBotResponse = async (userInput: string): Promise<string> => {
  try {
    const res = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userInput }),
    });
    const data = await res.json();
    return data.response;
  } catch (error) {
    return "Sorry, I couldn't reach the server.";
  }
};

const [loading, setLoading] = useState(false);
const chatContainerRef = useRef<HTMLDivElement>(null);

const handleSendMessage = async () => {
  if (inputText.trim()) {
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    const botReply = await fetchBotResponse(inputText);

    const botResponse: Message = {
      id: messages.length + 2,
      text: botReply,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setLoading(false);
  }
};

// Scroll to bottom when messages change
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages, loading]);

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

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
                style={{ maxHeight: 540, minHeight: 200 }}
              >
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
                        {message.isUser ? (
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        ) : (
                          <ReactMarkdown
                            components={{
                              p: ({node, ...props}) => <p {...props} className="text-sm whitespace-pre-line" />,
                              strong: ({node, ...props}) => <strong {...props} className="font-semibold" />,
                              ul: ({node, ...props}) => <ul {...props} className="list-disc ml-5" />,
                              ol: ({node, ...props}) => <ol {...props} className="list-decimal ml-5" />,
                              li: ({node, ...props}) => <li {...props} className="mb-1" />,
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        )}
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
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 max-w-md lg:max-w-lg">
                      <div className="p-2 bg-green-100 rounded-full mt-1">
                        <Bot className="h-4 w-4 text-green-600 animate-bounce" />
                      </div>
                      <div className="px-4 py-3 rounded-lg bg-gray-100 text-gray-800">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">Thinking...</span>
                          <svg className="animate-spin h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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