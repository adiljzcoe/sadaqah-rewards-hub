
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, X, TrendingUp } from 'lucide-react';
import PixarHeartMascot from './PixarHeartMascot';

const FloatingDonationWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedTab, setSelectedTab] = useState('charity');

  React.useEffect(() => {
    // Show the widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDonate = () => {
    setIsActive(true);
    // Reset animation after a short time
    setTimeout(() => setIsActive(false), 2000);
  };

  const handleFundraisingDonate = (amount: number) => {
    const valueReceived = amount * 7;
    console.log(`Fundraising Donation: £${amount} = £${valueReceived} value!`);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Card className="relative bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl shadow-2xl border border-pink-200 p-4 max-w-xs">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Pixar Heart Mascot */}
        <div className="w-32 h-32 mx-auto mb-4">
          <PixarHeartMascot isActive={isActive} className="w-full h-full" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Spread Love Today! 💕
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Our blessed heart is ready to help you make a difference in someone's life.
          </p>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-3">
              <TabsTrigger value="charity" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Charity
              </TabsTrigger>
              <TabsTrigger value="fundraising" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Fundraising
              </TabsTrigger>
            </TabsList>

            <TabsContent value="charity">
              <Button 
                onClick={handleDonate}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate with Love
              </Button>
            </TabsContent>

            <TabsContent value="fundraising">
              <div className="space-y-2">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-2">
                  <p className="text-xs text-orange-800 font-medium text-center">
                    ✨ Every £1 = £7 fundraising value!
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleFundraisingDonate(5)}
                    variant="outline"
                    className="text-xs py-1 px-2 h-auto"
                  >
                    £5
                    <div className="text-xs text-green-600">£35 value</div>
                  </Button>
                  <Button 
                    onClick={() => handleFundraisingDonate(25)}
                    variant="outline"
                    className="text-xs py-1 px-2 h-auto"
                  >
                    £25
                    <div className="text-xs text-green-600">£175 value</div>
                  </Button>
                </div>
                
                <Button 
                  onClick={() => handleFundraisingDonate(50)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  £50 = £350 Value!
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-300 rounded-full animate-pulse delay-500"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-rose-300 rounded-full animate-pulse delay-1000"></div>
      </Card>
    </div>
  );
};

export default FloatingDonationWidget;
