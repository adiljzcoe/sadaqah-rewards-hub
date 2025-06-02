
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Search, Users, Star, CheckCircle, Building } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Masjid {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  imam_name: string;
  logo_url: string;
  total_referrals: number;
  verified: boolean;
  referral_code: string;
}

interface MasjidSelectorProps {
  onMasjidSelected?: (masjid: Masjid | null) => void;
  currentMasjidId?: string;
}

const MasjidSelector = ({ onMasjidSelected, currentMasjidId }: MasjidSelectorProps) => {
  const [masjids, setMasjids] = useState<Masjid[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMasjid, setSelectedMasjid] = useState<string | null>(currentMasjidId || null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchMasjids();
  }, []);

  const fetchMasjids = async () => {
    try {
      const { data, error } = await supabase
        .from('masjid_profiles')
        .select('*')
        .eq('verified', true)
        .eq('active', true)
        .order('total_referrals', { ascending: false });

      if (error) throw error;
      setMasjids(data || []);
    } catch (error) {
      console.error('Error fetching masjids:', error);
      toast({
        title: "Error",
        description: "Failed to load masjids. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMasjid = async (masjid: Masjid) => {
    if (!user) return;

    try {
      // Update user's primary masjid
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ primary_masjid_id: masjid.id })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Create or update affiliation
      const { error: affiliationError } = await supabase
        .from('user_masjid_affiliations')
        .upsert({
          user_id: user.id,
          masjid_id: masjid.id,
          referral_source: 'direct'
        });

      if (affiliationError) throw affiliationError;

      setSelectedMasjid(masjid.id);
      onMasjidSelected?.(masjid);

      toast({
        title: "Masjid Selected! 🕌",
        description: `You are now representing ${masjid.name}. May Allah bless your community!`,
      });
    } catch (error) {
      console.error('Error selecting masjid:', error);
      toast({
        title: "Error",
        description: "Failed to select masjid. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredMasjids = masjids.filter(masjid =>
    masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    masjid.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    masjid.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading masjids...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Choose Your Masjid
        </CardTitle>
        <p className="text-sm text-gray-600">
          Represent your local masjid and help them earn from your charitable activities
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by masjid name, city, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="max-h-96 overflow-y-auto space-y-3">
          {filteredMasjids.map((masjid) => (
            <div
              key={masjid.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-emerald-300 ${
                selectedMasjid === masjid.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200'
              }`}
              onClick={() => handleSelectMasjid(masjid)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{masjid.name}</h3>
                    {masjid.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {selectedMasjid === masjid.id && (
                      <Badge className="bg-emerald-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Your Masjid
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {masjid.city}, {masjid.country}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {masjid.total_referrals} members
                    </div>
                  </div>
                  
                  {masjid.imam_name && (
                    <p className="text-sm text-gray-600">
                      Imam: {masjid.imam_name}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Referral Code: {masjid.referral_code}
                  </p>
                </div>
                
                {masjid.logo_url && (
                  <img
                    src={masjid.logo_url}
                    alt={`${masjid.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMasjids.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No masjids found matching your search.</p>
            <p className="text-sm mt-2">
              Contact us to add your local masjid to our platform.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MasjidSelector;
