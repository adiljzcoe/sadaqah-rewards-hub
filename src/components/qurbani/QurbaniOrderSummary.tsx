
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Users, MapPin, Calendar, Heart, CreditCard } from 'lucide-react';

interface QurbaniOrderSummaryProps {
  selectedAnimal: any;
  selectedLocation: any;
  selectedShares: number;
  onSharesChange: (shares: number) => void;
  isPreorderMode: boolean;
  onOrderComplete: () => void;
}

const QurbaniOrderSummary = ({
  selectedAnimal,
  selectedLocation,
  selectedShares,
  onSharesChange,
  isPreorderMode,
  onOrderComplete
}: QurbaniOrderSummaryProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recipientName, setRecipientName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedAnimal || !selectedLocation) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Incomplete Selection</h3>
          <p className="text-gray-500">Please select both an animal and location to continue.</p>
        </CardContent>
      </Card>
    );
  }

  const totalAmount = selectedAnimal.price_per_share * selectedShares;
  const maxShares = selectedAnimal.total_shares || 1;

  const handleSubmitOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place your order.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        user_id: user.id,
        animal_id: selectedAnimal.id === 'general' ? null : selectedAnimal.id,
        location_id: selectedLocation.id,
        charity_id: selectedAnimal.charity_id || null,
        order_type: isPreorderMode ? 'preorder' : 'qurbani',
        shares_purchased: selectedShares,
        total_amount: totalAmount,
        status: (isPreorderMode ? 'preorder' : 'confirmed') as 'preorder' | 'confirmed',
        recipient_name: recipientName || 'Self',
        special_instructions: specialInstructions || null
      };

      const { data, error } = await supabase
        .from('qurbani_orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Order Placed Successfully!",
        description: `Your ${isPreorderMode ? 'preorder' : 'Qurbani order'} has been confirmed.`,
      });

      onOrderComplete();
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAnimalIcon = (type: string) => {
    const icons = {
      sheep: '🐑',
      goat: '🐐', 
      cow: '🐄',
      buffalo: '🐃',
      camel: '🐪',
      general: '⚡'
    };
    return icons[type as keyof typeof icons] || '🐑';
  };

  return (
    <div className="space-y-6">
      {/* Order Summary Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
              <p className="text-purple-100">
                Review your {isPreorderMode ? 'preorder' : 'Qurbani order'} details
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl mb-2">📋</div>
              <Badge variant="secondary">
                {isPreorderMode ? 'Preorder' : 'Qurbani Season'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Animal Selection */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-4xl">{getAnimalIcon(selectedAnimal.animal_type)}</div>
              <div className="flex-1">
                <h4 className="font-semibold">{selectedAnimal.animal_name}</h4>
                <p className="text-sm text-gray-600">{selectedAnimal.charity?.name}</p>
                {selectedAnimal.description && (
                  <p className="text-xs text-gray-500">{selectedAnimal.description}</p>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">
                  £{(selectedAnimal.price_per_share / 100).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">per share</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div>
                <h4 className="font-semibold">{selectedLocation.name}</h4>
                <p className="text-sm text-gray-600">
                  {selectedLocation.region && `${selectedLocation.region}, `}{selectedLocation.country}
                </p>
              </div>
            </div>

            {/* Shares Selection */}
            {maxShares > 1 && (
              <div>
                <Label htmlFor="shares">Number of Shares</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSharesChange(Math.max(1, selectedShares - 1))}
                    disabled={selectedShares <= 1}
                  >
                    -
                  </Button>
                  <Input
                    id="shares"
                    type="number"
                    min="1"
                    max={maxShares}
                    value={selectedShares}
                    onChange={(e) => onSharesChange(Math.min(maxShares, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSharesChange(Math.min(maxShares, selectedShares + 1))}
                    disabled={selectedShares >= maxShares}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-500">
                    (Max: {maxShares})
                  </span>
                </div>
              </div>
            )}

            {/* Recipient Information */}
            <div>
              <Label htmlFor="recipient">Recipient Name (Optional)</Label>
              <Input
                id="recipient"
                placeholder="Who is this Qurbani for? (e.g., In memory of...)"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Special Instructions */}
            <div>
              <Label htmlFor="instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any special requests or instructions..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Price per share</span>
                <span>£{(selectedAnimal.price_per_share / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of shares</span>
                <span>{selectedShares}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span className="text-emerald-600">£{(totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Impact Information */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Your Impact</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Feed approximately {selectedShares * 7} people</li>
                  <li>• Support local community in {selectedLocation.country}</li>
                  <li>• Fulfill your Islamic obligation</li>
                  {selectedAnimal.id === 'general' && (
                    <li>• Surplus funds support other charity projects</li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Timing Information */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    {isPreorderMode ? 'Preorder Timeline' : 'Qurbani Timeline'}
                  </span>
                </div>
                <div className="text-sm text-blue-700 space-y-1">
                  {isPreorderMode ? (
                    <>
                      <p>• Order confirmed immediately</p>
                      <p>• Animal reserved for Qurbani season</p>
                      <p>• Slaughter during Eid al-Adha</p>
                      <p>• Distribution updates via email</p>
                    </>
                  ) : (
                    <>
                      <p>• Order processed within 24 hours</p>
                      <p>• Slaughter during Qurbani days</p>
                      <p>• Immediate distribution to needy</p>
                      <p>• Completion photos via email</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                `Confirm ${isPreorderMode ? 'Preorder' : 'Order'} - £${(totalAmount / 100).toFixed(2)}`
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By placing this order, you agree to our terms and conditions.
              {isPreorderMode && ' Payment will be processed closer to Qurbani season.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QurbaniOrderSummary;
