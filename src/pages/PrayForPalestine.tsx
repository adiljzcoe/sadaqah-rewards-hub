
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Heart, Send, Users, MessageCircle, Star, Clock, Coins, HandHeart, Home, Stethoscope, GraduationCap, Baby, Utensils, Shield, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useDonations } from '@/hooks/useDonations';
import { useProfile } from '@/hooks/useProfile';

interface PalestineDua {
  id: string;
  content: string;
  cause: string;
  donationAmount?: number;
  sadaqahCoinsUsed?: number;
  isAnonymous: boolean;
  createdAt: string;
  userName?: string;
  jannahPointsEarned: number;
}

interface PalestineCause {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  urgency: 'high' | 'medium' | 'low';
  fundsNeeded: number;
  fundsRaised: number;
}

const PrayForPalestine = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createDonation, isCreatingDonation } = useDonations();
  const { profile } = useProfile();
  
  const [newDua, setNewDua] = useState('');
  const [selectedCause, setSelectedCause] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [sadaqahCoinsToUse, setSadaqahCoinsToUse] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [duas, setDuas] = useState<PalestineDua[]>([
    {
      id: '1',
      content: 'Ya Allah, grant victory to our brothers and sisters in Palestine. Give them strength, patience, and relief from their suffering. Ameen.',
      cause: 'medical-aid',
      donationAmount: 25,
      isAnonymous: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      userName: 'Ahmad Khan',
      jannahPointsEarned: 350
    },
    {
      id: '2',
      content: 'Allahumma, protect the children of Gaza and provide them with safety, food, and shelter. Ya Rabb, ease their pain and grant them peace.',
      cause: 'emergency-shelter',
      sadaqahCoinsUsed: 100,
      isAnonymous: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      jannahPointsEarned: 150
    }
  ]);

  const palestineCauses: PalestineCause[] = [
    {
      id: 'medical-aid',
      name: 'Medical Aid & Healthcare',
      description: 'Emergency medical supplies, hospitals, and healthcare for the injured',
      icon: Stethoscope,
      color: 'bg-red-500',
      urgency: 'high',
      fundsNeeded: 500000,
      fundsRaised: 342000
    },
    {
      id: 'emergency-shelter',
      name: 'Emergency Shelter & Housing',
      description: 'Temporary shelters, rebuilding homes, and safe accommodation',
      icon: Home,
      color: 'bg-blue-500',
      urgency: 'high',
      fundsNeeded: 750000,
      fundsRaised: 456000
    },
    {
      id: 'food-water',
      name: 'Food & Clean Water',
      description: 'Emergency food packages, clean water, and nutritional support',
      icon: Utensils,
      color: 'bg-green-500',
      urgency: 'high',
      fundsNeeded: 300000,
      fundsRaised: 198000
    },
    {
      id: 'education',
      name: 'Education & Schools',
      description: 'Rebuilding schools, educational materials, and supporting teachers',
      icon: GraduationCap,
      color: 'bg-purple-500',
      urgency: 'medium',
      fundsNeeded: 200000,
      fundsRaised: 89000
    },
    {
      id: 'children-families',
      name: 'Children & Families',
      description: 'Support for orphaned children and vulnerable families',
      icon: Baby,
      color: 'bg-pink-500',
      urgency: 'high',
      fundsNeeded: 400000,
      fundsRaised: 267000
    },
    {
      id: 'protection-legal',
      name: 'Protection & Legal Aid',
      description: 'Legal support, human rights documentation, and protection services',
      icon: Shield,
      color: 'bg-orange-500',
      urgency: 'medium',
      fundsNeeded: 150000,
      fundsRaised: 76000
    }
  ];

  const getCauseById = (id: string) => palestineCauses.find(cause => cause.id === id);

  const submitDuaAndDonation = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to share a prayer and donate",
        variant: "destructive",
      });
      return;
    }

    if (!newDua.trim()) {
      toast({
        title: "Prayer Required",
        description: "Please write your prayer for Palestine",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCause) {
      toast({
        title: "Cause Required",
        description: "Please select a Palestine cause to support",
        variant: "destructive",
      });
      return;
    }

    const donationAmountNum = parseFloat(donationAmount) || 0;
    const sadaqahCoinsNum = parseInt(sadaqahCoinsToUse) || 0;

    if (donationAmountNum === 0 && sadaqahCoinsNum === 0) {
      toast({
        title: "Donation Required",
        description: "Please enter either a donation amount or Sadaqah coins to use",
        variant: "destructive",
      });
      return;
    }

    if (sadaqahCoinsNum > 0 && (!profile || profile.sadaqah_coins < sadaqahCoinsNum)) {
      toast({
        title: "Insufficient Sadaqah Coins",
        description: `You only have ${profile?.sadaqah_coins || 0} Sadaqah coins available`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Calculate Jannah points: prayer (50) + donation (10 per £1) + sadaqah coins (2 per coin)
      const jannahPoints = 50 + (donationAmountNum * 10) + (sadaqahCoinsNum * 2);

      // Create donation if there's a monetary amount
      if (donationAmountNum > 0) {
        // In a real implementation, this would create an actual donation
        console.log('Creating donation:', {
          amount: donationAmountNum,
          cause: selectedCause,
          message: `Prayer for Palestine: ${newDua.substring(0, 100)}...`
        });
      }

      // Add the new dua to the list
      const newDuaObj: PalestineDua = {
        id: Date.now().toString(),
        content: newDua.trim(),
        cause: selectedCause,
        donationAmount: donationAmountNum > 0 ? donationAmountNum : undefined,
        sadaqahCoinsUsed: sadaqahCoinsNum > 0 ? sadaqahCoinsNum : undefined,
        isAnonymous: isAnonymous,
        createdAt: new Date().toISOString(),
        userName: isAnonymous ? undefined : user.user_metadata?.full_name || 'Anonymous',
        jannahPointsEarned: jannahPoints
      };

      setDuas(prev => [newDuaObj, ...prev]);

      // Reset form
      setNewDua('');
      setSelectedCause('');
      setDonationAmount('');
      setSadaqahCoinsToUse('');

      toast({
        title: "Prayer & Donation Submitted! 🤲",
        description: `Your prayer has been shared and you've earned ${jannahPoints} Jannah points. May Allah accept your dua and donation for Palestine.`,
      });
    } catch (error) {
      console.error('Error submitting prayer and donation:', error);
      toast({
        title: "Error",
        description: "Failed to submit prayer and donation",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Heart className="h-10 w-10 text-red-500" />
              Pray for Palestine
            </h1>
          </div>

          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Authentication Required</h3>
              <p className="text-gray-500 mb-6">Please log in to share prayers and donate to Palestine causes.</p>
              <Button onClick={() => window.location.href = '/auth'} className="bg-green-600 hover:bg-green-700">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-red-500" />
            Pray for Palestine 🇵🇸
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your prayers and support Palestine through donations. Every dua matters, every donation helps. 
            Earn Jannah points while making a real difference.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Your Jannah Points</p>
                  <p className="text-3xl font-bold">{profile?.jannah_points || 0}</p>
                </div>
                <Crown className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Sadaqah Coins</p>
                  <p className="text-3xl font-bold">{profile?.sadaqah_coins || 0}</p>
                </div>
                <Coins className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Total Donated</p>
                  <p className="text-3xl font-bold">£{profile?.total_donated || 0}</p>
                </div>
                <HandHeart className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Palestine Causes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Palestine Causes - Choose Your Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {palestineCauses.map((cause) => {
                const Icon = cause.icon;
                const progressPercentage = (cause.fundsRaised / cause.fundsNeeded) * 100;
                
                return (
                  <div key={cause.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${cause.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{cause.name}</h3>
                        <Badge className={getUrgencyColor(cause.urgency)} variant="secondary">
                          {cause.urgency} priority
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{cause.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Raised: £{cause.fundsRaised.toLocaleString()}</span>
                        <span>Goal: £{cause.fundsNeeded.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${cause.color.replace('bg-', 'bg-')}`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{progressPercentage.toFixed(1)}% funded</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Prayer and Donation Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Share Your Prayer & Make a Donation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cause Selection */}
            <div>
              <Label htmlFor="cause">Select Palestine Cause *</Label>
              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a cause to support..." />
                </SelectTrigger>
                <SelectContent>
                  {palestineCauses.map((cause) => {
                    const Icon = cause.icon;
                    return (
                      <SelectItem key={cause.id} value={cause.id}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {cause.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Prayer Text */}
            <div>
              <Label htmlFor="prayer">Your Prayer for Palestine *</Label>
              <Textarea
                id="prayer"
                placeholder="Write your dua for Palestine... May Allah grant them victory and peace. Ameen. 🤲"
                value={newDua}
                onChange={(e) => setNewDua(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {newDua.length}/500
              </div>
            </div>

            {/* Donation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donation">Monetary Donation (£)</Label>
                <Input
                  id="donation"
                  type="number"
                  placeholder="25.00"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-green-600 mt-1">Earn 10 Jannah points per £1</p>
              </div>

              <div>
                <Label htmlFor="sadaqah-coins">
                  Use Sadaqah Coins (Available: {profile?.sadaqah_coins || 0})
                </Label>
                <Input
                  id="sadaqah-coins"
                  type="number"
                  placeholder="50"
                  value={sadaqahCoinsToUse}
                  onChange={(e) => setSadaqahCoinsToUse(e.target.value)}
                  min="0"
                  max={profile?.sadaqah_coins || 0}
                />
                <p className="text-xs text-blue-600 mt-1">Earn 2 Jannah points per coin used</p>
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous" className="text-sm text-gray-600">
                Share prayer anonymously
              </Label>
            </div>

            {/* Rewards Preview */}
            {(newDua || donationAmount || sadaqahCoinsToUse) && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Jannah Points You'll Earn:</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  {newDua && <div>• Prayer for Palestine: +50 points</div>}
                  {donationAmount && <div>• Donation (£{donationAmount}): +{(parseFloat(donationAmount) * 10) || 0} points</div>}
                  {sadaqahCoinsToUse && <div>• Sadaqah Coins ({sadaqahCoinsToUse}): +{(parseInt(sadaqahCoinsToUse) * 2) || 0} points</div>}
                  <div className="font-bold border-t border-yellow-300 pt-1 mt-2">
                    Total: +{50 + ((parseFloat(donationAmount) || 0) * 10) + ((parseInt(sadaqahCoinsToUse) || 0) * 2)} Jannah Points
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              onClick={submitDuaAndDonation}
              disabled={submitting || !newDua.trim() || !selectedCause}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              {submitting ? 'Submitting...' : 'Share Prayer & Donate'}
            </Button>
          </CardContent>
        </Card>

        {/* Community Prayers */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-green-600" />
            Community Prayers for Palestine
          </h2>

          {duas.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No prayers yet</h3>
                <p className="text-gray-500">Be the first to share a prayer for Palestine!</p>
              </CardContent>
            </Card>
          ) : (
            duas.map((dua) => {
              const cause = getCauseById(dua.cause);
              const CauseIcon = cause?.icon || Heart;
              
              return (
                <Card key={dua.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${cause?.color || 'bg-gray-500'} text-white`}>
                          <CauseIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {dua.isAnonymous ? 'Anonymous' : dua.userName || 'Community Member'}
                          </Badge>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {cause?.name || 'Palestine Support'}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {formatTimeAgo(dua.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Crown className="h-4 w-4" />
                          <span className="font-semibold">+{dua.jannahPointsEarned}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 text-lg leading-relaxed mb-4 italic">
                      "{dua.content}"
                    </p>
                    
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {dua.donationAmount && (
                          <div className="flex items-center gap-1">
                            <HandHeart className="h-4 w-4 text-green-600" />
                            <span>£{dua.donationAmount} donated</span>
                          </div>
                        )}
                        {dua.sadaqahCoinsUsed && (
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-blue-600" />
                            <span>{dua.sadaqahCoinsUsed} coins used</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm font-medium text-yellow-700">
                        {dua.jannahPointsEarned} Jannah Points Earned
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayForPalestine;
