
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  merchantId?: string;
}

interface PaymentResult {
  success: boolean;
  paymentToken?: string;
  error?: string;
}

export class NativePaymentService {
  private isApplePay(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }

  private isGooglePay(): boolean {
    return Capacitor.getPlatform() === 'android';
  }

  private async getPlatformSettings() {
    try {
      const { data: platformSettings } = await supabase
        .from('site_config')
        .select('config_key, config_value')
        .in('config_key', [
          'sandbox_mode',
          'stripe_publishable_key'
        ]);

      if (!platformSettings) {
        throw new Error('Platform settings not found');
      }

      const settings = platformSettings.reduce((acc, setting) => {
        acc[setting.config_key] = JSON.parse(setting.config_value);
        return acc;
      }, {} as Record<string, any>);

      return settings;
    } catch (error) {
      console.error('Error fetching platform settings:', error);
      return null;
    }
  }

  async isNativePaymentAvailable(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return false;
    
    // Check if platform settings are configured
    const settings = await this.getPlatformSettings();
    if (!settings || !settings.stripe_publishable_key) {
      console.warn('Stripe keys not configured in platform settings');
      return false;
    }
    
    // Check if Apple Pay or Google Pay is available
    return this.isApplePay() || this.isGooglePay();
  }

  async processNativePayment(request: PaymentRequest): Promise<PaymentResult> {
    if (!Capacitor.isNativePlatform()) {
      return { success: false, error: 'Native payments only available on mobile devices' };
    }

    try {
      const settings = await this.getPlatformSettings();
      if (!settings) {
        return { success: false, error: 'Platform settings not configured' };
      }

      const sandboxMode = settings.sandbox_mode || false;
      const publishableKey = settings.stripe_publishable_key;

      // Validate key format based on sandbox mode
      if (sandboxMode && !publishableKey.startsWith('pk_test_')) {
        return { success: false, error: 'Sandbox mode enabled but test publishable key not configured' };
      }
      
      if (!sandboxMode && !publishableKey.startsWith('pk_live_')) {
        return { success: false, error: 'Live mode enabled but live publishable key not configured' };
      }

      console.log(`Processing native payment in ${sandboxMode ? 'test' : 'live'} mode`);

      if (this.isApplePay()) {
        return await this.processApplePay(request, sandboxMode);
      } else if (this.isGooglePay()) {
        return await this.processGooglePay(request, sandboxMode);
      } else {
        return { success: false, error: 'Native payment not supported on this platform' };
      }
    } catch (error) {
      console.error('Native payment error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  }

  private async processApplePay(request: PaymentRequest, sandboxMode: boolean): Promise<PaymentResult> {
    // This would typically use a Capacitor plugin for Apple Pay
    // For now, we'll simulate the flow
    console.log(`Processing Apple Pay payment in ${sandboxMode ? 'test' : 'live'} mode:`, request);
    
    // In a real implementation, you would:
    // 1. Show Apple Pay sheet with appropriate environment
    // 2. Get payment authorization
    // 3. Send to your payment processor with sandbox mode flag
    // 4. Return result
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentToken: `apple_pay_${sandboxMode ? 'test' : 'live'}_token_` + Date.now()
        });
      }, 2000);
    });
  }

  private async processGooglePay(request: PaymentRequest, sandboxMode: boolean): Promise<PaymentResult> {
    // This would typically use a Capacitor plugin for Google Pay
    // For now, we'll simulate the flow
    console.log(`Processing Google Pay payment in ${sandboxMode ? 'test' : 'live'} mode:`, request);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentToken: `google_pay_${sandboxMode ? 'test' : 'live'}_token_` + Date.now()
        });
      }, 2000);
    });
  }

  // Quick donation with native payment
  async quickDonate(amount: number): Promise<PaymentResult> {
    const settings = await this.getPlatformSettings();
    const sandboxMode = settings?.sandbox_mode || false;
    
    return this.processNativePayment({
      amount,
      currency: 'GBP',
      description: `Sadaqah donation of £${amount} (${sandboxMode ? 'Test' : 'Live'} Mode)`,
      merchantId: 'your.app.merchant.id'
    });
  }
}

export const nativePaymentService = new NativePaymentService();
