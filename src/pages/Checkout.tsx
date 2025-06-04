
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Heart, Shield, Gift, Star, Crown } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import FloatingCheckoutWidget from '@/components/FloatingCheckoutWidget';
import LiveDonationFeedCheckout from '@/components/LiveDonationFeedCheckout';
import AuthDialog from '@/components/auth/AuthDialog';

const Checkout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom'
  });

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || ''
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = async () => {
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Thank you for your donation.');
      clearCart();
      
      // Redirect to success page or show success message
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-slate-300 mb-8">Add some items to your cart to proceed with checkout</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-32">
        <div className="container mx-auto px-4 pt-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
              Complete Your Donation
            </h1>
            <p className="text-slate-300">Secure checkout powered by industry-leading encryption</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-cyan-400" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-slate-300">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-slate-300">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postcode" className="text-slate-300">Postcode</Label>
                      <Input
                        id="postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-slate-300">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="terms" className="text-slate-300 text-sm leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
                          Terms and Conditions
                        </a>
                        {' '}and{' '}
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
                          Privacy Policy
                        </a>
                        . I understand that my donation will be processed securely and used for charitable purposes.
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary & Live Feed */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-400" />
                    Your Donation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image || '/placeholder.svg'} 
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-slate-400 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-white font-semibold">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-300">Subtotal</span>
                    <span className="text-white">£{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-300">Processing Fee</span>
                    <span className="text-white">£0.00</span>
                  </div>
                  
                  <Separator className="bg-slate-600" />
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-cyan-400">£{totalAmount.toFixed(2)}</span>
                  </div>

                  {/* Impact Statement */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-white">Your Impact</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Your donation of £{totalAmount.toFixed(2)} will help provide essential support to those in need. 
                      Thank you for making a difference in the world.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Live Donation Feed */}
              <LiveDonationFeedCheckout />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Checkout Widget */}
      <FloatingCheckoutWidget
        total={totalAmount}
        isProcessing={isProcessing}
        onPayNow={handlePayNow}
        onShowAuth={() => setShowAuth(true)}
        termsAccepted={termsAccepted}
      />

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
      />
    </>
  );
};

export default Checkout;
