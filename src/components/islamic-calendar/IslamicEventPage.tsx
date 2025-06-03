
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import DonationWidget from '@/components/DonationWidget';
import NotificationScheduler from './NotificationScheduler';
import CelebrationEffects from './CelebrationEffects';
import CelebrationBanner from './CelebrationBanner';
import AmazingCelebrationButton from './AmazingCelebrationButton';
import AmazingCelebrationEffects from './AmazingCelebrationEffects';
import CelebrationToggle from './CelebrationToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Heart, Gift, Users, Star, Clock, Sparkles, PartyPopper } from 'lucide-react';
import { getEventBySlug, getDaysUntilEvent, formatIslamicDate } from '@/utils/islamicCalendar';
import CountdownTimer from './CountdownTimer';

const IslamicEventPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [amazingCelebrationActive, setAmazingCelebrationActive] = useState(false);
  const [celebrationPaused, setCelebrationPaused] = useState(false);
  
  if (!slug) {
    return <Navigate to="/islamic-calendar" replace />;
  }

  const event = getEventBySlug(slug);
  
  if (!event) {
    return <Navigate to="/islamic-calendar" replace />;
  }

  const daysUntil = getDaysUntilEvent(event.gregorianDate);
  const isToday = daysUntil === 0;
  const isPast = daysUntil < 0;
  const isUpcoming = daysUntil > 0 && daysUntil <= 30;

  const getTypeIcon = () => {
    switch (event.type) {
      case 'prayer': return <Star className="h-6 w-6" />;
      case 'fasting': return '🌙';
      case 'celebration': return '🎉';
      case 'worship': return '📿';
      case 'pilgrimage': return '🕋';
      case 'commemoration': return '🕌';
      default: return <Calendar className="h-6 w-6" />;
    }
  };

  const handleCelebrate = () => {
    // Create a celebration effect
    const celebrateText = isToday 
      ? `🎉 Celebrating ${event.title} today! 🎉` 
      : `✨ May Allah bless this sacred day of ${event.title} ✨`;
    
    alert(celebrateText);
    
    // You could also trigger confetti, sound effects, or other celebration animations here
    console.log(`Celebrating ${event.title}!`);
  };

  const handleToggleCelebration = () => {
    setAmazingCelebrationActive(!amazingCelebrationActive);
    if (amazingCelebrationActive) {
      setCelebrationPaused(false); // Reset pause state when stopping
    }
  };

  const handlePauseCelebration = () => {
    setCelebrationPaused(!celebrationPaused);
  };

  const handleAmazingCelebration = () => {
    setAmazingCelebrationActive(true);
    setCelebrationPaused(false);
    
    // Also trigger the original celebration
    handleCelebrate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Regular Celebration Effects - Always Active */}
      <CelebrationEffects />
      
      {/* Amazing Celebration Effects - Controlled by user */}
      <AmazingCelebrationEffects 
        isActive={amazingCelebrationActive} 
        eventTitle={event.title}
        isPaused={celebrationPaused}
      />
      
      {/* Celebration Toggle Controls */}
      <CelebrationToggle 
        isActive={amazingCelebrationActive}
        isPaused={celebrationPaused}
        onToggle={handleToggleCelebration}
        onPause={handlePauseCelebration}
      />
      
      {/* Special Banner for Today's Events */}
      <CelebrationBanner eventTitle={event.title} isToday={isToday} />
      
      <Header />
      
      <div className={`container mx-auto px-4 py-8 ${isToday ? 'pt-24' : ''} pb-24`}>
        {/* Enhanced Hero Section with Amazing Celebration Button */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white mb-8">
          {/* Background celebration pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-yellow-300 rounded-full animate-ping" />
            <div className="absolute top-8 right-8 w-6 h-6 border-2 border-pink-300 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-8 w-10 h-10 border-2 border-green-300 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-8 right-4 w-8 h-8 border-2 border-blue-300 rounded-full animate-bounce" />
          </div>
          
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-full text-4xl ${event.color} ${isToday ? 'animate-celebration-bounce' : ''}`}>
                {typeof getTypeIcon() === 'string' ? getTypeIcon() : <span className="text-white">{getTypeIcon()}</span>}
              </div>
              <div>
                <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${isToday ? 'animate-pulse' : ''}`}>
                  {event.title}
                  {isToday && <span className="ml-4 animate-bounce">🌟</span>}
                </h1>
                <p className="text-xl opacity-90">{formatIslamicDate(event.islamicDate)}</p>
                <p className="text-lg opacity-80">
                  {event.gregorianDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {event.type.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
                {event.significance} significance
              </Badge>
              {isToday && (
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-bounce shadow-lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  🌟 Today! 🌟
                  <Sparkles className="h-4 w-4 ml-2" />
                </Badge>
              )}
              {isUpcoming && (
                <Badge variant="outline" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
                  <Clock className="h-4 w-4 mr-2" />
                  {daysUntil} days remaining
                </Badge>
              )}
            </div>
            
            <p className="text-xl leading-relaxed mb-6">{event.description}</p>

            {/* Enhanced Celebration Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Amazing Celebration Button - Main CTA */}
              <AmazingCelebrationButton 
                eventTitle={event.title}
                onCelebrate={handleAmazingCelebration}
              />
              
              {/* Original celebration button as secondary */}
              <Button 
                onClick={handleCelebrate}
                size="lg"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 backdrop-blur-sm"
              >
                <Heart className="h-5 w-5 mr-2" />
                Simple Celebration
                <Sparkles className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Countdown with Amazing Button */}
            {!isPast && (
              <div className={`${isToday ? 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600' : 'bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600'} rounded-2xl p-1`}>
                <div className="bg-white rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center gap-2">
                    <Clock className="h-6 w-6" />
                    {isToday ? '🎉 Celebrating Today! 🎉' : 'Sacred Countdown'}
                    {isToday && <Sparkles className="h-6 w-6 animate-spin text-yellow-500" />}
                  </h2>
                  <CountdownTimer event={event} />
                  
                  {/* Amazing Celebration Button in countdown section */}
                  <div className="mt-6 text-center">
                    <AmazingCelebrationButton 
                      eventTitle={event.title}
                      onCelebrate={handleAmazingCelebration}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Spiritual Preparation Card */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Star className="h-5 w-5" />
                  Spiritual Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 mb-4">
                  Prepare your heart and soul for this blessed occasion. Every moment leading to {event.title} is an opportunity for spiritual growth and connection with Allah.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🤲</div>
                    <p className="font-semibold text-amber-800">Make Dua</p>
                    <p className="text-sm text-amber-600">Increase your prayers</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">📖</div>
                    <p className="font-semibold text-amber-800">Read Quran</p>
                    <p className="text-sm text-amber-600">Reflect on verses</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">💝</div>
                    <p className="font-semibold text-amber-800">Give Charity</p>
                    <p className="text-sm text-amber-600">Share your blessings</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">👥</div>
                    <p className="font-semibold text-amber-800">Connect</p>
                    <p className="text-sm text-amber-600">Strengthen bonds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  About This Sacred Day
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  {event.detailedDescription}
                </p>
              </CardContent>
            </Card>

            {/* Traditions */}
            {event.traditions && event.traditions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Islamic Traditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {event.traditions.map((tradition, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{tradition}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Community Impact */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Users className="h-5 w-5" />
                  Make This Day Special for Others
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 mb-6">
                  Your generosity can help orphans, widows, and families in need celebrate this blessed day. 
                  Share the joy and blessings of {event.title} with those who need it most.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🍽️</div>
                    <p className="font-semibold text-amber-800">Feed the Hungry</p>
                    <p className="text-sm text-amber-600">Provide festive meals</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🎁</div>
                    <p className="font-semibold text-amber-800">Gift to Orphans</p>
                    <p className="text-sm text-amber-600">Bring joy to children</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">👥</div>
                    <p className="font-semibold text-amber-800">Community Support</p>
                    <p className="text-sm text-amber-600">Help families celebrate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notification Scheduler */}
            <NotificationScheduler 
              eventId={event.id}
              eventTitle={event.title}
              eventDate={event.gregorianDate}
            />

            {/* Main Donation Widget */}
            <DonationWidget 
              title={`Support ${event.title}`}
              description="Help others celebrate this blessed day"
              defaultAmount={25}
            />

            {/* Special Donation Options */}
            <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Gift className="h-5 w-5" />
                  Special Giving Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.donationCauses?.map((cause, index) => (
                  <div key={index}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-emerald-200 hover:bg-emerald-50"
                    >
                      <Heart className="h-4 w-4 mr-2 text-emerald-600" />
                      {cause}
                    </Button>
                    {index < event.donationCauses!.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions with Amazing Button */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AmazingCelebrationButton 
                  eventTitle={event.title}
                  onCelebrate={handleAmazingCelebration}
                />
                <Button 
                  onClick={handleCelebrate}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Simple Celebration
                  <Sparkles className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Share with Community
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicEventPage;
