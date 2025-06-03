
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIPLocationCurrency } from '@/hooks/useIPLocationCurrency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  isAutoDetected: boolean;
  isDetecting: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: React.ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const { detectedCurrency, isLoading } = useIPLocationCurrency();
  const [currency, setCurrency] = useState<string>('GBP');
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    // Check if user has manually set a currency preference
    const userCurrency = localStorage.getItem('userSelectedCurrency');
    
    if (userCurrency) {
      // User has manually selected a currency, use that
      setCurrency(userCurrency);
      setIsAutoDetected(false);
    } else if (detectedCurrency && !isLoading) {
      // Auto-detect currency based on IP
      setCurrency(detectedCurrency);
      setIsAutoDetected(true);
    }
  }, [detectedCurrency, isLoading]);

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    setIsAutoDetected(false);
    
    // Store user's manual selection
    localStorage.setItem('userSelectedCurrency', newCurrency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        isAutoDetected,
        isDetecting: isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
