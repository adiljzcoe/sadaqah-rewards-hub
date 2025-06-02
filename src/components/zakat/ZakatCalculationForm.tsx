import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Coins, DollarSign, Euro, PoundSterling, Calculator, Save, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ZakatCalculationFormProps {
  onCalculationComplete: (zakatAmount: number, calculationData: any) => void;
}

interface AssetValues {
  cash: number;
  bankSavings: number;
  goldGrams: number;
  goldValue: number;
  silverGrams: number;
  silverValue: number;
  investments: number;
  businessAssets: number;
  cryptocurrency: number;
  debtsOwed: number;
  immediateDebts: number;
}

const currencies = [
  { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
  { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', icon: Coins },
];

const ZakatCalculationForm = ({ onCalculationComplete }: ZakatCalculationFormProps) => {
  const { toast } = useToast();
  const [currency, setCurrency] = useState('GBP');
  const [assets, setAssets] = useState<AssetValues>({
    cash: 0,
    bankSavings: 0,
    goldGrams: 0,
    goldValue: 0,
    silverGrams: 0,
    silverValue: 0,
    investments: 0,
    businessAssets: 0,
    cryptocurrency: 0,
    debtsOwed: 0,
    immediateDebts: 0,
  });

  const [nisabValues, setNisabValues] = useState({
    gold: 87.48, // grams
    silver: 612.36, // grams
    goldPrice: 65.50, // per gram in GBP
    silverPrice: 0.95, // per gram in GBP
  });

  const [calculationYear, setCalculationYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    // Auto-calculate gold/silver values when grams change
    setAssets(prev => ({
      ...prev,
      goldValue: prev.goldGrams * nisabValues.goldPrice,
      silverValue: prev.silverGrams * nisabValues.silverPrice,
    }));
  }, [assets.goldGrams, assets.silverGrams, nisabValues]);

  const handleAssetChange = (key: keyof AssetValues, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAssets(prev => ({ ...prev, [key]: numValue }));
  };

  const calculateZakat = () => {
    // Calculate total wealth
    const totalAssets = assets.cash + assets.bankSavings + assets.goldValue + 
                       assets.silverValue + assets.investments + assets.businessAssets + 
                       assets.cryptocurrency + assets.debtsOwed;
    
    const netWealth = totalAssets - assets.immediateDebts;
    
    // Determine Nisab (use gold Nisab as it's typically higher)
    const nisabAmount = nisabValues.gold * nisabValues.goldPrice;
    
    // Check if wealth meets Nisab threshold
    if (netWealth < nisabAmount) {
      toast({
        title: "Below Nisab Threshold",
        description: `Your net wealth (${currency} ${netWealth.toFixed(2)}) is below the Nisab threshold (${currency} ${nisabAmount.toFixed(2)}). Zakat is not obligatory.`,
        variant: "default",
      });
      return;
    }

    // Calculate Zakat (2.5%)
    const zakatAmount = netWealth * 0.025;
    
    const calculationData = {
      year: calculationYear,
      currency,
      assets: { ...assets },
      nisabValues: { ...nisabValues },
      totalAssets,
      netWealth,
      nisabAmount,
      zakatAmount,
      calculatedAt: new Date().toISOString(),
    };

    // Save to localStorage for history
    const savedCalculations = JSON.parse(localStorage.getItem('zakatCalculations') || '[]');
    savedCalculations.push(calculationData);
    localStorage.setItem('zakatCalculations', JSON.stringify(savedCalculations));

    toast({
      title: "Zakat Calculated Successfully",
      description: `Your Zakat amount is ${currency} ${zakatAmount.toFixed(2)}`,
    });

    onCalculationComplete(zakatAmount, calculationData);
  };

  const selectedCurrency = currencies.find(c => c.code === currency);
  const CurrencyIcon = selectedCurrency?.icon || DollarSign;

  const totalWealth = assets.cash + assets.bankSavings + assets.goldValue + 
                     assets.silverValue + assets.investments + assets.businessAssets + 
                     assets.cryptocurrency + assets.debtsOwed;
  const netWealth = totalWealth - assets.immediateDebts;
  const nisabAmount = nisabValues.gold * nisabValues.goldPrice;
  const isAboveNisab = netWealth >= nisabAmount;

  return (
    <div className="space-y-6">
      {/* Currency and Year Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CurrencyIcon className="h-5 w-5" />
            Calculation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => (
                    <SelectItem key={curr.code} value={curr.code}>
                      <div className="flex items-center gap-2">
                        <curr.icon className="h-4 w-4" />
                        {curr.name} ({curr.symbol})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="year">Calculation Year</Label>
              <Input
                value={calculationYear}
                onChange={(e) => setCalculationYear(e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assets Section */}
      <Card>
        <CardHeader>
          <CardTitle>Cash & Liquid Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Cash in Hand</Label>
              <Input
                type="number"
                value={assets.cash || ''}
                onChange={(e) => handleAssetChange('cash', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Bank Savings</Label>
              <Input
                type="number"
                value={assets.bankSavings || ''}
                onChange={(e) => handleAssetChange('bankSavings', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gold & Silver */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-600" />
            Precious Metals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label>Gold (grams)</Label>
              <Input
                type="number"
                value={assets.goldGrams || ''}
                onChange={(e) => handleAssetChange('goldGrams', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Gold Value ({currency})</Label>
              <Input
                type="number"
                value={assets.goldValue.toFixed(2)}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label>Silver (grams)</Label>
              <Input
                type="number"
                value={assets.silverGrams || ''}
                onChange={(e) => handleAssetChange('silverGrams', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Silver Value ({currency})</Label>
              <Input
                type="number"
                value={assets.silverValue.toFixed(2)}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <strong>Current Prices:</strong> Gold: {selectedCurrency?.symbol}{nisabValues.goldPrice}/g, 
            Silver: {selectedCurrency?.symbol}{nisabValues.silverPrice}/g
          </div>
        </CardContent>
      </Card>

      {/* Other Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Other Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Investments & Shares</Label>
              <Input
                type="number"
                value={assets.investments || ''}
                onChange={(e) => handleAssetChange('investments', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Business Assets</Label>
              <Input
                type="number"
                value={assets.businessAssets || ''}
                onChange={(e) => handleAssetChange('businessAssets', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Cryptocurrency</Label>
              <Input
                type="number"
                value={assets.cryptocurrency || ''}
                onChange={(e) => handleAssetChange('cryptocurrency', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Money Owed to You</Label>
              <Input
                type="number"
                value={assets.debtsOwed || ''}
                onChange={(e) => handleAssetChange('debtsOwed', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debts */}
      <Card>
        <CardHeader>
          <CardTitle>Debts & Liabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Immediate Debts (due within year)</Label>
            <Input
              type="number"
              value={assets.immediateDebts || ''}
              onChange={(e) => handleAssetChange('immediateDebts', e.target.value)}
              placeholder="0.00"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Assets</p>
              <p className="text-2xl font-bold text-blue-900">
                {selectedCurrency?.symbol}{totalWealth.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Net Wealth</p>
              <p className="text-2xl font-bold text-orange-900">
                {selectedCurrency?.symbol}{netWealth.toFixed(2)}
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Nisab Threshold</p>
              <p className="text-2xl font-bold text-purple-900">
                {selectedCurrency?.symbol}{nisabAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAboveNisab ? (
              <Badge className="bg-green-100 text-green-800">
                Above Nisab - Zakat is due
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-800 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Below Nisab - Zakat not required
              </Badge>
            )}
          </div>

          <Button 
            onClick={calculateZakat} 
            className="w-full" 
            size="lg"
            disabled={!isAboveNisab}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Zakat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatCalculationForm;
