
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface TrackingData extends UTMParams {
  referrer: string;
  timestamp: string;
  sessionId: string;
  userId?: string;
  pageUrl: string;
}

export const useUTMTracking = () => {
  const location = useLocation();
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [sessionId] = useState(() => 
    localStorage.getItem('tracking_session_id') || 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );

  useEffect(() => {
    // Save session ID
    localStorage.setItem('tracking_session_id', sessionId);
  }, [sessionId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currentUtmParams: UTMParams = {};

    // Extract UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        currentUtmParams[param as keyof UTMParams] = value;
      }
    });

    // Store UTM params in localStorage for attribution
    if (Object.keys(currentUtmParams).length > 0) {
      const existingParams = JSON.parse(localStorage.getItem('utm_params') || '{}');
      const updatedParams = { ...existingParams, ...currentUtmParams };
      localStorage.setItem('utm_params', JSON.stringify(updatedParams));
      setUtmParams(updatedParams);
    } else {
      // Load existing UTM params if no new ones
      const storedParams = JSON.parse(localStorage.getItem('utm_params') || '{}');
      setUtmParams(storedParams);
    }

    // Track page view
    trackEvent('page_view', {
      ...currentUtmParams,
      pageUrl: location.pathname + location.search,
      referrer: document.referrer
    });

  }, [location]);

  const trackEvent = async (eventType: string, additionalData: any = {}) => {
    const trackingData: TrackingData = {
      ...utmParams,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      sessionId,
      pageUrl: location.pathname + location.search,
      ...additionalData
    };

    // Store in localStorage for offline capability
    const trackingQueue = JSON.parse(localStorage.getItem('tracking_queue') || '[]');
    trackingQueue.push({
      eventType,
      data: trackingData
    });
    localStorage.setItem('tracking_queue', JSON.stringify(trackingQueue));

    // Send to analytics endpoint
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          data: trackingData
        })
      });

      // Clear tracking queue on successful send
      localStorage.removeItem('tracking_queue');
    } catch (error) {
      console.log('Analytics tracking queued for later:', error);
    }
  };

  const trackDonation = (donationData: any) => {
    trackEvent('donation', {
      amount: donationData.amount,
      charity_id: donationData.charity_id,
      campaign_id: donationData.campaign_id,
      conversion: true
    });
  };

  const trackClick = (elementId: string, elementType: string) => {
    trackEvent('click', {
      elementId,
      elementType
    });
  };

  const getAttributionData = () => {
    return {
      utmParams,
      sessionId,
      referrer: document.referrer
    };
  };

  const clearUTMData = () => {
    localStorage.removeItem('utm_params');
    localStorage.removeItem('tracking_session_id');
    setUtmParams({});
  };

  return {
    utmParams,
    sessionId,
    trackEvent,
    trackDonation,
    trackClick,
    getAttributionData,
    clearUTMData
  };
};
