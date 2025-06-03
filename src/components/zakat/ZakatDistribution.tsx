
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Building, Droplets, GraduationCap, Home, AlertCircle } from 'lucide-react';
import DonationWidget from '@/components/DonationWidget';

interface ZakatDistributionProps {
  zakatAmount: number | null;
  calculationData: any;
}

const zakatFunds = [
  {
    id: 'orphans',
    name: 'Orphan Care',
    description: 'Supporting orphaned children with shelter, education, and healthcare',
    icon: Heart,
    color: 'bg-pink-500',
    defaultPercentage: 25,
  },
  {
    id: 'water',
    name: 'Water Wells',
    description: 'Providing clean water access to communities in need',
    icon: Droplets,
    color: 'bg-blue-500',
    defaultPercentage: 20,
  },
  {
    id: 'education',
    name: 'Education Support',
    description: 'Building schools and supporting education programs',
    icon: GraduationCap,
    color: 'bg-green-500',
    defaultPercentage: 20,
  },
  {
    id: 'poverty',
    name: 'Poverty Relief',
    description: 'Direct aid to families and individuals in extreme poverty',
    icon: Users,
    color: 'bg-orange-500',
    defaultPercentage: 15,
  },
  {
    id: 'housing',
    name: 'Emergency Housing',
    description: 'Providing shelter for refugees and displaced families',
    icon: Home,
    color: 'bg-purple-500',
    defaultPercentage: 10,
  },
  {
    id: 'medical',
    name: 'Medical Aid',
    description: 'Healthcare support and medical emergency relief',
    icon: Building,
    color: 'bg-red-500',
    defaultPercentage: 10,
  },
];

const ZakatDistribution = ({ zakatAmount, calculationData }: ZakatDistributionProps) => {
  const [distributions, setDistributions] = useState(
    zakatFunds.reduce((acc, fund) => ({
      ...acc,
      [fund.id]: fund.defaultPercentage
    }), {} as Record<string, number>)
  );

  const totalPercentage = Object.values(distributions).reduce((sum, val) => sum + val, 0);
  const isValidDistribution = Math.abs(totalPercentage - 100) < 0.01;

  const handlePercentageChange = (fundId: string, percentage: number) => {
    setDistributions(prev => ({
      ...prev,
      [fundId]: Math.max(0, Math.min(100, percentage))
    }));
  };

  const resetToDefaults = () => {
    setDistributions(
      zakatFunds.reduce((acc, fund) => ({
        ...acc,
        [fund.id]: fund.defaultPercentage
      }), {})
    );
  };

  const distributeEqually = () => {
    const equalPercentage = 100 / zakatFunds.length;
    setDistributions(
      zakatFunds.reduce((acc, fund) => ({
        ...acc,
        [fund.id]: Math.round(equalPercentage * 100) / 100
      }), {})
    );
  };

  if (!zakatAmount) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Zakat to Distribute</h3>
          <p className="text-gray-600">
            Please calculate your Zakat first to distribute it among different causes.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currency = calculationData?.currency || 'GBP';
  const currencySymbol = currency === 'GBP' ? '£' : 
                         currency === 'USD' ? '$' : 
                         currency === 'EUR' ? '€' : 'ر.س';

  return (
    <div className="space-y-6">
      {/* Distribution Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Distribute Your Zakat</span>
            <Badge variant={isValidDistribution ? "default" : "destructive"}>
              {totalPercentage.toFixed(1)}% allocated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold text-green-800">
              Total Zakat Amount: {currencySymbol}{zakatAmount.toFixed(2)}
            </p>
            <p className="text-sm text-green-600">
              Calculated from {calculationData?.year} Islamic year
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <Button variant="outline" onClick={resetToDefaults} size="sm">
              Reset to Defaults
            </Button>
            <Button variant="outline" onClick={distributeEqually} size="sm">
              Distribute Equally
            </Button>
          </div>

          {!isValidDistribution && (
            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4">
              <p className="text-orange-800 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Please adjust percentages to total exactly 100%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Distribution Controls */}
      <div className="grid gap-4">
        {zakatFunds.map((fund) => {
          const IconComponent = fund.icon;
          const amount = (zakatAmount * distributions[fund.id]) / 100;
          
          return (
            <Card key={fund.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${fund.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold">{fund.name}</h3>
                    <p className="text-sm text-gray-600">{fund.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{currencySymbol}{amount.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={distributions[fund.id]}
                          onChange={(e) => handlePercentageChange(fund.id, parseFloat(e.target.value) || 0)}
                          className="w-20 h-8 text-sm"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <Progress value={distributions[fund.id]} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Donation Actions */}
      {isValidDistribution && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Zakat Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Your Zakat has been allocated across {zakatFunds.length} impactful causes. 
              Proceed to donate and fulfill your Islamic obligation.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {zakatFunds.map((fund) => {
                const amount = (zakatAmount * distributions[fund.id]) / 100;
                if (amount < 1) return null; // Don't show very small amounts
                
                return (
                  <div key={fund.id}>
                    <DonationWidget
                      charityId={fund.id}
                      title={fund.name}
                      description={`Zakat allocation: ${distributions[fund.id]}%`}
                      defaultAmount={Math.round(amount)}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> These donations will be processed as Zakat payments and 
                recorded for your Islamic giving records. May Allah accept your Zakat.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZakatDistribution;
