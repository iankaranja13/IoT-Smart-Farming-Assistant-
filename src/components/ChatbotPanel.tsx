import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Bot, User } from 'lucide-react';

interface User {
  name: string;
  email: string;
  farmId?: string;
}

interface ChatbotPanelProps {
  user: User;
  isCompact?: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatbotPanel({ user, isCompact = false }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello ${user.name}! I'm your AI farming assistant. I can help you with crop recommendations, irrigation schedules, pest management, and more. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('water') || message.includes('irrigation')) {
      return "Based on your current soil moisture levels at 58%, I recommend watering Zone 3 in about 6 hours. The optimal soil moisture for your crops should be between 60-70%. Consider installing drip irrigation for more efficient water usage.";
    }
    
    if (message.includes('crop') || message.includes('plant')) {
      return "Given your current soil conditions (pH 6.8) and the upcoming weather forecast, I recommend planting lettuce or spinach. These leafy greens thrive in your current temperature range of 28°C and will be ready to harvest before the next major weather change.";
    }
    
    if (message.includes('pest') || message.includes('disease')) {
      return "For preventive pest management, I suggest regular scouting and maintaining proper plant spacing for air circulation. Your current temperature and humidity levels are moderate, which reduces disease pressure. Consider companion planting with marigolds to naturally deter pests.";
    }
    
    if (message.includes('fertilizer') || message.includes('nutrient')) {
      return "Your nutrient levels show Nitrogen at 82% and Phosphorus at 76%, which are good levels. However, consider adding organic compost to maintain soil health. For the upcoming growing season, a balanced 10-10-10 fertilizer applied every 3-4 weeks should be sufficient.";
    }
    
    if (message.includes('weather') || message.includes('rain')) {
      return "The weather forecast shows 12mm of rainfall expected in 2 days. This is beneficial for your crops and will help maintain soil moisture. After the rain, check for any standing water and ensure proper drainage to prevent root rot.";
    }
    
    if (message.includes('temperature')) {
      return "The current temperature of 28°C is optimal for most warm-season crops. However, during peak summer, consider using shade cloth or row covers to protect sensitive plants. Monitor for heat stress symptoms like wilting during the hottest parts of the day.";
    }
    
    return "That's an interesting question! Based on your farm's current conditions and data, I'd be happy to provide more specific guidance. Could you tell me more details about what you're trying to achieve? I can help with irrigation scheduling, crop selection, pest management, soil health, and weather planning.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col ${isCompact ? 'h-[calc(100vh-8rem)]' : 'h-full'}`}>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%]`}>
                {message.type === 'bot' && (
                  <Avatar className="h-8 w-8 bg-green-100">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-green-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === 'user' && (
                  <Avatar className="h-8 w-8 bg-blue-100">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-blue-600" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8 bg-green-100">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-green-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about irrigation, crops, weather..."
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}