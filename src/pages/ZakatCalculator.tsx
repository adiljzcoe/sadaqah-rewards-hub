
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calculator, History, MessageCircle, TrendingUp, Coins, Building, Users } from 'lucide-react';
import Header from '@/components/Header';
import ZakatCalculationForm from '@/components/zakat/ZakatCalculationForm';
import ZakatHistory from '@/components/zakat/ZakatHistory';
import ZakatDistribution from '@/components/zakat/ZakatDistribution';
import ZakatChatbot from '@/components/zakat/ZakatChatbot';
import { useAuth } from '@/hooks/useAuth';

const ZakatCalculator = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('calculate');
  const [calculatedZakat, setCalculatedZakat] = useState<number | null>(null);
  const [currentCalculation, setCurrentCalculation] = useState<any>(null);

  const handleCalculationComplete = (zakatAmount: number, calculationData: any) => {
    setCalculatedZakat(zakatAmount);
    setCurrentCalculation(calculationData);
    if (zakatAmount > 0) {
      setActiveTab('distribute');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-green-600" />
            Zakat Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your Zakat with precision using our comprehensive Islamic calculator. 
            Store your assets year after year, get expert guidance from our AI Zakat Sheikh, 
            and distribute your Zakat for maximum impact.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Coins className="h-8 w-8" />
                <div>
                  <p className="text-green-100">Nisab (Gold)</p>
                  <p className="text-2xl font-bold">87.48g</p>
                  <p className="text-sm text-green-100">Updated daily</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8" />
                <div>
                  <p className="text-blue-100">Zakat Rate</p>
                  <p className="text-2xl font-bold">2.5%</p>
                  <p className="text-sm text-blue-100">On eligible wealth</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div>
                  <p className="text-purple-100">Your Impact</p>
                  <p className="text-2xl font-bold">Global</p>
                  <p className="text-sm text-purple-100">Multiple projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculate" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculate
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="distribute" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Distribute
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Ask Sheikh
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculate">
            <ZakatCalculationForm onCalculationComplete={handleCalculationComplete} />
          </TabsContent>

          <TabsContent value="history">
            <ZakatHistory />
          </TabsContent>

          <TabsContent value="distribute">
            <ZakatDistribution 
              zakatAmount={calculatedZakat} 
              calculationData={currentCalculation}
            />
          </TabsContent>

          <TabsContent value="chatbot">
            <ZakatChatbot />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ZakatCalculator;
