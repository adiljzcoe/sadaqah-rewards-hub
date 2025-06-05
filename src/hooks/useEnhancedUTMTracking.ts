
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_charity?: string;
}

interface DeviceFingerprint {
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
}

interface TrackingData extends UTMParams {
  session_id: string;
  referrer: string;
  landing_page: string;
  device_fingerprint: DeviceFingerprint;
  first_touch_timestamp: string;
  last_touch_timestamp: string;
}

export const useEnhancedUTMTracking = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [sessionId] = useState(() => 
    localStorage.getItem('tracking_session_id') || 
    `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
  );

  // Generate device fingerprint
  const generateDeviceFingerprint = useCallback((): DeviceFingerprint => {
    return {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
    };
  }, []);

  // Store UTM tracking data
  const storeUTMTracking = useCallback(async (utmData: UTMParams) => {
    const trackingData = {
      session_id: sessionId,
      user_id: user?.id || null,
      ...utmData,
      referrer: document.referrer || '',
      landing_page: location.pathname + location.search,
      device_fingerprint: generateDeviceFingerprint(),
    };

    try {
      // Store in Supabase
      const { error } = await supabase
        .from('utm_tracking')
        .upsert(trackingData, {
          onConflict: 'session_id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error('Error storing UTM data:', error);
      }

      // Store locally as backup
      localStorage.setItem('utm_attribution', JSON.stringify(trackingData));
      localStorage.setItem('tracking_session_id', sessionId);
      
      console.log('UTM tracking stored:', trackingData);
    } catch (error) {
      console.error('Failed to store UTM tracking:', error);
    }
  }, [sessionId, user?.id, location, generateDeviceFingerprint]);

  // Initialize tracking on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currentUtmParams: UTMParams = {};

    // Extract UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_charity'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        currentUtmParams[param as keyof UTMParams] = value;
      }
    });

    // If we have new UTM params, store them
    if (Object.keys(currentUtmParams).length > 0) {
      setUtmParams(currentUtmParams);
      storeUTMTracking(currentUtmParams);
    } else {
      // Load existing UTM params from storage
      const storedParams = localStorage.getItem('utm_attribution');
      if (storedParams) {
        try {
          const parsed = JSON.parse(storedParams);
          setUtmParams({
            utm_source: parsed.utm_source,
            utm_medium: parsed.utm_medium,
            utm_campaign: parsed.utm_campaign,
            utm_term: parsed.utm_term,
            utm_content: parsed.utm_content,
            utm_charity: parsed.utm_charity,
          });
        } catch (error) {
          console.error('Error parsing stored UTM params:', error);
        }
      }
    }
  }, [location, storeUTMTracking]);

  // Track page views
  const trackPageView = useCallback(async (additionalData: any = {}) => {
    try {
      const pageViewData = {
        event_type: 'page_view',
        session_id: sessionId,
        user_id: user?.id || null,
        page_url: location.pathname + location.search,
        referrer: document.referrer || '',
        timestamp: new Date().toISOString(),
        ...utmParams,
        ...additionalData
      };

      // You could send this to an analytics endpoint
      console.log('Page view tracked:', pageViewData);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [sessionId, user?.id, location, utmParams]);

  // Track conversion event
  const trackConversion = useCallback(async (conversionData: {
    donation_id: string;
    amount: number;
    charity_id?: string;
  }) => {
    try {
      const conversionEvent = {
        event_type: 'donation_conversion',
        session_id: sessionId,
        user_id: user?.id || null,
        timestamp: new Date().toISOString(),
        ...utmParams,
        ...conversionData
      };

      console.log('Conversion tracked:', conversionEvent);
      
      // The database trigger will handle attribution automatically
      // when the donation is created
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }, [sessionId, user?.id, utmParams]);

  // Get attribution data for checkout
  const getAttributionData = useCallback(() => {
    return {
      session_id: sessionId,
      utm_params: utmParams,
      device_fingerprint: generateDeviceFingerprint(),
    };
  }, [sessionId, utmParams, generateDeviceFingerprint]);

  // Clear tracking data
  const clearTrackingData = useCallback(() => {
    localStorage.removeItem('utm_attribution');
    localStorage.removeItem('tracking_session_id');
    setUtmParams({});
  }, []);

  return {
    utmParams,
    sessionId,
    trackPageView,
    trackConversion,
    getAttributionData,
    clearTrackingData,
    isCharityAttributed: !!utmParams.utm_charity,
  };
};
