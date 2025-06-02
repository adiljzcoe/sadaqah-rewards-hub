
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, MapPin, Users, Star, Clock, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import QurbaniAnimalSelector from '@/components/qurbani/QurbaniAnimalSelector';
import QurbaniLocationSelector from '@/components/qurbani/QurbaniLocationSelector';
import QurbaniOrderSummary from '@/components/qurbani/QurbaniOrderSummary';
import QurbaniHistory from '@/components/qurbani/QurbaniHistory';
import { useAuth } from '@/hooks/useAuth';

const Qurbani = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [selectedShares, setSelectedShares] = useState(1);
  const [isPreorderMode, setIsPreorderMode] = useState(true);
  const [activeTab, setActiveTab] = useState('select');

  // Fetch current season settings
  const { data: seasonSettings } = useQuery({
    queryKey: ['qurbani-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qurbani_settings')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Check if we're in preorder or qurbani season
  useEffect(() => {
    if (seasonSettings) {
      const today = new Date();
      const qurbaniStart = new Date(seasonSettings.qurbani_start_date);
      const qurbaniEnd = new Date(seasonSettings.qurbani_end_date);
      
      const isQurbaniSeason = today >= qurbaniStart && today <= qurbaniEnd;
      setIsPreorderMode(!isQurbaniSeason);
    }
  }, [seasonSettings]);

  const handleAnimalSelect = (animal: any) => {
    setSelectedAnimal(animal);
    if (animal) {
      setActiveTab('summary');
    }
  };

  const handleOrderComplete = () => {
    setSelectedAnimal(null);
    setSelectedLocation(null);
    setSelectedShares(1);
    setActiveTab('history');
  };

  const daysUntilQurbani = seasonSettings ? 
    Math.max(0, Math.ceil((new Date(seasonSettings.qurbani_start_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50/30 to-teal-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Users className="h-10 w-10 text-emerald-600" />
            Qurbani {isPreorderMode ? 'Preorder' : 'Season'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {isPreorderMode 
              ? `Secure your Qurbani for the upcoming season. ${daysUntilQurbani} days until Qurbani begins.`
              : 'Qurbani season is here! Complete your sacrifice and feed those in need.'
            }
          </p>

          {/* Season Status */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge variant={isPreorderMode ? "secondary" : "default"} className="px-4 py-2">
              {isPreorderMode ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Preorder Mode
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Qurbani Season Active
                </>
              )}
            </Badge>
            
            {seasonSettings && (
              <Badge variant="outline" className="px-4 py-2">
                <CalendarDays className="h-4 w-4 mr-2" />
                {new Date(seasonSettings.qurbani_start_date).toLocaleDateString()} - {new Date(seasonSettings.qurbani_end_date).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8" />
                <div>
                  <p className="text-emerald-100">Locations</p>
                  <p className="text-2xl font-bold">15+</p>
                  <p className="text-sm text-emerald-100">Countries available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8" />
                <div>
                  <p className="text-blue-100">Impact</p>
                  <p className="text-2xl font-bold">7 People</p>
                  <p className="text-sm text-blue-100">Fed per animal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8" />
                <div>
                  <p className="text-purple-100">Trusted</p>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-purple-100">Halal certified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="select">Select Animal</TabsTrigger>
            <TabsTrigger value="location">Choose Location</TabsTrigger>
            <TabsTrigger value="summary">Order Summary</TabsTrigger>
            <TabsTrigger value="history">My Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="select">
            <QurbaniAnimalSelector
              selectedLocation={selectedLocation}
              selectedAnimal={selectedAnimal}
              onAnimalSelect={handleAnimalSelect}
              isPreorderMode={isPreorderMode}
            />
          </TabsContent>

          <TabsContent value="location">
            <QurbaniLocationSelector
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
              onNext={() => setActiveTab('select')}
            />
          </TabsContent>

          <TabsContent value="summary">
            <QurbaniOrderSummary
              selectedAnimal={selectedAnimal}
              selectedLocation={selectedLocation}
              selectedShares={selectedShares}
              onSharesChange={setSelectedShares}
              isPreorderMode={isPreorderMode}
              onOrderComplete={handleOrderComplete}
            />
          </TabsContent>

          <TabsContent value="history">
            <QurbaniHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Qurbani;
