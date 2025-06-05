
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageCircle, Crown, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import DuaCard from './DuaCard';
import DuaRecorder from './DuaRecorder';

interface Dua {
  id: string;
  title: string;
  description: string | null;
  audio_url: string;
  audio_duration: number | null;
  is_anonymous: boolean;
  ameen_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
  } | null;
  user_has_said_ameen?: boolean;
}

const DuaFeed: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Check if user is premium member
  const checkPremiumStatus = async () => {
    if (!user) {
      setCheckingSubscription(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('subscribed')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking subscription:', error);
      }

      setIsPremium(data?.subscribed || false);
    } catch (error) {
      console.error('Error checking premium status:', error);
      setIsPremium(false);
    } finally {
      setCheckingSubscription(false);
    }
  };

  const fetchDuas = async () => {
    try {
      console.log('Fetching duas...');
      
      // First, fetch duas without profiles to avoid relation issues
      const { data: duasData, error: duasError } = await supabase
        .from('duas')
        .select(`
          id,
          title,
          description,
          audio_url,
          audio_duration,
          is_anonymous,
          ameen_count,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (duasError) {
        console.error('Error fetching duas:', duasError);
        throw duasError;
      }

      if (!duasData) {
        setDuas([]);
        return;
      }

      // Get unique user IDs to fetch profiles
      const userIds = [...new Set(duasData.map(dua => dua.user_id))];
      
      // Fetch profiles separately
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      // Create a map of user_id to profile
      const profilesMap = new Map();
      profilesData?.forEach(profile => {
        profilesMap.set(profile.id, profile);
      });

      // Check if user has said ameen for each dua
      let userAmeenDuaIds = new Set();
      if (user && duasData.length > 0) {
        const duaIds = duasData.map(dua => dua.id);
        const { data: ameenData } = await supabase
          .from('dua_ameens')
          .select('dua_id')
          .eq('user_id', user.id)
          .in('dua_id', duaIds);

        userAmeenDuaIds = new Set(ameenData?.map(a => a.dua_id) || []);
      }

      // Combine the data
      const duasWithProfiles = duasData.map(dua => ({
        ...dua,
        profiles: profilesMap.get(dua.user_id) || null,
        user_has_said_ameen: userAmeenDuaIds.has(dua.id)
      }));

      setDuas(duasWithProfiles);
    } catch (error) {
      console.error('Error fetching duas:', error);
      toast({
        title: "Error Loading Du'as",
        description: "Could not load the du'a feed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAmeenUpdate = (duaId: string, newCount: number, userHasAmeen: boolean) => {
    setDuas(prev => prev.map(dua => 
      dua.id === duaId 
        ? { ...dua, ameen_count: newCount, user_has_said_ameen: userHasAmeen }
        : dua
    ));
  };

  const handleDuaCreated = () => {
    fetchDuas();
    toast({
      title: "Du'a Shared Successfully! 🤲",
      description: "Your du'a is now part of the global Ummah feed.",
    });
  };

  useEffect(() => {
    checkPremiumStatus();
  }, [user]);

  useEffect(() => {
    if (!checkingSubscription) {
      fetchDuas();
    }
  }, [user, checkingSubscription]);

  if (checkingSubscription) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading du'a feed...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recording Section for Premium Users */}
      {user && isPremium && (
        <DuaRecorder onDuaCreated={handleDuaCreated} />
      )}

      {/* Premium Upgrade Message for Non-Premium Users */}
      {user && !isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Record Your Du'a
            </h3>
            <p className="text-gray-600 mb-4">
              Become a premium member to record and share your du'as with the global Ummah.
            </p>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Login Message for Non-Authenticated Users */}
      {!user && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Lock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Join the Du'a Community
            </h3>
            <p className="text-gray-600 mb-4">
              Sign in to say Ameen to du'as and support your fellow believers.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In to Participate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Community Du'as
          </h2>
        </div>
        <Button
          onClick={fetchDuas}
          variant="outline"
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Du'a Feed */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading du'as...</p>
        </div>
      ) : duas.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Du'as Yet</h3>
            <p className="text-gray-500">
              Be the first to share a du'a with the community!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {duas.map((dua) => (
            <DuaCard
              key={dua.id}
              dua={dua}
              onAmeenUpdate={handleAmeenUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DuaFeed;
