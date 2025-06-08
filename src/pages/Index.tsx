
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  TrendingUp,
  Heart,
  Star,
  Trophy,
  MapPin,
  Clock,
  Target,
  Globe,
  Award,
  Activity,
  DollarSign,
  Zap,
  BookOpen,
  Calendar,
  MessageSquare,
  UserPlus,
  Gift,
  Sparkles,
  ChevronRight,
  Play,
  Coins
} from 'lucide-react';
import { FloatingDonationWidget } from '@/components/FloatingDonationWidget';
import { LiveDonationFeed } from '@/components/LiveDonationFeed';
import { CampaignsCarousel } from '@/components/CampaignsCarousel';
import { FundraisersCarousel } from '@/components/FundraisersCarousel';
import { Leaderboard } from '@/components/Leaderboard';
import { UserStats } from '@/components/UserStats';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/contexts/TranslationContext';

const Index = () => {
  const { user } = useAuth();
  const { t, currentLanguage } = useTranslation();

  console.log('Index page rendered with language:', currentLanguage);
  console.log('Translation test for "why_choose_title":', t('why_choose_title'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Donate Feels <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Great</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your charity into an engaging journey of giving, earning rewards, and building community impact
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              <Heart className="mr-2 h-5 w-5" />
              Start Donating
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-full font-semibold text-lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2.8M+</div>
              <div className="text-gray-600 text-sm">{t('active_donors')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">£45M+</div>
              <div className="text-gray-600 text-sm">{t('raised_today')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">127</div>
              <div className="text-gray-600 text-sm">{t('cities_competing')}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">98.9%</div>
              <div className="text-gray-600 text-sm">{t('satisfaction_rate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <Tabs defaultValue="campaigns" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="campaigns" className="rounded-xl font-semibold">{t('active_campaigns')}</TabsTrigger>
            <TabsTrigger value="fundraisers" className="rounded-xl font-semibold">{t('long_term_fundraisers')}</TabsTrigger>
            <TabsTrigger value="leaderboards" className="rounded-xl font-semibold">Leaderboards</TabsTrigger>
            <TabsTrigger value="stats" className="rounded-xl font-semibold">My Stats</TabsTrigger>
            <TabsTrigger value="live" className="rounded-xl font-semibold">Live Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <CampaignsCarousel />
          </TabsContent>

          <TabsContent value="fundraisers">
            <FundraisersCarousel />
          </TabsContent>

          <TabsContent value="leaderboards">
            <div className="grid gap-6 md:grid-cols-2">
              <Leaderboard />
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Weekly Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                      <div>
                        <h4 className="font-semibold">£100 Challenge</h4>
                        <p className="text-sm text-gray-600">Donate £100 this week</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">£67 / £100</div>
                        <Progress value={67} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <UserStats />
          </TabsContent>

          <TabsContent value="live">
            <LiveDonationFeed />
          </TabsContent>
        </Tabs>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('why_choose_title')}
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('why_choose_subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('gamified_giving')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('gamified_giving_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('league_tables')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('league_tables_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('live_impact')}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('live_impact_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Impact Stats */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('community_impact')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="text-emerald-100">{t('active_donors')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">£247,891</div>
              <div className="text-emerald-100">{t('raised_today')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">156</div>
              <div className="text-emerald-100">{t('cities_competing')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98.9%</div>
              <div className="text-emerald-100">{t('satisfaction_rate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Feed Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('live_impact_feed')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('real_time_activity')}
            </p>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  {t('live_now')}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{t('all')}</Badge>
                  <Badge variant="outline">{t('donations')}</Badge>
                  <Badge variant="outline">{t('honoring')}</Badge>
                  <Badge variant="outline">{t('jannah')}</Badge>
                  <Badge variant="outline">{t('awards')}</Badge>
                  <Badge variant="outline">{t('updates')}</Badge>
                  <Badge variant="outline">{t('messages')}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LiveDonationFeed />
            </CardContent>
          </Card>
        </div>
      </section>

      <FloatingDonationWidget />
    </div>
  );
};

export default Index;
