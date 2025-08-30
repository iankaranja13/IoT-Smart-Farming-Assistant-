import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ChatbotPanel } from './ChatbotPanel';
import { Bot, MessageCircle, Lightbulb, HelpCircle } from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface ChatbotPageProps {
  user: User;
}

const quickQuestions = [
  "When should I water my crops?",
  "What crops should I plant next?",
  "How can I improve soil health?",
  "What's the weather forecast impact?",
  "How to prevent pest problems?",
  "When to harvest my vegetables?"
];

export function ChatbotPage({ user }: ChatbotPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Sidebar with info and quick actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-green-600" />
                  <span>AI Assistant</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Your intelligent farming companion powered by advanced AI and real-time farm data.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    Available 24/7
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center">
                    Farm-Specific Advice
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center">
                    Data-Driven Insights
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>Quick Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="w-full text-left text-sm p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // This would send the question to the chat
                        console.log('Quick question clicked:', question);
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-blue-500" />
                  <span>Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <p className="font-medium text-gray-900">Be Specific</p>
                    <p>Include details about your crops, location, or specific problems for better advice.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ask Follow-ups</p>
                    <p>Don't hesitate to ask for more details or clarification on any recommendation.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Real-time Data</p>
                    <p>The AI uses your current farm conditions to provide personalized recommendations.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main chat area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <CardTitle>Chat with AI Assistant</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Online
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-5rem)]">
                <ChatbotPanel user={user} isCompact={false} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}