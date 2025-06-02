import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Heart, Send, Users, MessageCircle, Star, Clock, Lock, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Dua {
  id: string;
  content: string;
  is_anonymous: boolean;
  ameen_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  };
  user_has_said_ameen?: boolean;
}

const DuaWall = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [newDua, setNewDua] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isPaidMember, setIsPaidMember] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setCheckingSubscription(false);
        return;
      }

      try {
        // Mock subscription check - replace with actual subscription logic
        // For now, we'll assume users with certain conditions are paid members
        const mockIsPaid = user.email?.includes('premium') || user.user_metadata?.subscription === 'premium';
        setIsPaidMember(!!mockIsPaid);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsPaidMember(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, [user]);

  const fetchDuas = async () => {
    if (!isPaidMember) {
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching duas...');
      
      // Mock data for demonstration
      const mockDuas: Dua[] = [
        {
          id: '1',
          content: 'May Allah grant ease to all those facing difficulties. Ameen.',
          is_anonymous: false,
          ameen_count: 15,
          created_at: new Date().toISOString(),
          user_id: 'user1',
          profiles: { full_name: 'Ahmad Khan' },
          user_has_said_ameen: false
        },
        {
          id: '2',
          content: 'Ya Allah, please bless our ummah with unity and peace.',
          is_anonymous: true,
          ameen_count: 23,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user_id: 'user2',
          user_has_said_ameen: true
        }
      ];

      setDuas(mockDuas);
    } catch (error) {
      console.error('Error fetching duas:', error);
      toast({
        title: "Error",
        description: "Failed to load prayers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitDua = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to share a prayer",
        variant: "destructive",
      });
      return;
    }

    if (!newDua.trim()) {
      toast({
        title: "Empty Prayer",
        description: "Please write your prayer before submitting",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      console.log('Submitting dua:', { content: newDua, isAnonymous });
      
      // Mock submission for now
      const newDuaObj: Dua = {
        id: Date.now().toString(),
        content: newDua.trim(),
        is_anonymous: isAnonymous,
        ameen_count: 0,
        created_at: new Date().toISOString(),
        user_id: user.id,
        profiles: isAnonymous ? undefined : { full_name: user.user_metadata?.full_name || 'Anonymous' },
        user_has_said_ameen: false
      };

      setDuas(prev => [newDuaObj, ...prev]);
      setNewDua('');
      
      toast({
        title: "Prayer Shared! 🤲",
        description: "Your prayer has been added to the wall. May Allah accept it!",
      });
    } catch (error) {
      console.error('Error submitting dua:', error);
      toast({
        title: "Error",
        description: "Failed to share prayer",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const sayAmeen = async (duaId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to say Ameen",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Saying ameen to dua:', duaId);
      
      // Update the dua in the local state
      setDuas(prev => prev.map(dua => 
        dua.id === duaId 
          ? { ...dua, ameen_count: dua.ameen_count + 1, user_has_said_ameen: true }
          : dua
      ));
      
      toast({
        title: "Ameen! 🤲",
        description: "Your support has been added to this prayer",
      });
    } catch (error) {
      console.error('Error saying ameen:', error);
      toast({
        title: "Error",
        description: "Failed to say Ameen",
        variant: "destructive",
      });
    }
  };

  const removeAmeen = async (duaId: string) => {
    if (!user) return;

    try {
      console.log('Removing ameen from dua:', duaId);
      
      setDuas(prev => prev.map(dua => 
        dua.id === duaId 
          ? { ...dua, ameen_count: Math.max(0, dua.ameen_count - 1), user_has_said_ameen: false }
          : dua
      ));
    } catch (error) {
      console.error('Error removing ameen:', error);
    }
  };

  useEffect(() => {
    if (!checkingSubscription) {
      fetchDuas();
    }
  }, [user, isPaidMember, checkingSubscription]);

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

  // Show loading state while checking subscription
  if (checkingSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking access...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show premium required message for non-paid members
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <MessageCircle className="h-10 w-10 text-blue-600" />
              Du'a Wall
            </h1>
          </div>

          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Authentication Required</h3>
              <p className="text-gray-500 mb-6">Please log in to access the Du'a Wall community feature.</p>
              <Button onClick={() => window.location.href = '/auth'} className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isPaidMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <MessageCircle className="h-10 w-10 text-blue-600" />
              Du'a Wall
            </h1>
          </div>

          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <Crown className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Premium Feature</h3>
              <p className="text-gray-500 mb-6">
                The Du'a Wall is an exclusive feature for premium members. Join our community to share prayers 
                and support fellow believers with your Ameen.
              </p>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Premium Benefits Include:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Share and read community prayers</li>
                  <li>• Support others with Ameen responses</li>
                  <li>• Anonymous posting option</li>
                  <li>• Connect with believers worldwide</li>
                </ul>
              </div>
              <Button onClick={() => window.location.href = '/membership'} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <MessageCircle className="h-10 w-10 text-blue-600" />
            Du'a Wall
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your prayers with the community and support others with your Ameen. 
            Together we strengthen our connection with Allah and each other.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Prayers</p>
                  <p className="text-3xl font-bold">{duas.length}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Ameens</p>
                  <p className="text-3xl font-bold">
                    {duas.reduce((sum, dua) => sum + dua.ameen_count, 0)}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Community</p>
                  <p className="text-3xl font-bold">United</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit New Dua */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Share Your Prayer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your du'a here... Allah is listening 🤲"
              value={newDua}
              onChange={(e) => setNewDua(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous" className="text-sm text-gray-600">
                  Share anonymously
                </Label>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {newDua.length}/500
                </span>
                <Button 
                  onClick={submitDua}
                  disabled={submitting || !newDua.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitting ? 'Sharing...' : 'Share Prayer'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duas List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prayers...</p>
            </div>
          ) : duas.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No prayers yet</h3>
                <p className="text-gray-500">Be the first to share a prayer with the community!</p>
              </CardContent>
            </Card>
          ) : (
            duas.map((dua) => (
              <Card key={dua.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {dua.is_anonymous ? 'Anonymous' : dua.profiles?.full_name || 'Community Member'}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(dua.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 text-lg leading-relaxed mb-4 italic">
                    "{dua.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {dua.ameen_count} {dua.ameen_count === 1 ? 'Ameen' : 'Ameens'}
                      </span>
                    </div>
                    
                    {user && (
                      <Button
                        size="sm"
                        variant={dua.user_has_said_ameen ? "default" : "outline"}
                        onClick={() => dua.user_has_said_ameen ? removeAmeen(dua.id) : sayAmeen(dua.id)}
                        className={dua.user_has_said_ameen ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${dua.user_has_said_ameen ? 'fill-current' : ''}`} />
                        {dua.user_has_said_ameen ? 'Ameen Said' : 'Say Ameen'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DuaWall;
