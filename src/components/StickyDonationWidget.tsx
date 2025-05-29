
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickAmounts = [10, 25, 50, 100];

const StickyDonationWidget = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('sadaqah');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100); // Becomes sticky after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${isSticky ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg transition-all duration-300`}>
      <div className="container mx-auto px-4 py-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-2 h-8">
            <TabsTrigger value="sadaqah" className="text-xs py-1">Sadaqah</TabsTrigger>
            <TabsTrigger value="zakat" className="text-xs py-1">Zakat</TabsTrigger>
            <TabsTrigger value="lillah" className="text-xs py-1">Lillah</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs py-1">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-12 gap-3 items-end">
              {/* Quick amounts */}
              <div className="col-span-6 grid grid-cols-4 gap-1">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-1.5 px-2 rounded text-xs font-medium transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    £{amount}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="col-span-3">
                <Input
                  type="number"
                  placeholder="Other"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="h-8 text-xs"
                />
              </div>

              {/* Donate button */}
              <div className="col-span-3">
                <Button className="w-full h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium">
                  Donate £{customAmount || selectedAmount}
                </Button>
              </div>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center space-x-3 mt-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Pay with:</span>
                <div className="flex space-x-1">
                  <div className="w-6 h-4 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">
                    PP
                  </div>
                  <div className="w-6 h-4 bg-blue-800 rounded text-white text-[8px] flex items-center justify-center font-bold">
                    V
                  </div>
                  <div className="w-6 h-4 bg-red-600 rounded text-white text-[8px] flex items-center justify-center font-bold">
                    MC
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StickyDonationWidget;
