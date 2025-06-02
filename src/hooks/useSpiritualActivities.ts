
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SpiritualActivity {
  id: string;
  type: 'prayer' | 'dhikr' | 'quran' | 'charity' | 'dua' | 'fasting' | 'learning';
  description: string;
  count: number;
  emoji: string;
  color: string;
  lastUpdated: Date;
  trending: boolean;
  jannahPointsAwarded: number;
  tag: string;
}

export interface SpiritualActivityTemplate {
  type: string;
  emoji: string;
  baseCount: number;
  variance: number;
  color: string;
  jannahPoints: number;
  tag: string;
}

export const useSpiritualActivities = () => {
  const [activities, setActivities] = useState<SpiritualActivity[]>([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const { toast } = useToast();

  const spiritualActivityTemplates: SpiritualActivityTemplate[] = [
    { 
      type: 'prayer', 
      emoji: '🤲', 
      baseCount: 150, 
      variance: 50, 
      color: 'text-green-600',
      jannahPoints: 50,
      tag: 'salah'
    },
    { 
      type: 'dhikr', 
      emoji: '🌙', 
      baseCount: 80, 
      variance: 30, 
      color: 'text-blue-600',
      jannahPoints: 25,
      tag: 'remembrance'
    },
    { 
      type: 'quran', 
      emoji: '📖', 
      baseCount: 60, 
      variance: 25, 
      color: 'text-purple-600',
      jannahPoints: 30,
      tag: 'recitation'
    },
    { 
      type: 'charity', 
      emoji: '💰', 
      baseCount: 40, 
      variance: 20, 
      color: 'text-orange-600',
      jannahPoints: 75,
      tag: 'sadaqah'
    },
    { 
      type: 'dua', 
      emoji: '🤲', 
      baseCount: 120, 
      variance: 40, 
      color: 'text-indigo-600',
      jannahPoints: 20,
      tag: 'supplication'
    },
    { 
      type: 'fasting', 
      emoji: '🌅', 
      baseCount: 25, 
      variance: 15, 
      color: 'text-yellow-600',
      jannahPoints: 100,
      tag: 'sawm'
    },
    { 
      type: 'learning', 
      emoji: '🎓', 
      baseCount: 35, 
      variance: 15, 
      color: 'text-pink-600',
      jannahPoints: 40,
      tag: 'knowledge'
    }
  ];

  const getActivityDescription = (type: string, count: number) => {
    const descriptions = {
      prayer: [
        `${count} believers completing prayer with focus`,
        `${count} hearts united in salah right now`,
        `${count} souls in peaceful communion with Allah`
      ],
      dhikr: [
        `${count} people making dhikr and earning points`,
        `${count} hearts remembering Allah's names`,
        `${count} tongues reciting blessed dhikr`
      ],
      quran: [
        `${count} reading Qur'an and gaining knowledge`,
        `${count} souls absorbing divine guidance`,
        `${count} hearts illuminated by the Book`
      ],
      charity: [
        `${count} people giving sadaqah for rewards`,
        `${count} generous hearts opening for giving`,
        `${count} hands extended in blessed charity`
      ],
      dua: [
        `${count} making heartfelt du'a right now`,
        `${count} voices raised in sincere supplication`,
        `${count} hearts calling upon their Creator`
      ],
      fasting: [
        `${count} observing blessed fast for reward`,
        `${count} souls purifying through sawm`,
        `${count} hearts strengthening through discipline`
      ],
      learning: [
        `${count} seeking Islamic knowledge for growth`,
        `${count} minds expanding with sacred learning`,
        `${count} hearts growing in divine wisdom`
      ]
    };
    
    const options = descriptions[type as keyof typeof descriptions] || [`${count} engaging in worship`];
    return options[Math.floor(Math.random() * options.length)];
  };

  const recordSpiritualActivity = (activityType: string, pointsEarned: number) => {
    // Update local storage to track user's contribution
    const currentPoints = parseInt(localStorage.getItem('jannahPoints') || '0');
    const newPoints = currentPoints + pointsEarned;
    localStorage.setItem('jannahPoints', newPoints.toString());

    // Trigger points update event
    window.dispatchEvent(new CustomEvent('jannahPointsUpdated', { 
      detail: { newPoints, activityType, pointsEarned } 
    }));

    const template = spiritualActivityTemplates.find(t => t.type === activityType);
    if (template) {
      toast({
        title: `Spiritual Activity Recorded! ✨`,
        description: `You earned ${pointsEarned} Jannah points for ${template.tag}. May Allah accept your worship.`,
      });
    }
  };

  const generateActivities = () => {
    const newActivities: SpiritualActivity[] = [];
    let total = 0;

    spiritualActivityTemplates.forEach((template, index) => {
      const count = template.baseCount + Math.floor(Math.random() * template.variance);
      const isTrending = Math.random() > 0.7;
      
      total += count;
      
      newActivities.push({
        id: `${template.type}_${Date.now()}_${index}`,
        type: template.type as any,
        description: getActivityDescription(template.type, count),
        count,
        emoji: template.emoji,
        color: template.color,
        lastUpdated: new Date(),
        trending: isTrending,
        jannahPointsAwarded: template.jannahPoints,
        tag: template.tag
      });
    });

    // Sort by count descending with some randomness
    newActivities.sort((a, b) => b.count - a.count);
    
    setActivities(newActivities);
    setTotalParticipants(total);
  };

  useEffect(() => {
    generateActivities();

    // Update every 3-5 seconds for live feel
    const interval = setInterval(() => {
      generateActivities();
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    activities,
    totalParticipants,
    recordSpiritualActivity,
    spiritualActivityTemplates
  };
};
