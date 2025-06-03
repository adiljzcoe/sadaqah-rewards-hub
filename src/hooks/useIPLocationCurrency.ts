
import { useState, useEffect } from 'react';

interface LocationData {
  country: string;
  countryCode: string;
  currency: string;
  ip: string;
}

interface CurrencyMapping {
  [key: string]: string;
}

const currencyMapping: CurrencyMapping = {
  'US': 'USD',
  'GB': 'GBP', 
  'AE': 'AED',
  'SA': 'SAR',
  'QA': 'QAR',
  'KW': 'KWD',
  'BH': 'BHD',
  'OM': 'OMR',
  'EG': 'EGP',
  'JO': 'JOD',
  'LB': 'LBP',
  'PK': 'PKR',
  'BD': 'BDT',
  'IN': 'INR',
  'MY': 'MYR',
  'ID': 'IDR',
  'TR': 'TRY',
  'EU': 'EUR',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'CA': 'CAD',
  'AU': 'AUD',
};

export const useIPLocationCurrency = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [detectedCurrency, setDetectedCurrency] = useState<string>('GBP');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectLocationAndCurrency = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try multiple IP geolocation services for better reliability
        const services = [
          'https://ipapi.co/json/',
          'https://api.ipify.org?format=json',
          'https://ipinfo.io/json'
        ];

        let locationResult = null;

        for (const service of services) {
          try {
            const response = await fetch(service, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
            });

            if (response.ok) {
              const data = await response.json();
              
              // Handle different API response formats
              if (service.includes('ipapi.co')) {
                locationResult = {
                  country: data.country_name || 'United Kingdom',
                  countryCode: data.country_code || 'GB',
                  currency: data.currency || 'GBP',
                  ip: data.ip || 'unknown'
                };
              } else if (service.includes('ipinfo.io')) {
                locationResult = {
                  country: data.country || 'United Kingdom',
                  countryCode: data.country || 'GB',
                  currency: currencyMapping[data.country] || 'GBP',
                  ip: data.ip || 'unknown'
                };
              }
              
              if (locationResult) break;
            }
          } catch (serviceError) {
            console.warn(`IP service ${service} failed:`, serviceError);
            continue;
          }
        }

        if (locationResult) {
          setLocationData(locationResult);
          
          // Determine currency based on country code
          const currency = currencyMapping[locationResult.countryCode] || 'GBP';
          setDetectedCurrency(currency);

          // Store in localStorage for future visits
          localStorage.setItem('detectedCurrency', currency);
          localStorage.setItem('detectedCountry', locationResult.countryCode);
          
          console.log('IP-based currency detection:', {
            country: locationResult.country,
            countryCode: locationResult.countryCode,
            detectedCurrency: currency
          });
        } else {
          throw new Error('All IP detection services failed');
        }

      } catch (err) {
        console.warn('IP-based currency detection failed:', err);
        setError('Failed to detect location');
        
        // Fallback to stored currency or default
        const storedCurrency = localStorage.getItem('detectedCurrency');
        if (storedCurrency) {
          setDetectedCurrency(storedCurrency);
        } else {
          setDetectedCurrency('GBP'); // Default fallback
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only run detection if we haven't already detected currency in this session
    const sessionDetected = sessionStorage.getItem('currencyDetected');
    if (!sessionDetected) {
      detectLocationAndCurrency();
      sessionStorage.setItem('currencyDetected', 'true');
    } else {
      // Use stored currency from previous detection
      const storedCurrency = localStorage.getItem('detectedCurrency') || 'GBP';
      setDetectedCurrency(storedCurrency);
      setIsLoading(false);
    }
  }, []);

  return {
    locationData,
    detectedCurrency,
    isLoading,
    error,
    currencyMapping
  };
};
