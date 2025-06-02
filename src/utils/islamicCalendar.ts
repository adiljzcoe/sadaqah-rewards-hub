
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
  type: 'prayer' | 'fasting' | 'celebration' | 'worship' | 'pilgrimage' | 'commemoration';
  significance: 'high' | 'medium' | 'low';
  color: string;
  icon: string;
  isRecurring: boolean;
  detailedDescription?: string;
  traditions?: string[];
  donationCauses?: string[];
  slug: string;
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

// Comprehensive Islamic events with approximate dates for 2025-2026
export function getUpcomingIslamicEvents(): IslamicEvent[] {
  const events: IslamicEvent[] = [
    // Weekly Events
    {
      id: '1',
      title: 'Jumu\'ah Prayer',
      description: 'The blessed Friday congregational prayer. A time for community gathering and spiritual reflection.',
      detailedDescription: 'Jumu\'ah is a congregational prayer that Muslims hold every Friday, replacing the Zuhr prayer. It includes a sermon (khutbah) and is considered one of the most important weekly gatherings for the Muslim community.',
      islamicDate: { day: 0, month: 0, year: 0, monthName: 'Weekly' },
      gregorianDate: getNextFriday(),
      type: 'prayer',
      significance: 'high',
      color: 'bg-emerald-500',
      icon: '🕌',
      isRecurring: true,
      traditions: ['Wearing clean clothes', 'Early arrival at mosque', 'Listening to khutbah'],
      donationCauses: ['Mosque maintenance', 'Community iftar', 'Islamic education'],
      slug: 'jumah-prayer'
    },
    
    // Muharram Events
    {
      id: '2',
      title: 'Islamic New Year 1447',
      description: 'The beginning of the new Islamic year, marking the Hijra of Prophet Muhammad (PBUH).',
      detailedDescription: 'The Islamic New Year commemorates the Hijra (migration) of Prophet Muhammad from Mecca to Medina in 622 CE, marking the beginning of the Islamic calendar.',
      islamicDate: { day: 1, month: 1, year: 1447, monthName: 'Muharram' },
      gregorianDate: new Date('2025-06-26'),
      type: 'commemoration',
      significance: 'high',
      color: 'bg-green-600',
      icon: '🎊',
      isRecurring: true,
      traditions: ['Reflection on the Hijra', 'Charitable giving', 'Family gatherings'],
      donationCauses: ['Refugee support', 'Education for migrants', 'Community development'],
      slug: 'islamic-new-year'
    },
    {
      id: '3',
      title: 'Day of Ashura',
      description: 'The 10th day of Muharram. A day of fasting and reflection, commemorating multiple historical events.',
      detailedDescription: 'Ashura is observed for various reasons: it\'s when Moses and the Israelites were saved from Pharaoh, and for Shia Muslims, it commemorates the martyrdom of Hussein ibn Ali.',
      islamicDate: { day: 10, month: 1, year: 1447, monthName: 'Muharram' },
      gregorianDate: new Date('2025-07-05'),
      type: 'fasting',
      significance: 'high',
      color: 'bg-slate-600',
      icon: '🤲',
      isRecurring: true,
      traditions: ['Fasting', 'Increased charity', 'Remembrance and reflection'],
      donationCauses: ['Orphan care', 'Widow support', 'Emergency relief'],
      slug: 'day-of-ashura'
    },

    // Rabi al-Awwal Events
    {
      id: '4',
      title: 'Mawlid an-Nabi',
      description: 'Celebrating the birth of Prophet Muhammad (peace be upon him). A day of joy and remembrance.',
      detailedDescription: 'Mawlid an-Nabi celebrates the birth of Prophet Muhammad. Muslims gather to recite poetry, share stories of the Prophet\'s life, and engage in charitable activities.',
      islamicDate: { day: 12, month: 3, year: 1447, monthName: 'Rabi al-Awwal' },
      gregorianDate: new Date('2025-09-04'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-amber-500',
      icon: '🌟',
      isRecurring: true,
      traditions: ['Reciting Qasidas', 'Distributing sweets', 'Community gatherings'],
      donationCauses: ['Islamic education', 'Youth programs', 'Community centers'],
      slug: 'mawlid-an-nabi'
    },

    // Rajab Events
    {
      id: '5',
      title: 'Isra and Mi\'raj',
      description: 'The Night Journey and Ascension of Prophet Muhammad (peace be upon him) from Mecca to Jerusalem and then to the heavens.',
      detailedDescription: 'Isra and Mi\'raj commemorates the miraculous night journey of Prophet Muhammad from Mecca to Jerusalem and his ascension through the seven heavens.',
      islamicDate: { day: 27, month: 7, year: 1447, monthName: 'Rajab' },
      gregorianDate: new Date('2026-01-14'),
      type: 'worship',
      significance: 'high',
      color: 'bg-cyan-600',
      icon: '🌃',
      isRecurring: true,
      traditions: ['Night prayers', 'Recitation of Quran', 'Spiritual reflection'],
      donationCauses: ['Mosque beautification', 'Religious education', 'Spiritual programs'],
      slug: 'isra-and-miraj'
    },
    {
      id: '6',
      title: 'Laylat al-Raghaib',
      description: 'The Night of Wishes - the first Thursday night of Rajab, a time for special prayers and supplications.',
      detailedDescription: 'Laylat al-Raghaib is observed on the first Thursday night of Rajab with special prayers and supplications for divine blessings.',
      islamicDate: { day: 5, month: 7, year: 1447, monthName: 'Rajab' },
      gregorianDate: new Date('2025-12-23'),
      type: 'worship',
      significance: 'medium',
      color: 'bg-purple-500',
      icon: '🌟',
      isRecurring: true,
      traditions: ['Special night prayers', 'Increased dhikr', 'Charitable giving'],
      donationCauses: ['Poor relief', 'Educational scholarships', 'Community support'],
      slug: 'laylat-al-raghaib'
    },

    // Sha'ban Events
    {
      id: '7',
      title: 'Laylat al-Bara\'at',
      description: 'The Night of Forgiveness - the 15th night of Sha\'ban, when Allah\'s mercy and forgiveness are especially abundant.',
      detailedDescription: 'Also known as Shab-e-Barat, this night is believed to be when Allah determines the destiny of individuals for the coming year.',
      islamicDate: { day: 15, month: 8, year: 1447, monthName: 'Sha\'ban' },
      gregorianDate: new Date('2026-02-12'),
      type: 'worship',
      significance: 'medium',
      color: 'bg-indigo-500',
      icon: '🌙',
      isRecurring: true,
      traditions: ['Night-long prayers', 'Seeking forgiveness', 'Visiting graves'],
      donationCauses: ['Debt relief', 'Medical aid', 'Family reconciliation'],
      slug: 'laylat-al-baraat'
    },

    // Ramadan Events
    {
      id: '8',
      title: 'Ramadan Begins',
      description: 'The holy month of fasting, prayer, and spiritual reflection begins.',
      detailedDescription: 'Ramadan is the ninth month of the Islamic calendar, observed by Muslims worldwide as a month of fasting, prayer, reflection and community.',
      islamicDate: { day: 1, month: 9, year: 1446, monthName: 'Ramadan' },
      gregorianDate: new Date('2025-02-28'),
      type: 'fasting',
      significance: 'high',
      color: 'bg-purple-600',
      icon: '🌙',
      isRecurring: true,
      traditions: ['Daily fasting', 'Increased prayer', 'Community iftars'],
      donationCauses: ['Iftar sponsorship', 'Zakat distribution', 'Food banks'],
      slug: 'ramadan-begins'
    },
    {
      id: '9',
      title: 'Laylat al-Qadr',
      description: 'The Night of Power - better than a thousand months. The most blessed night of the year.',
      detailedDescription: 'Laylat al-Qadr is the night when the first verses of the Quran were revealed to Prophet Muhammad. It\'s hidden in the last 10 nights of Ramadan.',
      islamicDate: { day: 27, month: 9, year: 1446, monthName: 'Ramadan' },
      gregorianDate: new Date('2025-03-26'),
      type: 'worship',
      significance: 'high',
      color: 'bg-indigo-600',
      icon: '✨',
      isRecurring: true,
      traditions: ['Night-long worship', 'Quran recitation', 'Intense supplication'],
      donationCauses: ['Quran distribution', 'Islamic libraries', 'Spiritual programs'],
      slug: 'laylat-al-qadr'
    },

    // Shawwal Events
    {
      id: '10',
      title: 'Eid al-Fitr',
      description: 'The Festival of Breaking the Fast. A joyous celebration after the holy month of Ramadan.',
      detailedDescription: 'Eid al-Fitr marks the end of Ramadan and is celebrated with special prayers, feasts, gift-giving, and charitable donations.',
      islamicDate: { day: 1, month: 10, year: 1446, monthName: 'Shawwal' },
      gregorianDate: new Date('2025-03-30'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-pink-500',
      icon: '🎉',
      isRecurring: true,
      traditions: ['Eid prayers', 'Festive meals', 'Gift giving', 'Zakat al-Fitr'],
      donationCauses: ['Eid gifts for orphans', 'Community celebrations', 'Joy for the poor'],
      slug: 'eid-al-fitr'
    },

    // Dhul Hijjah Events
    {
      id: '11',
      title: 'First 10 Days of Dhul Hijjah',
      description: 'The most blessed days of the year according to Prophet Muhammad (PBUH).',
      detailedDescription: 'These are the most sacred days in the Islamic calendar, when pilgrims perform Hajj and Muslims worldwide engage in increased worship.',
      islamicDate: { day: 1, month: 12, year: 1446, monthName: 'Dhul Hijjah' },
      gregorianDate: new Date('2025-05-27'),
      type: 'worship',
      significance: 'high',
      color: 'bg-orange-500',
      icon: '⭐',
      isRecurring: true,
      traditions: ['Increased dhikr', 'Charitable giving', 'Preparation for Hajj'],
      donationCauses: ['Hajj support fund', 'Sacrifice distribution', 'Pilgrim assistance'],
      slug: 'first-ten-days-dhul-hijjah'
    },
    {
      id: '12',
      title: 'Day of Arafah',
      description: 'The most important day of Hajj. Fasting is highly recommended for those not performing Hajj.',
      detailedDescription: 'The Day of Arafah is the climax of the Hajj pilgrimage. For non-pilgrims, fasting on this day expiates sins of the previous and coming year.',
      islamicDate: { day: 9, month: 12, year: 1446, monthName: 'Dhul Hijjah' },
      gregorianDate: new Date('2025-06-05'),
      type: 'fasting',
      significance: 'high',
      color: 'bg-blue-600',
      icon: '⛰️',
      isRecurring: true,
      traditions: ['Fasting (for non-pilgrims)', 'Increased supplication', 'Dhikr'],
      donationCauses: ['Pilgrimage support', 'Water wells', 'Emergency relief'],
      slug: 'day-of-arafah'
    },
    {
      id: '13',
      title: 'Eid al-Adha',
      description: 'The Festival of Sacrifice, commemorating Ibrahim\'s willingness to sacrifice his son for Allah.',
      detailedDescription: 'Eid al-Adha commemorates the willingness of Ibrahim to sacrifice his son as an act of obedience to Allah. Muslims who can afford it sacrifice an animal.',
      islamicDate: { day: 10, month: 12, year: 1446, monthName: 'Dhul Hijjah' },
      gregorianDate: new Date('2025-06-06'),
      type: 'celebration',
      significance: 'high',
      color: 'bg-red-500',
      icon: '🐑',
      isRecurring: true,
      traditions: ['Eid prayers', 'Animal sacrifice', 'Sharing meat with poor'],
      donationCauses: ['Qurbani distribution', 'Meat for the poor', 'Festival joy'],
      slug: 'eid-al-adha'
    },

    // Additional Monthly Events
    {
      id: '14',
      title: 'White Days Fasting',
      description: 'Recommended fasting on the 13th, 14th, and 15th of every Islamic month.',
      detailedDescription: 'The White Days are the 13th, 14th, and 15th of every lunar month, when the moon is at its brightest. Fasting these days is Sunnah.',
      islamicDate: { day: 13, month: 0, year: 0, monthName: 'Monthly' },
      gregorianDate: getNextWhiteDays(),
      type: 'fasting',
      significance: 'medium',
      color: 'bg-gray-400',
      icon: '🌕',
      isRecurring: true,
      traditions: ['Three days of fasting', 'Increased charity', 'Spiritual reflection'],
      donationCauses: ['Monthly food support', 'Regular charity', 'Continuous giving'],
      slug: 'white-days-fasting'
    },
    {
      id: '15',
      title: 'Monday & Thursday Fasting',
      description: 'Sunnah fasting on Mondays and Thursdays, following the Prophet\'s example.',
      detailedDescription: 'Prophet Muhammad (PBUH) used to fast on Mondays and Thursdays regularly, as these are blessed days when deeds are presented to Allah.',
      islamicDate: { day: 0, month: 0, year: 0, monthName: 'Weekly' },
      gregorianDate: getNextMondayOrThursday(),
      type: 'fasting',
      significance: 'medium',
      color: 'bg-teal-500',
      icon: '🌸',
      isRecurring: true,
      traditions: ['Voluntary fasting', 'Increased worship', 'Following Sunnah'],
      donationCauses: ['Weekly charity', 'Food distribution', 'Community support'],
      slug: 'monday-thursday-fasting'
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

function getNextWhiteDays(): Date {
  const today = new Date();
  const currentDate = today.getDate();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 13);
  
  if (currentDate <= 13) {
    return new Date(today.getFullYear(), today.getMonth(), 13);
  }
  return nextMonth;
}

function getNextMondayOrThursday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  let daysUntilNext;
  if (dayOfWeek === 0) daysUntilNext = 1; // Sunday -> Monday
  else if (dayOfWeek <= 1) daysUntilNext = 1 - dayOfWeek; // Monday
  else if (dayOfWeek <= 4) daysUntilNext = 4 - dayOfWeek; // Thursday
  else daysUntilNext = 8 - dayOfWeek; // Next Monday
  
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + daysUntilNext);
  return nextDay;
}

export function getCurrentIslamicDate(): IslamicDate {
  return gregorianToIslamic(new Date());
}

export function formatIslamicDate(islamicDate: IslamicDate): string {
  return `${islamicDate.day} ${islamicDate.monthName} ${islamicDate.year} AH`;
}

export function getEventBySlug(slug: string): IslamicEvent | undefined {
  return getUpcomingIslamicEvents().find(event => event.slug === slug);
}
