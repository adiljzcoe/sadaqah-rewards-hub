
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

export interface MobileFeatures {
  isMobile: boolean;
  isTablet: boolean;
  touchSupported: boolean;
  orientation: 'portrait' | 'landscape';
  platform: 'ios' | 'android' | 'web';
}

export function useMobileFeatures(): MobileFeatures {
  const isMobile = useIsMobile();
  const [features, setFeatures] = useState<MobileFeatures>({
    isMobile: false,
    isTablet: false,
    touchSupported: false,
    orientation: 'portrait',
    platform: 'web'
  });

  useEffect(() => {
    const updateFeatures = () => {
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      let platform: 'ios' | 'android' | 'web' = 'web';
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        platform = 'ios';
      } else if (userAgent.includes('android')) {
        platform = 'android';
      }

      setFeatures({
        isMobile,
        isTablet,
        touchSupported,
        orientation,
        platform
      });
    };

    updateFeatures();
    window.addEventListener('resize', updateFeatures);
    window.addEventListener('orientationchange', updateFeatures);

    return () => {
      window.removeEventListener('resize', updateFeatures);
      window.removeEventListener('orientationchange', updateFeatures);
    };
  }, [isMobile]);

  return features;
}
