
import React from 'react';
import AdhanUploader from '@/components/islamic-calendar/AdhanUploader';
import { Toaster } from '@/components/ui/toaster';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Users, Heart, Trophy, Calendar } from 'lucide-react';

const AdhanCommunity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Adhan Community
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Share your beautiful Adhan recordings with the global Muslim community. 
            The top 5 voted Adhan each month will be featured in our Islamic calendar celebrations.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Community Driven</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Vote for Favorites</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Monthly Winners</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Featured in Events</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Mic className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">127</div>
              <div className="text-sm opacity-90">Total Recordings</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm opacity-90">Contributors</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">2.1K</div>
              <div className="text-sm opacity-90">Total Votes</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">15.7K</div>
              <div className="text-sm opacity-90">Total Listens</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Adhan Upload Component */}
        <AdhanUploader />

        {/* Inspirational Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "And when the call to prayer is made, then remember Allah much, that you may be successful."
              </h3>
              <p className="text-lg opacity-90">- Quran 62:10</p>
            </div>
          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdhanCommunity;
