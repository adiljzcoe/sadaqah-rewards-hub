
// Islamic calendar utility functions
export interface IslamicDate {
  day: number;
  month: number;
  year: number;
  monthName: string;
}

export interface IslamicEvent {
  id: string;
  title: string;
  description: string;
  islamicDate: IslamicDate;
  gregorianDate: Date;
  type: 'prayer' | 'fasting' | 'celebration' | 'worship' | 'pilgrimage';
  significance: 'high' | 'medium' | 'low';
  color: string;
  icon: string;
  isRecurring: boolean;
}

const islamicMonths = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhul Qi\'dah', 'Dhul Hijjah'
];

// Approximate Islamic calendar conversion (simplified)
export function gregorianToIslamic(date: Date): IslamicDate {
  const greg = new Date(date);
  const year = greg.getFullYear();
  const month = greg.getMonth() + 1;
  const day = greg.getDate();
  
  // Simplified calculation - in reality you'd use a proper Islamic calendar library
  const islamicYear = Math.floor((year - 622) * 1.030684) + 1;
  const dayOfYear = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86400000) + 1;
  const islamicMonth = Math.floor((dayOfYear % 354) / 29.5) + 1;
  const islamicDay = Math.floor((dayOfYear % 354) % 29.5) + 1;
  
  return {
    day: Math.min(islamicDay, 30),
    month: Math.min(islamicMonth, 12),
    year: islamicYear,
    monthName: islamicMonths[Math.min(islamicMonth - 1, 11)]
  };
}

export function islamicToGregorian(islamicDate: IslamicDate): Date {
  // Simplified conversion - in reality you'd use a proper library
  const gregorianYear = Math.floor((islamicDate.year - 1) / 1.030684) + 622;
  const dayOfYear = (islamicDate.month - 1) * 29.5 + islamicDate.day;
  const date = new Date(gregorianYear, 0, 1);
  date.setDate(date.getDate() + dayOfYear - 1);
  return date;
}

export function getDaysUntilEvent(eventDate: Date): number {
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Real Islamic events with approximate dates for 2025
export function getUpcomingIslamicEvents(): IslamicEvent[] {
  const events: IslamicEvent[] = [
    {
      id: '1',
      title: 'Jumu\'ah Prayer',
      description: 'The blessed Friday congregational prayer. A time for community gathering and spiritual reflection.',
      islamicDate: { day: 0, month: 0, year: 0, monthName: 'Weekly' },
      gregorianDate: getNextFriday(),
      type: 'prayer',
      significance: 'high',
      color: 'bg-emerald-500',
      icon: '🕌',
      isRecurring: true
    },
    {
      id: '2',
      title: 'Ramadan Begins',
      description: 'The holy month of fasting, prayer, and spiritual reflection begins.',
      islamicDate: { day: 1, month: 9, year: 1446, monthName: 'Ramadan' },
      gregorianDate: new Date('2025-02-28'),
      type: 'fasting',
      significance: 'high',
      color: 'bg-purple-600',
      icon: '🌙',
      isRecurring: true
    },
    {
      id: '3',
      title: 'Laylat al-Qadr',
      description: 'The Night of Power - better than a thousand months. Search for it in the last 10 nights of Ramadan.',
      islamicDate: { day: 27, month: 9, year: 1446, monthName: 'Ramadan' },
      gregorianDate: new Date('2025-03-26'),
      type: 'worship',
      significance: 'high',
      color: 'bg-indigo-600',
      icon: '✨',
      isRecurring: true
    },
    {
      id: '4',
      title: 'Eid al-Fitr',
      description: 'The Festival of Breaking the Fast. Celebration after the holy month of Ramadan.',
      islamicDate: { day: 1, month: 10, year: 1446, monthName: 'Shawwal' },
      gregorianDate: new Date('2025-03-30'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-pink-500',
      icon: '🎉',
      isRecurring: true
    },
    {
      id: '5',
      title: 'Day of Arafah',
      description: 'The most important day of Hajj. Fasting is highly recommended for those not performing Hajj.',
      islamicDate: { day: 9, month: 12, year: 1446, monthName: 'Dhul Hijjah' },
      gregorianDate: new Date('2025-06-05'),
      type: 'fasting',
      significance: 'high',
      color: 'bg-blue-600',
      icon: '⛰️',
      isRecurring: true
    },
    {
      id: '6',
      title: 'Eid al-Adha',
      description: 'The Festival of Sacrifice. Commemorating Ibrahim\'s willingness to sacrifice his son.',
      islamicDate: { day: 10, month: 12, year: 1446, monthName: 'Dhul Hijjah' },
      gregorianDate: new Date('2025-06-06'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-red-500',
      icon: '🐑',
      isRecurring: true
    },
    {
      id: '7',
      title: 'Islamic New Year',
      description: 'The beginning of the new Islamic year 1447.',
      islamicDate: { day: 1, month: 1, year: 1447, monthName: 'Muharram' },
      gregorianDate: new Date('2025-06-26'),
      type: 'celebration',
      significance: 'medium',
      color: 'bg-green-600',
      icon: '🎊',
      isRecurring: true
    },
    {
      id: '8',
      title: 'Day of Ashura',
      description: 'The 10th day of Muharram. A day of fasting and reflection.',
      islamicDate: { day: 10, month: 1, year: 1447, monthName: 'Muharram' },
      gregorianDate: new Date('2025-07-05'),
      type: 'fasting',
      significance: 'medium',
      color: 'bg-slate-600',
      icon: '🤲',
      isRecurring: true
    },
    {
      id: '9',
      title: 'Mawlid an-Nabi',
      description: 'The birth of Prophet Muhammad (peace be upon him). A day of remembrance and celebration.',
      islamicDate: { day: 12, month: 3, year: 1447, monthName: 'Rabi al-Awwal' },
      gregorianDate: new Date('2025-09-04'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-amber-500',
      icon: '🌟',
      isRecurring: true
    },
    {
      id: '10',
      title: 'Isra and Mi\'raj',
      description: 'The Night Journey and Ascension of Prophet Muhammad (peace be upon him).',
      islamicDate: { day: 27, month: 7, year: 1447, monthName: 'Rajab' },
      gregorianDate: new Date('2026-01-14'),
      type: 'worship',
      significance: 'high',
      color: 'bg-cyan-600',
      icon: '🌃',
      isRecurring: true
    }
  ];

  return events.sort((a, b) => a.gregorianDate.getTime() - b.gregorianDate.getTime());
}

function getNextFriday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
  return nextFriday;
}

export function getCurrentIslamicDate(): IslamicDate {
  return gregorianToIslamic(new Date());
}

export function formatIslamicDate(islamicDate: IslamicDate): string {
  return `${islamicDate.day} ${islamicDate.monthName} ${islamicDate.year} AH`;
}
