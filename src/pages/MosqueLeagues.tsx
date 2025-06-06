
import React from 'react';
import Header from '@/components/Header';
import MosqueLeagueSystem from '@/components/MosqueLeagueSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Building2, Heart, Users, Calendar, Target } from 'lucide-react';

const MosqueLeagues = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-12 w-12 text-orange-500" />
            <h1 className="text-4xl font-bold">Mosque & Madrassah Leagues</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Free sports leagues for mosques and madrassahs competing in football and cricket, 
            plus separate charity fundraising competitions with sports performance bonuses.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Building2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">25+</div>
              <div className="text-sm text-gray-600">Participating Mosques</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Trophy className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">40+</div>
              <div className="text-sm text-gray-600">Active Teams</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">£35K</div>
              <div className="text-sm text-gray-600">Charity Raised</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2024-25</div>
              <div className="text-sm text-gray-600">Current Season</div>
            </div>
          </div>
        </div>

        {/* League Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Why Join the Leagues?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-orange-600">🏆 Sports Leagues</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Completely free entry for all teams
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Traditional league tables based on match results
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Build community connections through sport
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Separate football and cricket competitions
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3 text-red-600">💰 Charity Leagues</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Compete to raise the most for charity
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Sports success gives fundraising bonuses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Make a real difference in your community
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Monthly and seasonal competitions
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main League System */}
        <MosqueLeagueSystem />
      </div>
    </div>
  );
};

export default MosqueLeagues;
