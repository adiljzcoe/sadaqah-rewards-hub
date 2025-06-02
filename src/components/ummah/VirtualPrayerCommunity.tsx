
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Clock, Star, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerGroup {
  id: string;
  prayer: string;
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  bonusPoints: number;
  isActive: boolean;
}

interface PrayerParticipant {
  id: string;
  name: string;
  isAnonymous: boolean;
  joinedAt: string;
  hasCompleted: boolean;
}

const VirtualPrayerCommunity = ({ currentPrayer }: { currentPrayer: string | null }) => {
  const [activeGroups, setActiveGroups] = useState<PrayerGroup[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [groupParticipants, setGroupParticipants] = useState<{ [key: string]: PrayerParticipant[] }>({});
  const [showParticipants, setShowParticipants] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  // Generate realistic prayer groups based on current time
  const generatePrayerGroups = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    const prayerSchedule = [
      { name: 'Fajr', startHour: 5, endHour: 6, participants: 25, maxParticipants: 50 },
      { name: 'Dhuhr', startHour: 12, endHour: 14, participants: 85, maxParticipants: 100 },
      { name: 'Asr', startHour: 15, endHour: 17, participants: 45, maxParticipants: 75 },
      { name: 'Maghrib', startHour: 18, endHour: 19, participants: 95, maxParticipants: 100 },
      { name: 'Isha', startHour: 20, endHour: 21, participants: 65, maxParticipants: 80 }
    ];

    const groups: PrayerGroup[] = [];
    
    prayerSchedule.forEach(prayer => {
      // Check if this prayer time is active or upcoming
      const isCurrentlyActive = currentHour >= prayer.startHour && currentHour <= prayer.endHour;
      const isUpcoming = currentHour === prayer.startHour - 1 || 
                        (currentHour === prayer.startHour && currentMinutes < 30);
      
      if (isCurrentlyActive || isUpcoming) {
        // Create multiple groups for popular prayers
        const groupCount = prayer.participants > 70 ? 3 : prayer.participants > 40 ? 2 : 1;
        
        for (let i = 0; i < groupCount; i++) {
          const groupParticipants = Math.floor(prayer.participants / groupCount) + 
                                  Math.floor(Math.random() * 10);
          
          groups.push({
            id: `${prayer.name.toLowerCase()}_${i + 1}`,
            prayer: prayer.name,
            startTime: `${prayer.startHour.toString().padStart(2, '0')}:${(i * 15).toString().padStart(2, '0')}`,
            endTime: `${prayer.endHour.toString().padStart(2, '0')}:00`,
            participants: groupParticipants,
            maxParticipants: prayer.maxParticipants,
            bonusPoints: prayer.name === 'Fajr' ? 25 : prayer.name === 'Maghrib' ? 20 : 15,
            isActive: isCurrentlyActive
          });
        }
      }
    });

    return groups;
  };

  // Generate mock participants for a group
  const generateParticipants = (groupId: string, count: number): PrayerParticipant[] => {
    const names = ['Ahmad', 'Fatima', 'Omar', 'Aisha', 'Ali', 'Khadija', 'Yusuf', 'Zainab', 'Hassan', 'Maryam'];
    const participants: PrayerParticipant[] = [];
    
    for (let i = 0; i < Math.min(count, 20); i++) {
      const isAnonymous = Math.random() > 0.7;
      participants.push({
        id: `${groupId}_participant_${i}`,
        name: isAnonymous ? 'Anonymous Muslim' : names[Math.floor(Math.random() * names.length)],
        isAnonymous,
        joinedAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        hasCompleted: Math.random() > 0.3
      });
    }
    
    return participants;
  };

  useEffect(() => {
    const groups = generatePrayerGroups();
    setActiveGroups(groups);
    
    // Generate participants for each group
    const participants: { [key: string]: PrayerParticipant[] } = {};
    groups.forEach(group => {
      participants[group.id] = generateParticipants(group.id, group.participants);
    });
    setGroupParticipants(participants);

    // Update every 2 minutes
    const interval = setInterval(() => {
      const updatedGroups = generatePrayerGroups();
      setActiveGroups(updatedGroups);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const joinPrayerGroup = (groupId: string) => {
    const group = activeGroups.find(g => g.id === groupId);
    if (!group) return;

    if (group.participants >= group.maxParticipants) {
      toast({
        title: "Group Full",
        description: "This prayer group is currently full. Try joining another group!",
        variant: "destructive",
      });
      return;
    }

    setJoinedGroups(prev => new Set([...prev, groupId]));
    
    // Update participant count
    setActiveGroups(prev => prev.map(g => 
      g.id === groupId ? { ...g, participants: g.participants + 1 } : g
    ));

    toast({
      title: "Joined Prayer Group! 🤲",
      description: `You've joined the ${group.prayer} prayer community. May Allah accept your prayer.`,
    });
  };

  const markPrayerComplete = (groupId: string) => {
    const group = activeGroups.find(g => g.id === groupId);
    if (!group) return;

    // Award bonus points
    const basePoints = 50;
    const totalPoints = basePoints + group.bonusPoints;
    
    const currentPoints = parseInt(localStorage.getItem('jannahPoints') || '0');
    const newPoints = currentPoints + totalPoints;
    localStorage.setItem('jannahPoints', newPoints.toString());

    toast({
      title: "Prayer Completed! ✨",
      description: `MashaAllah! You earned ${totalPoints} Jannah points (${basePoints} base + ${group.bonusPoints} community bonus)`,
    });

    // Trigger points update event
    window.dispatchEvent(new CustomEvent('jannahPointsUpdated', { detail: { newPoints } }));
  };

  const toggleParticipants = (groupId: string) => {
    setShowParticipants(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const getPrayerEmoji = (prayer: string) => {
    switch (prayer.toLowerCase()) {
      case 'fajr': return '🌅';
      case 'dhuhr': return '☀️';
      case 'asr': return '🌤️';
      case 'maghrib': return '🌆';
      case 'isha': return '🌙';
      default: return '🕌';
    }
  };

  if (activeGroups.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Prayer Groups</h3>
          <p className="text-gray-600">Prayer groups will appear closer to prayer times. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Virtual Prayer Community
          </CardTitle>
          <p className="text-green-100 text-sm">
            Join fellow Muslims in prayer and earn community bonus points
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {activeGroups.map((group) => {
          const isJoined = joinedGroups.has(group.id);
          const participants = groupParticipants[group.id] || [];
          const showingParticipants = showParticipants[group.id];
          
          return (
            <Card key={group.id} className={`transition-all duration-300 ${
              group.isActive 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getPrayerEmoji(group.prayer)}</span>
                    <div>
                      <h3 className="font-bold text-lg">{group.prayer} Prayer</h3>
                      <p className="text-sm text-gray-600">
                        {group.startTime} - {group.endTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {group.isActive && (
                      <Badge className="bg-green-100 text-green-800 animate-pulse">
                        Live Now
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-blue-50">
                      +{group.bonusPoints} bonus
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      {group.participants}/{group.maxParticipants} praying together
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleParticipants(group.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {showingParticipants ? 'Hide' : 'View'} Community
                  </Button>
                </div>

                {showingParticipants && (
                  <div className="mb-4 p-3 bg-white/50 rounded-lg border">
                    <p className="text-sm font-medium text-gray-700 mb-2">Praying with you:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {participants.slice(0, 12).map((participant) => (
                        <div key={participant.id} className="flex items-center gap-2 text-xs">
                          {participant.hasCompleted ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full bg-blue-400 animate-pulse" />
                          )}
                          <span className={participant.hasCompleted ? 'text-green-700' : 'text-gray-700'}>
                            {participant.name}
                          </span>
                        </div>
                      ))}
                      {participants.length > 12 && (
                        <div className="text-xs text-gray-600">
                          +{participants.length - 12} more...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {!isJoined ? (
                    <Button 
                      onClick={() => joinPrayerGroup(group.id)}
                      disabled={group.participants >= group.maxParticipants}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {group.participants >= group.maxParticipants ? 'Group Full' : 'Join Prayer Group'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => markPrayerComplete(group.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Mark Prayer Complete (+{50 + group.bonusPoints} points)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualPrayerCommunity;
