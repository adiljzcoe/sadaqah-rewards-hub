
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2 } from 'lucide-react';

const LiveVideo = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        {/* Placeholder for video - would be YouTube embed in real implementation */}
        <div className="text-center text-white">
          <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-semibold mb-2">Live: Emergency Relief for Gaza</h3>
          <p className="text-gray-300">Providing urgent aid to families in need</p>
        </div>

        {/* Live Badge */}
        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          LIVE
        </Badge>

        {/* Viewer Count */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center text-white text-sm">
            <Users className="h-4 w-4 mr-1" />
            1,247 viewers
          </div>
        </div>

        {/* Donation Overlays - Animated */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-8 animate-bounce">
            <div className="bg-islamic-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              £50 🍽️ Hot Meals
            </div>
          </div>
          <div className="absolute top-32 right-12 animate-pulse">
            <div className="bg-sadaqah-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              £100 💧 Water Wells
            </div>
          </div>
          <div className="absolute bottom-20 left-16 animate-bounce delay-1000">
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              £25 📚 Education
            </div>
          </div>
        </div>

        {/* Call to Action Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-islamic-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-islamic-green-800 mb-1">Help Families Today</h4>
                <p className="text-sm text-gray-600">Your donation provides immediate relief</p>
              </div>
              <Button className="bg-islamic-green-600 hover:bg-islamic-green-700">
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-islamic-green-700">£12,450</span> raised today
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
