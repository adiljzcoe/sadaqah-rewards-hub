
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Eye, Trash2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ZakatCalculation {
  year: string;
  currency: string;
  assets: any;
  nisabValues: any;
  totalAssets: number;
  netWealth: number;
  nisabAmount: number;
  zakatAmount: number;
  calculatedAt: string;
}

const ZakatHistory = () => {
  const [calculations, setCalculations] = useState<ZakatCalculation[]>([]);
  const [selectedCalculation, setSelectedCalculation] = useState<ZakatCalculation | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zakatCalculations');
    if (saved) {
      setCalculations(JSON.parse(saved));
    }
  }, []);

  const deleteCalculation = (index: number) => {
    const updated = calculations.filter((_, i) => i !== index);
    setCalculations(updated);
    localStorage.setItem('zakatCalculations', JSON.stringify(updated));
  };

  const exportCalculation = (calculation: ZakatCalculation) => {
    const data = JSON.stringify(calculation, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zakat-calculation-${calculation.year}.json`;
    a.click();
  };

  if (calculations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Calculations Yet</h3>
          <p className="text-gray-600 mb-4">
            Your Zakat calculations will appear here once you start calculating.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Zakat History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations.map((calc, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{calc.year} Calculation</h3>
                      <p className="text-gray-600 text-sm">
                        Calculated on {new Date(calc.calculatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {calc.currency}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-600">Zakat Due</p>
                      <p className="text-xl font-bold text-green-600">
                        {calc.currency === 'GBP' ? '£' : 
                         calc.currency === 'USD' ? '$' : 
                         calc.currency === 'EUR' ? '€' : 'ر.س'}
                        {calc.zakatAmount.toFixed(2)}
                      </p>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCalculation(calc)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{calc.year} Zakat Calculation Details</DialogTitle>
                        </DialogHeader>
                        {selectedCalculation && (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Assets Summary</h4>
                                <div className="space-y-1 text-sm">
                                  <p>Cash: {selectedCalculation.currency} {selectedCalculation.assets.cash.toFixed(2)}</p>
                                  <p>Bank Savings: {selectedCalculation.currency} {selectedCalculation.assets.bankSavings.toFixed(2)}</p>
                                  <p>Gold: {selectedCalculation.assets.goldGrams}g ({selectedCalculation.currency} {selectedCalculation.assets.goldValue.toFixed(2)})</p>
                                  <p>Silver: {selectedCalculation.assets.silverGrams}g ({selectedCalculation.currency} {selectedCalculation.assets.silverValue.toFixed(2)})</p>
                                  <p>Investments: {selectedCalculation.currency} {selectedCalculation.assets.investments.toFixed(2)}</p>
                                  <p>Business: {selectedCalculation.currency} {selectedCalculation.assets.businessAssets.toFixed(2)}</p>
                                  <p>Crypto: {selectedCalculation.currency} {selectedCalculation.assets.cryptocurrency.toFixed(2)}</p>
                                </div>
                              </div>
                              
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Calculation Result</h4>
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    <span className="font-medium">Total Assets:</span> {selectedCalculation.currency} {selectedCalculation.totalAssets.toFixed(2)}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Debts:</span> {selectedCalculation.currency} {selectedCalculation.assets.immediateDebts.toFixed(2)}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Net Wealth:</span> {selectedCalculation.currency} {selectedCalculation.netWealth.toFixed(2)}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Nisab:</span> {selectedCalculation.currency} {selectedCalculation.nisabAmount.toFixed(2)}
                                  </p>
                                  <div className="border-t pt-2 mt-2">
                                    <p className="text-lg font-bold text-green-700">
                                      Zakat Due: {selectedCalculation.currency} {selectedCalculation.zakatAmount.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => exportCalculation(calc)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteCalculation(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZakatHistory;
