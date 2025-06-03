
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Globe, ChevronDown, Loader2 } from 'lucide-react';
import { useLocationCurrency } from '@/hooks/useLocationCurrency';

const CurrencySelector = () => {
  const { locationInfo, loading, setCurrency, availableCurrencies } = useLocationCurrency();

  if (loading) {
    return (
      <Button variant="outline" size="sm" className="flex items-center gap-2" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (!locationInfo) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{locationInfo.currency.code}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Select Currency</h4>
          <Select
            value={locationInfo.currency.code}
            onValueChange={setCurrency}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(availableCurrencies).map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center justify-between w-full">
                    <span>{currency.symbol} {currency.name}</span>
                    <span className="text-gray-500 ml-2">{currency.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-gray-500">
            <p>Detected location: {locationInfo.country}</p>
            <p>All amounts are converted from GBP at current exchange rates</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CurrencySelector;
