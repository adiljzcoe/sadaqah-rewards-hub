
import { useState, useEffect } from 'react';

interface Masjid {
  id: string;
  name: string;
  location: string;
  memberCount: number;
  totalDonations: number;
  rank: number;
  verified: boolean;
}

export const useMasjidAffiliation = () => {
  const [selectedMasjid, setSelectedMasjid] = useState<Masjid | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user's masjid affiliation
    const loadMasjidAffiliation = async () => {
      setIsLoading(true);
      
      // In a real app, this would fetch from your backend/Supabase
      const savedMasjidId = localStorage.getItem('userMasjidId');
      
      if (savedMasjidId) {
        // Mock data for demonstration
        const mockMasjid: Masjid = {
          id: savedMasjidId,
          name: 'Central London Mosque',
          location: 'London, UK',
          memberCount: 247,
          totalDonations: 21680,
          rank: 3,
          verified: true
        };
        setSelectedMasjid(mockMasjid);
      }
      
      setIsLoading(false);
    };

    loadMasjidAffiliation();
  }, []);

  const selectMasjid = async (masjid: Masjid) => {
    setSelectedMasjid(masjid);
    localStorage.setItem('userMasjidId', masjid.id);
    
    // In a real app, you would also update this in your backend
    // await updateUserMasjidAffiliation(masjid.id);
  };

  const leaveMasjid = async () => {
    setSelectedMasjid(null);
    localStorage.removeItem('userMasjidId');
    
    // In a real app, you would also update this in your backend
    // await removeUserMasjidAffiliation();
  };

  return {
    selectedMasjid,
    isLoading,
    selectMasjid,
    leaveMasjid
  };
};
