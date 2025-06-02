
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Heart, Send, Users, MessageCircle, Star, Clock } from 'lucide-react';
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

  const fetchDuas = async () => {
    try {
      const { data, error } = await supabase
        .from('duas')
        .select(`
          *,
          profiles(full_name),
          dua_ameens(user_id)
        `)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      const duasWithAmeenStatus = data?.map(dua => ({
        ...dua,
        user_has_said_ameen: user ? dua.dua_ameens?.some(ameen => ameen.user_id === user.id) : false
      })) || [];

      setDuas(duasWithAmeenStatus);
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
      const { error } = await supabase
        .from('duas')
        .insert({
          content: newDua.trim(),
          is_anonymous: isAnonymous,
          user_id: user.id
        });

      if (error) throw error;

      setNewDua('');
      fetchDuas();
      
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
      const { error } = await supabase
        .from('dua_ameens')
        .insert({
          dua_id: duaId,
          user_id: user.id
        });

      if (error) throw error;

      fetchDuas();
      
      toast({
        title: "Ameen! 🤲",
        description: "Your support has been added to this prayer",
      });
    } catch (error) {
      console.error('Error saying ameen:', error);
      if (error.code === '23505') {
        toast({
          title: "Already Said Ameen",
          description: "You've already said Ameen to this prayer",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to say Ameen",
          variant: "destructive",
        });
      }
    }
  };

  const removeAmeen = async (duaId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('dua_ameens')
        .delete()
        .eq('dua_id', duaId)
        .eq('user_id', user.id);

      if (error) throw error;

      fetchDuas();
    } catch (error) {
      console.error('Error removing ameen:', error);
    }
  };

  useEffect(() => {
    fetchDuas();
  }, [user]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <MessageCircle className="h-10 w-10 text-blue-600" />
            Du'a Wall
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
