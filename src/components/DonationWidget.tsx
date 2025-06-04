import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, CreditCard, Gift, Users, Check } from 'lucide-react';
import TrustSystemBadge from './TrustSystemBadge';
import HeartDonationEffect from './HeartDonationEffect';
import { useUTMTracking } from '@/hooks/useUTMTracking';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/hooks/useCart';

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
  const [showMembership, setShowMembership] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [heartAnimationTrigger, setHeartAnimationTrigger] = useState(false);

  const { trackDonation, trackClick, getAttributionData } = useUTMTracking();
  const { currency } = useCurrency();
  const { addItem } = useCart();

  // Reset success state after 3 seconds
  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => {
        setJustAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

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

  const handleDonateClick = async () => {
    const donationAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);
    
    if (!donationAmount || donationAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    console.log('DonationWidget: Donate button clicked!');
    console.log('DonationWidget: Amount:', donationAmount);
    console.log('DonationWidget: Current heartAnimationTrigger state:', heartAnimationTrigger);
    
    // Reset trigger first to ensure a clean state change
    setHeartAnimationTrigger(false);
    
    // Use setTimeout to ensure state change is processed
    setTimeout(() => {
      console.log('DonationWidget: Setting heartAnimationTrigger to true');
      setHeartAnimationTrigger(true);
    }, 50);
    
    setIsAdding(true);

    console.log('DonationWidget: Adding donation to cart:', {
      amount: donationAmount,
      type: donationType,
      title
    });

    // Add to cart
    addItem({
      id: `donation-${Date.now()}`,
      name: `${title} - ${donationType}`,
      price: donationAmount,
      type: 'donation'
    });

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
      ...attributionData
    });

    console.log('DonationWidget: Processing donation with attribution:', {
      amount: donationAmount,
      currency,
      type: donationType,
      message,
      anonymous,
      campaignId,
      charityId,
      attribution: attributionData
    });
    
    // Show success state after a short delay
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDonateClick();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg relative overflow-visible">
      {/* Heart Animation Effect - positioned to work on mobile */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
        <HeartDonationEffect 
          trigger={heartAnimationTrigger}
          amount={isCustom ? customAmount || '0' : amount}
          currency={currencySymbol}
          onComplete={() => {
            console.log('DonationWidget: Heart animation completed! Resetting trigger.');
            setHeartAnimationTrigger(false);
          }}
        />
      </div>

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
            <Label htmlFor="amount">Donation Amount ({currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'})</Label>
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

          {/* Membership Upsell */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-purple-800">Multiply Your Impact</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMembership(!showMembership)}
                className="text-purple-600 p-1"
              >
                {showMembership ? '−' : '+'}
              </Button>
            </div>
            
            {showMembership ? (
              <div className="space-y-3">
                <p className="text-sm text-purple-700">
                  Join our membership to earn 1000 sadaqah coins per £1 spent, plus multiplied rewards on all donations.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded border">
                    <div className="font-medium text-purple-800">VIP - £9.99</div>
                    <div className="text-purple-600">2x rewards + 9,990 coins</div>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <div className="font-medium text-purple-800">Elite - £19.99</div>
                    <div className="text-purple-600">3x rewards + 19,990 coins</div>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                  onClick={() => trackClick('membership-upsell', 'membership_cta')}
                >
                  Learn More About Membership
                </Button>
              </div>
            ) : (
              <p className="text-sm text-purple-700">
                Get 1000 sadaqah coins per £1 with membership + multiplied rewards
              </p>
            )}
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

          {/* Submit Button with enhanced feedback */}
          <Button 
            type="button"
            className={`w-full transition-all duration-300 relative ${
              justAdded 
                ? 'bg-green-600 hover:bg-green-700 scale-105' 
                : isAdding 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : ''
            }`}
            size="lg"
            disabled={isAdding}
            onClick={(e) => {
              e.preventDefault();
              console.log('DonationWidget: Submit button clicked directly');
              trackClick('donate-button', 'primary_cta');
              handleDonateClick();
            }}
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Adding to Cart...
              </>
            ) : justAdded ? (
              <>
                <Check className="h-4 w-4 mr-2 animate-bounce" />
                Added to Cart!
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Donate {currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '€'}{isCustom ? customAmount || '0' : amount}
              </>
            )}
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
      </CardContent>
    </Card>
  );
};

export default DonationWidget;
