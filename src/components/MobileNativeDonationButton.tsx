
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';
import { Smartphone, CreditCard, Zap, Heart } from 'lucide-react';

interface MobileNativeDonationButtonProps {
  amount: number;
  campaignName?: string;
  onSuccess?: (paymentToken: string) => void;
}

const MobileNativeDonationButton = ({ 
  amount, 
  campaignName = "Emergency Relief",
  onSuccess 
}: MobileNativeDonationButtonProps) => {
  const { 
    isNative, 
    nativePaymentAvailable, 
    processNativePayment,
    sendUrgentAlert 
  } = useMobileFeatures();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNativePayment = async () => {
    setIsProcessing(true);
    try {
      const paymentToken = await processNativePayment(amount);
      if (paymentToken && onSuccess) {
        onSuccess(paymentToken);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrgentAlert = () => {
    sendUrgentAlert(campaignName);
  };

  if (!isNative) {
    return null; // Don't show on web
  }

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold text-emerald-800">Mobile Features</span>
          </div>
          <Badge className="bg-emerald-600 text-white">Native App</Badge>
        </div>

        <div className="space-y-3">
          {/* Native Payment Button */}
          {nativePaymentAvailable && (
            <Button
              onClick={handleNativePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3"
            >
              <div className="flex items-center justify-center space-x-2">
                {isProcessing ? (
                  <Zap className="h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="h-4 w-4" />
                )}
                <span>
                  {isProcessing 
                    ? 'Processing...' 
                    : `Quick Pay £${amount} (Apple/Google Pay)`
                  }
                </span>
              </div>
            </Button>
          )}

          {/* Push Notification Demo */}
          <Button
            onClick={handleUrgentAlert}
            variant="outline"
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <Heart className="h-4 w-4 mr-2" />
            Send Urgent Campaign Alert
          </Button>

          <div className="text-xs text-gray-600 text-center space-y-1">
            <div>✓ Secure native payment processing</div>
            <div>✓ Push notifications for urgent campaigns</div>
            <div>✓ Optimized for mobile experience</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileNativeDonationButton;
