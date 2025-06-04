import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, CreditCard, Gift, Users, TrendingUp } from 'lucide-react';
import TrustSystemBadge from './TrustSystemBadge';
import { useUTMTracking } from '@/hooks/useUTMTracking';
import { useCurrency } from '@/contexts/CurrencyContext';

interface DonationWidgetProps {
  campaignId?: string;
  charityId?: string;
  defaultAmount?: number;
  title?: string;
  description?: string;
}

const DonationWidget = ({ 
  campaignId, 
  charityId, 
  defaultAmount = 25,
  title = "Make a Donation",
  description = "Your generosity makes a real difference"
}: DonationWidgetProps) => {
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [selectedTab, setSelectedTab] = useState('charity');

  const { trackDonation, trackClick, getAttributionData } = useUTMTracking();
  const { currency } = useCurrency();

  // Get currency symbol based on detected/selected currency
  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      'GBP': '£',
      'USD': '$',
      'EUR': '€',
      'AED': 'د.إ',
      'SAR': 'ر.س',
      'QAR': 'ر.ق',
      'KWD': 'د.ك',
      'BHD': 'د.ب',
      'OMR': 'ر.ع',
      'EGP': 'ج.م',
      'JOD': 'د.أ',
      'PKR': '₨',
      'INR': '₹',
      'MYR': 'RM',
      'IDR': 'Rp',
      'TRY': '₺',
      'CAD': 'C$',
      'AUD': 'A$',
    };
    return symbols[curr] || '£';
  };

  const currencySymbol = getCurrencySymbol(currency);

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (value: string) => {
    trackClick(`amount-${value}`, 'amount_button');
    
    if (value === 'custom') {
      setIsCustom(true);
      setAmount('');
    } else {
      setIsCustom(false);
      setAmount(value);
      setCustomAmount('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    // Get attribution data
    const attributionData = getAttributionData();

    // Track the donation with UTM attribution
    trackDonation({
      amount: donationAmount,
      type: donationType,
      message,
      anonymous,
      campaignId,
      charityId,
      currency,
      donationMode: selectedTab,
      ...attributionData
    });

    // Here you would integrate with your payment system
    console.log('Processing donation with attribution:', {
      amount: donationAmount,
      currency,
      type: donationType,
      message,
      anonymous,
      campaignId,
      charityId,
      donationMode: selectedTab,
      attribution: attributionData
    });
  };

  const getCurrentAmount = () => {
    return isCustom ? parseFloat(customAmount) || 0 : parseFloat(amount) || 0;
  };

  const getFundraisingValue = () => {
    return getCurrentAmount() * 7;
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-6 w-6 text-red-500 mr-2" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
        
        {/* Trust System Badge */}
        <div className="mt-3">
          <TrustSystemBadge variant="detailed" showExplanation />
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="charity" className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>Charity</span>
            </TabsTrigger>
            <TabsTrigger value="fundraising" className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4" />
              <span>Fundraising</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charity" className="space-y-4 mt-4">
            {/* ... keep existing code (donation form content) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Donation Type */}
              <div>
                <Label htmlFor="donation-type">Donation Type</Label>
                <Select value={donationType} onValueChange={setDonationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time donation</SelectItem>
                    <SelectItem value="monthly">Monthly donation</SelectItem>
                    <SelectItem value="annual">Annual donation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Selection */}
              <div>
                <Label htmlFor="amount">Donation Amount ({currencySymbol})</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 mb-3">
                  {predefinedAmounts.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value.toString() && !isCustom ? "default" : "outline"}
                      className="h-10"
                      onClick={() => handleAmountSelect(value.toString())}
                    >
                      {currencySymbol}{value}
                    </Button>
                  ))}
                </div>
                <Button
                  type="button"
                  variant={isCustom ? "default" : "outline"}
                  className="w-full mb-2"
                  onClick={() => handleAmountSelect('custom')}
                >
                  Custom Amount
                </Button>
                
                {isCustom && (
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="1"
                    step="0.01"
                  />
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Share a message of support..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={(checked) => setAnonymous(checked as boolean)}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>

              {/* Trust Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">Smart Distribution</p>
                    <p>
                      {charityId 
                        ? "Your donation goes directly to this verified charity."
                        : "Your donation is distributed among verified charities based on their trust ratings and field activity."
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                onClick={() => trackClick('donate-button', 'primary_cta')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Donate {currencySymbol}{isCustom ? customAmount || '0' : amount}
              </Button>

              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-emerald-600 p-0 h-auto font-normal"
                  onClick={() => trackClick('gift-card-link', 'secondary_cta')}
                >
                  <Gift className="h-4 w-4 mr-1" />
                  Send as Gift Card Instead
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="fundraising" className="space-y-4 mt-4">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-orange-800 mb-2">🎯 Fundraising Donation</h3>
                <p className="text-sm text-orange-700">
                  Support our platform to help us raise more funds for charitable causes
                </p>
              </div>
              
              {/* 7x Value Display */}
              {getCurrentAmount() > 0 && (
                <div className="bg-white border border-orange-300 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-800 font-medium">Your Donation:</span>
                    <span className="text-xl font-bold text-orange-800">
                      {currencySymbol}{getCurrentAmount()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-orange-200">
                    <span className="text-green-700 font-bold">Fundraising Value:</span>
                    <span className="text-2xl font-bold text-green-700">
                      {currencySymbol}{getFundraisingValue()}
                    </span>
                  </div>
                  <p className="text-xs text-orange-600 mt-2 text-center">
                    ✨ Every £1 = £7 worth of fundraising impact!
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount Selection */}
              <div>
                <Label htmlFor="amount">Fundraising Amount ({currencySymbol})</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 mb-3">
                  {predefinedAmounts.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value.toString() && !isCustom ? "default" : "outline"}
                      className="h-10"
                      onClick={() => handleAmountSelect(value.toString())}
                    >
                      {currencySymbol}{value}
                    </Button>
                  ))}
                </div>
                <Button
                  type="button"
                  variant={isCustom ? "default" : "outline"}
                  className="w-full mb-2"
                  onClick={() => handleAmountSelect('custom')}
                >
                  Custom Amount
                </Button>
                
                {isCustom && (
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="1"
                    step="0.01"
                  />
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Share why you're supporting our fundraising efforts..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={(checked) => setAnonymous(checked as boolean)}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>

              {/* Fundraising Information */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div className="text-xs text-orange-700">
                    <p className="font-medium mb-1">Fundraising Impact</p>
                    <p>
                      Your fundraising donation helps us improve our platform and reach more donors,
                      multiplying the impact of charitable giving across our community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700" 
                size="lg"
                onClick={() => trackClick('fundraising-donate-button', 'primary_cta')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Support Fundraising {currencySymbol}{isCustom ? customAmount || '0' : amount}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DonationWidget;
