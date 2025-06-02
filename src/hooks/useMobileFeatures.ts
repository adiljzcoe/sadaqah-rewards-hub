
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { pushNotificationService } from '@/services/pushNotifications';
import { nativePaymentService } from '@/services/nativePayments';
import { useToast } from './use-toast';

export function useMobileFeatures() {
  const [isNative, setIsNative] = useState(false);
  const [nativePaymentAvailable, setNativePaymentAvailable] = useState(false);
  const [pushPermissionGranted, setPushPermissionGranted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeMobileFeatures = async () => {
      const isNativePlatform = Capacitor.isNativePlatform();
      setIsNative(isNativePlatform);

      if (isNativePlatform) {
        // Initialize push notifications
        try {
          await pushNotificationService.initialize();
          setPushPermissionGranted(true);
          console.log('Push notifications initialized');
        } catch (error) {
          console.error('Push notification initialization failed:', error);
        }

        // Check native payment availability
        try {
          const paymentAvailable = await nativePaymentService.isNativePaymentAvailable();
          setNativePaymentAvailable(paymentAvailable);
          console.log('Native payment available:', paymentAvailable);
        } catch (error) {
          console.error('Native payment check failed:', error);
        }
      }
    };

    initializeMobileFeatures();
  }, []);

  const sendDonationReminder = async () => {
    try {
      await pushNotificationService.sendDonationReminder();
      toast({
        title: "Reminder Set",
        description: "You'll receive a donation reminder shortly!",
      });
    } catch (error) {
      console.error('Failed to send donation reminder:', error);
    }
  };

  const sendUrgentAlert = async (campaignName: string) => {
    try {
      await pushNotificationService.sendUrgentCampaignAlert(campaignName);
      toast({
        title: "Alert Sent",
        description: `Urgent alert sent for ${campaignName}`,
      });
    } catch (error) {
      console.error('Failed to send urgent alert:', error);
    }
  };

  const processNativePayment = async (amount: number) => {
    if (!nativePaymentAvailable) {
      toast({
        title: "Payment Method Not Available",
        description: "Native payment is not available on this device",
        variant: "destructive",
      });
      return null;
    }

    try {
      const result = await nativePaymentService.quickDonate(amount);
      
      if (result.success) {
        toast({
          title: "Payment Successful! 🎉",
          description: `Your £${amount} donation has been processed`,
        });
        return result.paymentToken;
      } else {
        toast({
          title: "Payment Failed",
          description: result.error || "Payment processing failed",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Native payment error:', error);
      toast({
        title: "Payment Error",
        description: "An error occurred during payment processing",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    isNative,
    nativePaymentAvailable,
    pushPermissionGranted,
    sendDonationReminder,
    sendUrgentAlert,
    processNativePayment,
  };
}
