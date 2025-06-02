
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot, User, Calculator } from 'lucide-react';

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
      content: 'As-salamu alaykum! I am your Zakat Calculation Assistant. Tell me about your assets and I\'ll help you calculate your Zakat. For example: "I have £500 cash, 100g gold, and £2000 in savings" or "300g gold, how much Zakat?"',
      sender: 'sheikh',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const commonQuestions = [
    "I have £1000 cash, 50g gold - calculate my Zakat",
    "300g gold, 200g silver - how much do I owe?",
    "£5000 savings, £500 cash, 100g gold",
    "What is the current Nisab in pounds?",
    "Current gold price per gram?",
    "I have $2000, how much Zakat?",
  ];

  // Current rates (these would be fetched from an API in a real app)
  const currentRates = {
    goldPricePerGram: 65.50, // GBP
    silverPricePerGram: 0.85, // GBP
    nisabGold: 87.48, // grams
    nisabSilver: 612.36, // grams
    zakatRate: 0.025 // 2.5%
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const response = calculateZakatFromMessage(content);
      const sheikhMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'sheikh',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, sheikhMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const extractNumbers = (text: string, keywords: string[]) => {
    const lowerText = text.toLowerCase();
    for (const keyword of keywords) {
      const regex = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(?:g\\s*)?${keyword}`, 'i');
      const match = lowerText.match(regex);
      if (match) {
        return parseFloat(match[1]);
      }
    }
    return 0;
  };

  const extractCurrency = (text: string): { amount: number; currency: string } => {
    const currencies = [
      { symbols: ['£', 'gbp', 'pounds?'], code: 'GBP', rate: 1 },
      { symbols: ['\\$', 'usd', 'dollars?'], code: 'USD', rate: 0.79 },
      { symbols: ['€', 'eur', 'euros?'], code: 'EUR', rate: 0.85 },
      { symbols: ['ر\\.س', 'sar', 'riyal'], code: 'SAR', rate: 0.21 }
    ];

    for (const currency of currencies) {
      for (const symbol of currency.symbols) {
        const regex = new RegExp(`${symbol}\\s*(\\d+(?:,\\d{3})*(?:\\.\\d+)?)`, 'i');
        const match = text.match(regex);
        if (match) {
          const amount = parseFloat(match[1].replace(/,/g, ''));
          return { amount: amount * currency.rate, currency: currency.code }; // Convert to GBP base
        }
      }
    }

    // Look for just numbers with currency words
    const numberMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?)/);
    if (numberMatch) {
      const amount = parseFloat(numberMatch[1].replace(/,/g, ''));
      // Default to GBP if no currency specified
      return { amount, currency: 'GBP' };
    }

    return { amount: 0, currency: 'GBP' };
  };

  const calculateZakatFromMessage = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Check for rate inquiries
    if (lowerMessage.includes('nisab') || lowerMessage.includes('threshold')) {
      const nisabValue = currentRates.nisabGold * currentRates.goldPricePerGram;
      return `Current Nisab thresholds:\n• Gold: ${currentRates.nisabGold}g (£${nisabValue.toFixed(2)})\n• Silver: ${currentRates.nisabSilver}g (£${(currentRates.nisabSilver * currentRates.silverPricePerGram).toFixed(2)})\n\nIf your wealth exceeds either threshold for a full lunar year, you owe 2.5% Zakat.`;
    }

    if (lowerMessage.includes('gold price') || lowerMessage.includes('current gold')) {
      return `Current gold price: £${currentRates.goldPricePerGram} per gram\nCurrent silver price: £${currentRates.silverPricePerGram} per gram\n\nPrices update daily based on market rates.`;
    }

    // Extract assets from message
    const goldGrams = extractNumbers(message, ['gold', 'g gold']);
    const silverGrams = extractNumbers(message, ['silver', 'g silver']);
    
    // Extract cash amounts
    const cashTerms = ['cash', 'money', 'savings', 'bank', 'deposits'];
    let totalCash = 0;
    let detectedCurrency = 'GBP';

    for (const term of cashTerms) {
      if (lowerMessage.includes(term)) {
        const regex = new RegExp(`(£|\\$|€|ر\\.س)?\\s*(\\d+(?:,\\d{3})*(?:\\.\\d+)?)\\s*(?:${term}|in ${term}|of ${term})`, 'i');
        const match = message.match(regex);
        if (match) {
          const currencyInfo = extractCurrency(match[0]);
          totalCash += currencyInfo.amount;
          detectedCurrency = currencyInfo.currency;
        }
      }
    }

    // If no specific terms found, try to extract any currency amount
    if (totalCash === 0) {
      const currencyInfo = extractCurrency(message);
      totalCash = currencyInfo.amount;
      detectedCurrency = currencyInfo.currency;
    }

    // Calculate asset values
    const goldValue = goldGrams * currentRates.goldPricePerGram;
    const silverValue = silverGrams * currentRates.silverPricePerGram;
    const totalAssets = totalCash + goldValue + silverValue;

    if (totalAssets === 0) {
      return `I couldn't find asset amounts in your message. Please specify your assets like:\n• "£500 cash, 100g gold"\n• "300g gold, 200g silver"\n• "$2000 savings"\n\nTry being more specific with amounts and asset types.`;
    }

    // Check Nisab
    const nisabValue = currentRates.nisabGold * currentRates.goldPricePerGram;
    const isAboveNisab = totalAssets >= nisabValue;

    let response = `📊 **Zakat Calculation Result:**\n\n`;
    
    if (totalCash > 0) response += `💰 Cash/Savings: £${totalCash.toFixed(2)}\n`;
    if (goldValue > 0) response += `🥇 Gold (${goldGrams}g): £${goldValue.toFixed(2)}\n`;
    if (silverValue > 0) response += `🥈 Silver (${silverGrams}g): £${silverValue.toFixed(2)}\n`;
    
    response += `\n**Total Assets: £${totalAssets.toFixed(2)}**\n`;
    response += `Nisab Threshold: £${nisabValue.toFixed(2)}\n\n`;

    if (isAboveNisab) {
      const zakatDue = totalAssets * currentRates.zakatRate;
      response += `✅ **Above Nisab - Zakat Due: £${zakatDue.toFixed(2)}**\n\n`;
      response += `This assumes your wealth has been above Nisab for a full lunar year. Remember to deduct any immediate debts before calculating.`;
    } else {
      const shortfall = nisabValue - totalAssets;
      response += `❌ **Below Nisab - No Zakat Due**\n\n`;
      response += `You need £${shortfall.toFixed(2)} more to reach the Nisab threshold.`;
    }

    return response;
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            Zakat Calculation Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Tell me about your assets and I'll calculate your Zakat instantly. Just describe what you have!
          </p>
          
          {/* Quick Questions */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Try These Examples</h4>
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
                        {message.sender === 'sheikh' ? <Calculator className="h-4 w-4" /> : <User className="h-4 w-4" />}
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
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
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
                        <Calculator className="h-4 w-4" />
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
                  placeholder="e.g., I have £400 cash, 300g gold - how much Zakat do I owe?"
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

      {/* Current Rates */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">Current Rates</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Gold:</strong> £{currentRates.goldPricePerGram}/gram</p>
              <p><strong>Silver:</strong> £{currentRates.silverPricePerGram}/gram</p>
            </div>
            <div>
              <p><strong>Nisab (Gold):</strong> {currentRates.nisabGold}g</p>
              <p><strong>Zakat Rate:</strong> 2.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatChatbot;
