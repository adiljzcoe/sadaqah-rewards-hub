
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import RamadanDayCard from './RamadanDayCard';
import { Loader2 } from 'lucide-react';

const RamadanCalendarGrid = () => {
  const { data: calendarDays, isLoading } = useQuery({
    queryKey: ['ramadan-calendar-days'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ramadan_calendar_days')
        .select('*')
        .eq('is_active', true)
        .order('day_number', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: userProgress } = useQuery({
    queryKey: ['ramadan-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ramadan_calendar_progress')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const completedDays = new Set(userProgress?.map(p => p.calendar_day_id) || []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {calendarDays?.map((day) => (
        <RamadanDayCard
          key={day.id}
          day={day}
          isCompleted={completedDays.has(day.id)}
        />
      ))}
    </div>
  );
};

export default RamadanCalendarGrid;
