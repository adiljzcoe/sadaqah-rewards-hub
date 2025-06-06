
import { useMemo } from 'react';

export interface IslamicTheme {
  id: string;
  name: string;
  description: string;
  containerClasses: string;
  headerClasses: string;
  cardClasses: string;
  accentClasses: string;
  textClasses: string;
  gradientClasses: string;
  prayerTimeClasses: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    sunrise: string;
  };
}

export const useIslamicThemes = () => {
  const themes: Record<string, IslamicTheme> = useMemo(() => ({
    'traditional-green': {
      id: 'traditional-green',
      name: 'Traditional Green',
      description: 'Classic Islamic green with gold accents',
      containerClasses: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100',
      headerClasses: 'bg-gradient-to-r from-emerald-600 to-green-700 text-white',
      cardClasses: 'bg-white/90 backdrop-blur-sm border-emerald-200 shadow-lg',
      accentClasses: 'text-emerald-700 bg-emerald-100',
      textClasses: 'text-emerald-900',
      gradientClasses: 'from-emerald-500 to-green-600',
      prayerTimeClasses: {
        fajr: 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500',
        dhuhr: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500',
        asr: 'bg-orange-100 text-orange-800 border-l-4 border-orange-500',
        maghrib: 'bg-red-100 text-red-800 border-l-4 border-red-500',
        isha: 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500',
        sunrise: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500'
      }
    },
    'elegant-blue': {
      id: 'elegant-blue',
      name: 'Elegant Blue',
      description: 'Deep blue inspired by Islamic art',
      containerClasses: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100',
      headerClasses: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white',
      cardClasses: 'bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg',
      accentClasses: 'text-blue-700 bg-blue-100',
      textClasses: 'text-blue-900',
      gradientClasses: 'from-blue-500 to-indigo-600',
      prayerTimeClasses: {
        fajr: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
        dhuhr: 'bg-cyan-100 text-cyan-800 border-l-4 border-cyan-500',
        asr: 'bg-teal-100 text-teal-800 border-l-4 border-teal-500',
        maghrib: 'bg-purple-100 text-purple-800 border-l-4 border-purple-500',
        isha: 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500',
        sunrise: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
      }
    },
    'madinah-cream': {
      id: 'madinah-cream',
      name: 'Madinah Cream',
      description: 'Warm cream and brown tones',
      containerClasses: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50',
      headerClasses: 'bg-gradient-to-r from-amber-600 to-orange-700 text-white',
      cardClasses: 'bg-cream-50/90 backdrop-blur-sm border-amber-200 shadow-lg',
      accentClasses: 'text-amber-800 bg-amber-100',
      textClasses: 'text-amber-900',
      gradientClasses: 'from-amber-500 to-orange-600',
      prayerTimeClasses: {
        fajr: 'bg-orange-100 text-orange-800 border-l-4 border-orange-500',
        dhuhr: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500',
        asr: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
        maghrib: 'bg-red-100 text-red-800 border-l-4 border-red-500',
        isha: 'bg-purple-100 text-purple-800 border-l-4 border-purple-500',
        sunrise: 'bg-pink-100 text-pink-800 border-l-4 border-pink-500'
      }
    },
    'royal-purple': {
      id: 'royal-purple',
      name: 'Royal Purple',
      description: 'Regal purple with golden highlights',
      containerClasses: 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100',
      headerClasses: 'bg-gradient-to-r from-purple-600 to-violet-700 text-white',
      cardClasses: 'bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg',
      accentClasses: 'text-purple-700 bg-purple-100',
      textClasses: 'text-purple-900',
      gradientClasses: 'from-purple-500 to-violet-600',
      prayerTimeClasses: {
        fajr: 'bg-purple-100 text-purple-800 border-l-4 border-purple-500',
        dhuhr: 'bg-violet-100 text-violet-800 border-l-4 border-violet-500',
        asr: 'bg-fuchsia-100 text-fuchsia-800 border-l-4 border-fuchsia-500',
        maghrib: 'bg-pink-100 text-pink-800 border-l-4 border-pink-500',
        isha: 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500',
        sunrise: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
      }
    },
    'desert-sand': {
      id: 'desert-sand',
      name: 'Desert Sand',
      description: 'Warm sand colors with teal accents',
      containerClasses: 'bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50',
      headerClasses: 'bg-gradient-to-r from-yellow-600 to-amber-700 text-white',
      cardClasses: 'bg-white/90 backdrop-blur-sm border-yellow-200 shadow-lg',
      accentClasses: 'text-yellow-800 bg-yellow-100',
      textClasses: 'text-yellow-900',
      gradientClasses: 'from-yellow-500 to-amber-600',
      prayerTimeClasses: {
        fajr: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
        dhuhr: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500',
        asr: 'bg-orange-100 text-orange-800 border-l-4 border-orange-500',
        maghrib: 'bg-teal-100 text-teal-800 border-l-4 border-teal-500',
        isha: 'bg-cyan-100 text-cyan-800 border-l-4 border-cyan-500',
        sunrise: 'bg-rose-100 text-rose-800 border-l-4 border-rose-500'
      }
    },
    'makkah-black': {
      id: 'makkah-black',
      name: 'Makkah Black',
      description: 'Elegant black and gold combination',
      containerClasses: 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900',
      headerClasses: 'bg-gradient-to-r from-gray-800 to-black text-yellow-400',
      cardClasses: 'bg-gray-800/90 backdrop-blur-sm border-gray-600 shadow-xl text-white',
      accentClasses: 'text-yellow-400 bg-gray-700',
      textClasses: 'text-gray-100',
      gradientClasses: 'from-gray-700 to-black',
      prayerTimeClasses: {
        fajr: 'bg-gray-700 text-yellow-400 border-l-4 border-yellow-500',
        dhuhr: 'bg-gray-700 text-amber-400 border-l-4 border-amber-500',
        asr: 'bg-gray-700 text-orange-400 border-l-4 border-orange-500',
        maghrib: 'bg-gray-700 text-red-400 border-l-4 border-red-500',
        isha: 'bg-gray-700 text-blue-400 border-l-4 border-blue-500',
        sunrise: 'bg-gray-700 text-pink-400 border-l-4 border-pink-500'
      }
    }
  }), []);

  return { themes };
};
