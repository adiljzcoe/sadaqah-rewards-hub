
import { useState, useEffect } from 'react';

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate from GBP
}

export interface LocationInfo {
  country: string;
  countryCode: string;
  currency: CurrencyInfo;
  timezone: string;
}

const currencyData: Record<string, CurrencyInfo> = {
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 1 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.27 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 1.17 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.71 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.95 },
  SAR: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', rate: 4.76 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 4.67 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 5.68 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rate: 352 },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 152 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 106 },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 43.5 },
};

const countryCurrencyMap: Record<string, string> = {
  GB: 'GBP', US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'AUD',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
  AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR', LU: 'EUR', GR: 'EUR',
  SA: 'SAR', AE: 'AED', QA: 'SAR', KW: 'SAR', BH: 'SAR', OM: 'SAR',
  MY: 'MYR', SG: 'USD', BN: 'MYR',
  PK: 'PKR', BD: 'BDT', IN: 'INR',
  TR: 'TRY', EG: 'USD', MA: 'USD', DZ: 'USD', TN: 'USD',
  ID: 'USD', TH: 'USD', VN: 'USD', PH: 'USD',
  NG: 'USD', GH: 'USD', KE: 'USD', ZA: 'USD',
};

export const useLocationCurrency = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Check if we have stored location first
        const stored = localStorage.getItem('userLocation');
        if (stored) {
          const parsedLocation = JSON.parse(stored);
          setLocationInfo(parsedLocation);
          setLoading(false);
          return;
        }

        // Try to get location from IP geolocation
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Failed to fetch location');
        
        const data = await response.json();
        const countryCode = data.country_code || 'GB';
        const currencyCode = countryCurrencyMap[countryCode] || 'GBP';
        
        const locationData: LocationInfo = {
          country: data.country_name || 'United Kingdom',
          countryCode: countryCode,
          currency: currencyData[currencyCode],
          timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        setLocationInfo(locationData);
        localStorage.setItem('userLocation', JSON.stringify(locationData));
        
      } catch (err) {
        console.error('Error detecting location:', err);
        
        // Fallback based on browser locale
        const locale = navigator.language;
        const countryCode = locale.includes('-') ? locale.split('-')[1] : 'GB';
        const currencyCode = countryCurrencyMap[countryCode] || 'GBP';
        
        const fallbackLocation: LocationInfo = {
          country: 'United Kingdom',
          countryCode: countryCode,
          currency: currencyData[currencyCode],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        
        setLocationInfo(fallbackLocation);
        setError('Could not detect precise location, using fallback');
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  const convertFromGBP = (amountInPence: number): number => {
    if (!locationInfo) return amountInPence;
    const convertedPence = amountInPence * locationInfo.currency.rate;
    return Math.round(convertedPence);
  };

  const formatCurrency = (amountInPence: number): string => {
    if (!locationInfo) return `£${(amountInPence / 100).toFixed(2)}`;
    
    const convertedPence = convertFromGBP(amountInPence);
    const { symbol, code } = locationInfo.currency;
    
    // For currencies that typically don't use decimals or have different formatting
    if (['PKR', 'BDT', 'INR'].includes(code)) {
      // These currencies often display without decimals for large amounts
      const amount = convertedPence / 100;
      if (amount >= 100) {
        return `${symbol}${Math.round(amount).toLocaleString()}`;
      }
      return `${symbol}${amount.toFixed(2)}`;
    }
    
    // Standard decimal formatting for most currencies
    const amount = convertedPence / 100;
    return `${symbol}${amount.toFixed(2)}`;
  };

  const setCurrency = (currencyCode: string) => {
    if (currencyData[currencyCode] && locationInfo) {
      const updatedLocation = {
        ...locationInfo,
        currency: currencyData[currencyCode]
      };
      setLocationInfo(updatedLocation);
      localStorage.setItem('userLocation', JSON.stringify(updatedLocation));
    }
  };

  return {
    locationInfo,
    loading,
    error,
    convertFromGBP,
    formatCurrency,
    setCurrency,
    availableCurrencies: currencyData,
  };
};
