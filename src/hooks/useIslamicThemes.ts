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
    },
    'andalusian-mosaic': {
      id: 'andalusian-mosaic',
      name: 'Andalusian Mosaic',
      description: 'Inspired by Alhambra geometric patterns with terracotta and turquoise',
      containerClasses: 'bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 bg-[conic-gradient(at_center,_transparent_0deg,_rgba(251,146,60,0.1)_45deg,_transparent_90deg)] bg-[length:40px_40px]',
      headerClasses: 'bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 text-white border-b-4 border-yellow-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-orange-200 shadow-2xl ring-1 ring-orange-100',
      accentClasses: 'text-red-800 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300',
      textClasses: 'text-red-900',
      gradientClasses: 'from-red-500 via-orange-500 to-amber-500',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-orange-100 to-red-100 text-red-800 border-l-4 border-red-500 shadow-md',
        dhuhr: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-l-4 border-amber-500 shadow-md',
        asr: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border-l-4 border-orange-500 shadow-md',
        maghrib: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-l-4 border-red-500 shadow-md',
        isha: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-l-4 border-purple-500 shadow-md',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md'
      }
    },
    'mamluk-geometry': {
      id: 'mamluk-geometry',
      name: 'Mamluk Geometry',
      description: 'Rich geometric patterns in deep blues and golds inspired by Mamluk art',
      containerClasses: 'bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_50%)] bg-[length:60px_60px]',
      headerClasses: 'bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-800 text-yellow-300 border-b-4 border-yellow-400',
      cardClasses: 'bg-slate-800/95 backdrop-blur-sm border-2 border-blue-400 shadow-2xl ring-1 ring-blue-300 text-white',
      accentClasses: 'text-yellow-300 bg-gradient-to-r from-blue-800 to-indigo-800 border border-yellow-400',
      textClasses: 'text-blue-100',
      gradientClasses: 'from-blue-600 via-indigo-600 to-blue-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-blue-800 to-indigo-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg',
        dhuhr: 'bg-gradient-to-r from-indigo-800 to-purple-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg',
        asr: 'bg-gradient-to-r from-purple-800 to-blue-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg',
        maghrib: 'bg-gradient-to-r from-red-800 to-pink-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg',
        isha: 'bg-gradient-to-r from-slate-800 to-gray-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg',
        sunrise: 'bg-gradient-to-r from-amber-800 to-orange-800 text-yellow-300 border-l-4 border-yellow-400 shadow-lg'
      }
    },
    'fatimid-splendor': {
      id: 'fatimid-splendor',
      name: 'Fatimid Splendor',
      description: 'Luxurious emerald greens with intricate golden geometric patterns',
      containerClasses: 'bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-200 bg-[linear-gradient(45deg,_transparent_25%,_rgba(16,185,129,0.1)_50%,_transparent_75%)] bg-[length:20px_20px]',
      headerClasses: 'bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 text-yellow-200 border-b-4 border-yellow-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-emerald-300 shadow-2xl ring-1 ring-emerald-200',
      accentClasses: 'text-emerald-800 bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-400',
      textClasses: 'text-emerald-900',
      gradientClasses: 'from-emerald-600 via-green-500 to-emerald-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-l-4 border-emerald-500 shadow-md ring-1 ring-emerald-300',
        dhuhr: 'bg-gradient-to-r from-green-100 to-lime-100 text-green-800 border-l-4 border-green-500 shadow-md ring-1 ring-green-300',
        asr: 'bg-gradient-to-r from-lime-100 to-yellow-100 text-lime-800 border-l-4 border-lime-500 shadow-md ring-1 ring-lime-300',
        maghrib: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-l-4 border-orange-500 shadow-md ring-1 ring-orange-300',
        isha: 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-l-4 border-indigo-500 shadow-md ring-1 ring-indigo-300',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md ring-1 ring-yellow-300'
      }
    },
    'cordoba-marvel': {
      id: 'cordoba-marvel',
      name: 'Córdoba Marvel',
      description: 'Horseshoe arches and geometric patterns in warm earth tones',
      containerClasses: 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 bg-[repeating-conic-gradient(from_0deg_at_center,_transparent_0deg,_rgba(245,158,11,0.1)_60deg,_transparent_120deg)]',
      headerClasses: 'bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 text-yellow-100 border-b-4 border-yellow-400',
      cardClasses: 'bg-amber-50/95 backdrop-blur-sm border-2 border-amber-300 shadow-2xl ring-1 ring-amber-200',
      accentClasses: 'text-amber-900 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-400',
      textClasses: 'text-amber-900',
      gradientClasses: 'from-amber-600 via-orange-500 to-red-500',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-l-4 border-amber-500 shadow-md',
        dhuhr: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-l-4 border-orange-500 shadow-md',
        asr: 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-l-4 border-red-500 shadow-md',
        maghrib: 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 border-l-4 border-pink-500 shadow-md',
        isha: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-l-4 border-purple-500 shadow-md',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md'
      }
    },
    'ottoman-palace': {
      id: 'ottoman-palace',
      name: 'Ottoman Palace',
      description: 'Regal Turkish patterns with deep crimsons and royal blues',
      containerClasses: 'bg-gradient-to-br from-red-900 via-blue-900 to-red-900 bg-[conic-gradient(at_top_right,_rgba(239,68,68,0.1),_rgba(59,130,246,0.1),_rgba(239,68,68,0.1))]',
      headerClasses: 'bg-gradient-to-r from-red-800 via-blue-800 to-red-800 text-yellow-200 border-b-4 border-yellow-400',
      cardClasses: 'bg-slate-800/95 backdrop-blur-sm border-2 border-red-400 shadow-2xl ring-1 ring-red-300 text-white',
      accentClasses: 'text-yellow-200 bg-gradient-to-r from-red-800 to-blue-800 border border-yellow-400',
      textClasses: 'text-red-100',
      gradientClasses: 'from-red-700 via-blue-700 to-red-700',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-red-800 to-pink-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg',
        dhuhr: 'bg-gradient-to-r from-blue-800 to-indigo-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg',
        asr: 'bg-gradient-to-r from-purple-800 to-red-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg',
        maghrib: 'bg-gradient-to-r from-pink-800 to-red-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg',
        isha: 'bg-gradient-to-r from-indigo-800 to-blue-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg',
        sunrise: 'bg-gradient-to-r from-orange-800 to-red-800 text-yellow-200 border-l-4 border-yellow-400 shadow-lg'
      }
    },
    'persian-garden': {
      id: 'persian-garden',
      name: 'Persian Garden',
      description: 'Four-fold garden patterns with jade greens and sapphire blues',
      containerClasses: 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 bg-[radial-gradient(circle_at_25%_25%,_rgba(20,184,166,0.1)_0%,_transparent_25%),_radial-gradient(circle_at_75%_75%,_rgba(59,130,246,0.1)_0%,_transparent_25%)]',
      headerClasses: 'bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-700 text-white border-b-4 border-cyan-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-teal-300 shadow-2xl ring-1 ring-teal-200',
      accentClasses: 'text-teal-800 bg-gradient-to-r from-teal-100 to-cyan-100 border border-teal-400',
      textClasses: 'text-teal-900',
      gradientClasses: 'from-teal-600 via-cyan-500 to-blue-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-l-4 border-teal-500 shadow-md',
        dhuhr: 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-l-4 border-cyan-500 shadow-md',
        asr: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-l-4 border-blue-500 shadow-md',
        maghrib: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-l-4 border-purple-500 shadow-md',
        isha: 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-l-4 border-indigo-500 shadow-md',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-teal-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md'
      }
    },
    'moorish-lattice': {
      id: 'moorish-lattice',
      name: 'Moorish Lattice',
      description: 'Intricate lattice work patterns with burgundy and gold',
      containerClasses: 'bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 bg-[linear-gradient(45deg,_transparent_35%,_rgba(190,24,93,0.1)_35%,_rgba(190,24,93,0.1)_65%,_transparent_65%),_linear-gradient(-45deg,_transparent_35%,_rgba(190,24,93,0.1)_35%,_rgba(190,24,93,0.1)_65%,_transparent_65%)] bg-[length:20px_20px]',
      headerClasses: 'bg-gradient-to-r from-rose-800 via-pink-700 to-red-800 text-yellow-200 border-b-4 border-yellow-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-rose-300 shadow-2xl ring-1 ring-rose-200',
      accentClasses: 'text-rose-800 bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-400',
      textClasses: 'text-rose-900',
      gradientClasses: 'from-rose-600 via-pink-500 to-red-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-l-4 border-rose-500 shadow-md',
        dhuhr: 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-800 border-l-4 border-pink-500 shadow-md',
        asr: 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-l-4 border-red-500 shadow-md',
        maghrib: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-l-4 border-orange-500 shadow-md',
        isha: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-l-4 border-purple-500 shadow-md',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md'
      }
    },
    'abbasid-calligraphy': {
      id: 'abbasid-calligraphy',
      name: 'Abbasid Calligraphy',
      description: 'Elegant black and gold inspired by Arabic calligraphy',
      containerClasses: 'bg-gradient-to-br from-gray-900 via-slate-800 to-black bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.1)_0%,_transparent_50%)]',
      headerClasses: 'bg-gradient-to-r from-black via-gray-800 to-black text-yellow-300 border-b-4 border-yellow-400',
      cardClasses: 'bg-gray-900/95 backdrop-blur-sm border-2 border-yellow-600 shadow-2xl ring-1 ring-yellow-400 text-yellow-100',
      accentClasses: 'text-yellow-300 bg-gradient-to-r from-gray-800 to-black border border-yellow-500',
      textClasses: 'text-yellow-100',
      gradientClasses: 'from-black via-gray-800 to-black',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-gray-800 to-black text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400',
        dhuhr: 'bg-gradient-to-r from-black to-gray-800 text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400',
        asr: 'bg-gradient-to-r from-gray-900 to-slate-800 text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400',
        maghrib: 'bg-gradient-to-r from-slate-800 to-gray-900 text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400',
        isha: 'bg-gradient-to-r from-gray-800 to-gray-900 text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400',
        sunrise: 'bg-gradient-to-r from-amber-900 to-yellow-900 text-yellow-300 border-l-4 border-yellow-500 shadow-lg ring-1 ring-yellow-400'
      }
    },
    'nasrid-elegance': {
      id: 'nasrid-elegance',
      name: 'Nasrid Elegance',
      description: 'Sophisticated patterns from Granada with ivory and azure',
      containerClasses: 'bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 bg-[conic-gradient(from_45deg_at_center,_transparent_0deg,_rgba(14,165,233,0.1)_72deg,_transparent_144deg,_rgba(14,165,233,0.1)_216deg,_transparent_288deg)] bg-[length:50px_50px]',
      headerClasses: 'bg-gradient-to-r from-sky-700 via-blue-600 to-indigo-700 text-white border-b-4 border-sky-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-sky-300 shadow-2xl ring-1 ring-sky-200',
      accentClasses: 'text-sky-800 bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-400',
      textClasses: 'text-sky-900',
      gradientClasses: 'from-sky-600 via-blue-500 to-indigo-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-800 border-l-4 border-sky-500 shadow-md ring-1 ring-sky-300',
        dhuhr: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-l-4 border-blue-500 shadow-md ring-1 ring-blue-300',
        asr: 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-l-4 border-indigo-500 shadow-md ring-1 ring-indigo-300',
        maghrib: 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-l-4 border-purple-500 shadow-md ring-1 ring-purple-300',
        isha: 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-l-4 border-slate-500 shadow-md ring-1 ring-slate-300',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md ring-1 ring-yellow-300'
      }
    },
    'damascene-steel': {
      id: 'damascene-steel',
      name: 'Damascene Steel',
      description: 'Metallic patterns with silver, steel, and copper tones',
      containerClasses: 'bg-gradient-to-br from-gray-100 via-slate-100 to-zinc-100 bg-[linear-gradient(135deg,_rgba(100,116,139,0.1)_25%,_transparent_25%,_transparent_50%,_rgba(100,116,139,0.1)_50%,_rgba(100,116,139,0.1)_75%,_transparent_75%)] bg-[length:30px_30px]',
      headerClasses: 'bg-gradient-to-r from-slate-700 via-gray-600 to-zinc-700 text-white border-b-4 border-orange-400',
      cardClasses: 'bg-white/95 backdrop-blur-sm border-2 border-slate-300 shadow-2xl ring-1 ring-slate-200',
      accentClasses: 'text-slate-800 bg-gradient-to-r from-slate-100 to-gray-100 border border-slate-400',
      textClasses: 'text-slate-900',
      gradientClasses: 'from-slate-600 via-gray-500 to-zinc-600',
      prayerTimeClasses: {
        fajr: 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-l-4 border-slate-500 shadow-md ring-1 ring-slate-300',
        dhuhr: 'bg-gradient-to-r from-gray-100 to-zinc-100 text-gray-800 border-l-4 border-gray-500 shadow-md ring-1 ring-gray-300',
        asr: 'bg-gradient-to-r from-zinc-100 to-stone-100 text-zinc-800 border-l-4 border-zinc-500 shadow-md ring-1 ring-zinc-300',
        maghrib: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-l-4 border-orange-500 shadow-md ring-1 ring-orange-300',
        isha: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-l-4 border-blue-500 shadow-md ring-1 ring-blue-300',
        sunrise: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-l-4 border-yellow-500 shadow-md ring-1 ring-yellow-300'
      }
    }
  }), []);

  return { themes };
};
