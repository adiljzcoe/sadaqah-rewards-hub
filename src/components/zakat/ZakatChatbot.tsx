
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'sheikh';
  timestamp: Date;
}

const ZakatChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'As-salamu alaykum! I am your Zakat Sheikh AI assistant. I\'m here to help you with any questions about Zakat calculation, Islamic rulings, and wealth purification. How may I assist you today?',
      sender: 'sheikh',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const commonQuestions = [
    "What is the current Nisab threshold?",
    "Do I pay Zakat on my gold jewelry?",
    "How do I calculate Zakat on business inventory?",
    "What debts can I deduct from my wealth?",
    "When is the best time to pay Zakat?",
    "Can I pay Zakat in installments?",
  ];

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an AI service)
    setTimeout(() => {
      const response = generateSheikhResponse(content);
      const sheikhMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'sheikh',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, sheikhMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateSheikhResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('nisab')) {
      return `The current Nisab threshold is based on 87.48 grams of gold or 612.36 grams of silver. Currently, the gold Nisab is approximately £5,731 (this updates daily with gold prices). If your wealth has been above this threshold for a full lunar year, Zakat becomes obligatory at 2.5%.`;
    }

    if (lowerQuestion.includes('jewelry') || lowerQuestion.includes('gold')) {
      return `Regarding gold jewelry: There are different scholarly opinions. Some scholars say ornaments worn regularly by women are exempt, while others say all gold above Nisab is subject to Zakat. The safer opinion is to include ornamental gold in your calculation. For men, all gold jewelry is subject to Zakat as ornaments are generally not permissible for men.`;
    }

    if (lowerQuestion.includes('business') || lowerQuestion.includes('inventory')) {
      return `For business inventory, you should calculate Zakat on goods intended for sale at their current market value, not cost price. Include raw materials, work-in-progress, and finished goods. Add this to your other wealth. Business equipment and fixed assets are generally not subject to Zakat.`;
    }

    if (lowerQuestion.includes('debt')) {
      return `You can deduct immediate debts that are due within the year from your total wealth before calculating Zakat. This includes credit card debts, loans due, rent payable, etc. However, long-term debts like mortgages have different scholarly opinions - consult your local scholar for guidance on your specific situation.`;
    }

    if (lowerQuestion.includes('when') || lowerQuestion.includes('time')) {
      return `The best time to pay Zakat is when your wealth completes a full lunar year (Hawl) above the Nisab threshold. Many Muslims choose to pay during Ramadan for increased reward. You should calculate based on your wealth on the same date each year. Payment can be made slightly before the due date if needed.`;
    }

    if (lowerQuestion.includes('installment')) {
      return `Yes, you can pay Zakat in installments throughout the year if it's easier for you, as long as the full amount is paid by the due date. Some scholars even prefer this as it provides continuous benefit to recipients. However, make sure to track your payments to ensure the complete amount is fulfilled.`;
    }

    // Default response
    return `Jazakallahu khair for your question. This is an important matter that requires careful consideration. Based on Islamic jurisprudence principles, I recommend consulting with a qualified local scholar for specific guidance tailored to your situation. Meanwhile, I can help with general calculations and common rulings. Could you provide more specific details about your question?`;
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Ask the Zakat Sheikh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Get Islamic guidance on Zakat calculations, rulings, and wealth purification from our AI Sheikh assistant.
          </p>
          
          {/* Quick Questions */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Common Questions</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {commonQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 px-3"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <Card className="border">
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.sender === 'sheikh' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                        {message.sender === 'sheikh' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === 'sheikh'
                            ? 'bg-green-50 text-green-900 border border-green-200'
                            : 'bg-blue-50 text-blue-900 border border-blue-200'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-100 text-green-700">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Zakat calculations, rulings, or Islamic guidance..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => sendMessage(inputMessage)}
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Important:</strong> This AI assistant provides general guidance based on common Islamic rulings. 
            For complex situations or specific fatawa, please consult with qualified Islamic scholars in your area. 
            Different schools of thought may have varying opinions on certain matters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatChatbot;
