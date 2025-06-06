
import React from 'react';
import Header from '@/components/Header';
import BusinessLeagueSystem from '@/components/BusinessLeagueSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Building2, Coins, Users, Star, TrendingUp } from 'lucide-react';

const BusinessLeagues = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <h1 className="text-4xl font-bold">Business Charity Leagues</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join the Premier League of corporate philanthropy. Compete with other businesses 
            in tiered leagues, pay monthly to participate, and climb the tables through charitable giving.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Building2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Active Businesses</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Coins className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">£2.4M</div>
              <div className="text-sm text-gray-600">Monthly Donations</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">League Tiers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <div className="text-sm text-gray-600">Engagement Rate</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              How the League System Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="font-semibold mb-2">1. Pay Monthly Subscription</h3>
                <p className="text-sm text-gray-600">
                  Choose your league tier and pay the monthly fee to participate. 
                  Higher tiers offer more benefits and networking opportunities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-semibold mb-2">2. Donate to Charity</h3>
                <p className="text-sm text-gray-600">
                  Make charitable donations throughout the month. Your donation amounts 
                  determine your position on the league table.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold mb-2">3. Compete & Get Promoted</h3>
                <p className="text-sm text-gray-600">
                  Climb the table through giving. Top performers get promoted to higher leagues 
                  with better benefits. Poor performance risks relegation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main League System */}
        <BusinessLeagueSystem />
      </div>
    </div>
  );
};

export default BusinessLeagues;
