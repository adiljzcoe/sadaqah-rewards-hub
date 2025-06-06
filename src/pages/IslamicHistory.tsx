
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Star, 
  MapPin, 
  Calendar, 
  Crown,
  Sword,
  Mosque,
  Scroll,
  Globe,
  Users,
  Heart,
  Lightbulb,
  ArrowRight,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useIslamicThemes } from '@/hooks/useIslamicThemes';

const IslamicHistory = () => {
  const { themes } = useIslamicThemes();
  const currentTheme = themes['traditional-green'];
  const [selectedEra, setSelectedEra] = useState(0);
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  const historicalEras = [
    {
      id: 0,
      title: "The Life of Prophet Muhammad ﷺ",
      period: "570 - 632 CE",
      icon: <Star className="h-6 w-6" />,
      color: "from-yellow-400 to-amber-500",
      description: "The beginning of Islam and the life of the final messenger",
      keyEvents: [
        { year: "570 CE", event: "Birth of Prophet Muhammad ﷺ in Makkah", icon: <Star className="h-4 w-4" /> },
        { year: "610 CE", event: "First revelation in Cave Hira", icon: <BookOpen className="h-4 w-4" /> },
        { year: "622 CE", event: "Hijra - Migration to Madinah", icon: <MapPin className="h-4 w-4" /> },
        { year: "632 CE", event: "Death of Prophet Muhammad ﷺ", icon: <Heart className="h-4 w-4" /> }
      ],
      story: "In the bustling city of Makkah, where merchants traveled great distances and tribes gathered around the sacred Kaaba, a child was born who would change the world forever. Muhammad ﷺ, born into the noble tribe of Quraysh, was known even before his prophethood for his honesty and trustworthiness, earning him the titles Al-Amin (The Trustworthy) and As-Sadiq (The Truthful).",
      fullStory: "At the age of 40, while meditating in the Cave of Hira, Muhammad ﷺ received his first revelation from Allah through the Angel Jibril (Gabriel). This moment marked the beginning of Islam. Despite facing persecution in Makkah, the message of monotheism, justice, and compassion slowly gained followers. The Hijra to Madinah in 622 CE marked not just a physical migration, but the beginning of the first Islamic state, where the principles of Islam were implemented in society. The Prophet ﷺ established a constitution that guaranteed rights for all citizens, regardless of religion, creating a model of peaceful coexistence.",
      achievements: ["Unification of Arabian tribes", "Establishment of Islamic principles", "Creation of the first Islamic state", "Preservation of the Quran"]
    },
    {
      id: 1,
      title: "The Rightly Guided Caliphs",
      period: "632 - 661 CE",
      icon: <Crown className="h-6 w-6" />,
      color: "from-emerald-400 to-green-500",
      description: "The era of the four Caliphs who knew the Prophet personally",
      keyEvents: [
        { year: "632 CE", event: "Abu Bakr becomes first Caliph", icon: <Crown className="h-4 w-4" /> },
        { year: "634 CE", event: "Umar ibn al-Khattab's caliphate begins", icon: <Scroll className="h-4 w-4" /> },
        { year: "644 CE", event: "Uthman ibn Affan compiles the Quran", icon: <BookOpen className="h-4 w-4" /> },
        { year: "656 CE", event: "Ali ibn Abi Talib becomes fourth Caliph", icon: <Sword className="h-4 w-4" /> }
      ],
      story: "After the Prophet's ﷺ passing, his closest companions took on the monumental task of preserving and spreading Islam. Abu Bakr, known for his unwavering faith, consolidated the Arabian Peninsula. Umar ibn al-Khattab, the just ruler, expanded the Islamic state to unprecedented territories while maintaining justice and simplicity.",
      fullStory: "The Rashidun Caliphate was marked by remarkable expansion and internal development. Under Abu Bakr, the riddah wars unified Arabia under Islamic rule. Umar's reign saw the conquest of Persia, parts of the Byzantine Empire, and Egypt, but more importantly, he established the principles of Islamic governance - justice, consultation (shura), and welfare for all citizens. Uthman's standardization of the Quranic text ensured its preservation for all time. Ali's caliphate, though turbulent, emphasized Islamic jurisprudence and spiritual wisdom. These four leaders set the standard for Islamic leadership and governance.",
      achievements: ["Compilation of the Quran", "Establishment of Islamic law", "Massive territorial expansion", "Creation of administrative systems"]
    },
    {
      id: 2,
      title: "The Umayyad Dynasty",
      period: "661 - 750 CE",
      icon: <Globe className="h-6 w-6" />,
      color: "from-blue-400 to-indigo-500",
      description: "The first Muslim dynasty that spread Islam across three continents",
      keyEvents: [
        { year: "661 CE", event: "Muawiya establishes Umayyad rule", icon: <Crown className="h-4 w-4" /> },
        { year: "691 CE", event: "Construction of Dome of the Rock", icon: <Mosque className="h-4 w-4" /> },
        { year: "711 CE", event: "Muslim conquest of Iberia", icon: <Sword className="h-4 w-4" /> },
        { year: "732 CE", event: "Battle of Tours in France", icon: <MapPin className="h-4 w-4" /> }
      ],
      story: "From their capital in Damascus, the Umayyads transformed Islam from an Arabian religious movement into a global empire. Their armies carried the message of Islam from Spain in the west to India in the east, creating one of the largest empires in human history.",
      fullStory: "The Umayyad period marked Islam's transformation into a world civilization. With Damascus as their capital, they created an empire spanning from Al-Andalus (Spain) to Central Asia. The Umayyads were master administrators and builders - they constructed magnificent mosques like the Dome of the Rock in Jerusalem and the Great Mosque of Damascus. They established Arabic as the administrative language, created a postal system, and minted the first Islamic coins. Their rule in Al-Andalus led to a golden age of learning, tolerance, and cultural exchange that would last for centuries.",
      achievements: ["Largest Islamic empire in history", "Architectural marvels", "Administrative innovations", "Cultural synthesis"]
    },
    {
      id: 3,
      title: "The Abbasid Golden Age",
      period: "750 - 1258 CE",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-purple-400 to-pink-500",
      description: "The intellectual and cultural zenith of Islamic civilization",
      keyEvents: [
        { year: "750 CE", event: "Abbasids overthrow Umayyads", icon: <Crown className="h-4 w-4" /> },
        { year: "762 CE", event: "Foundation of Baghdad", icon: <Mosque className="h-4 w-4" /> },
        { year: "830 CE", event: "House of Wisdom established", icon: <BookOpen className="h-4 w-4" /> },
        { year: "1258 CE", event: "Mongol invasion ends Abbasid rule", icon: <Sword className="h-4 w-4" /> }
      ],
      story: "In the magnificent city of Baghdad, known as the 'Round City of Peace,' scholars from across the known world gathered to translate, preserve, and advance human knowledge. The House of Wisdom became the world's greatest center of learning, where Islamic, Greek, Persian, and Indian traditions merged.",
      fullStory: "The Abbasid period represents the intellectual golden age of Islamic civilization. Baghdad, their capital, became the largest city in the world, attracting scholars, scientists, philosophers, and poets. The House of Wisdom (Bayt al-Hikma) was a legendary center of learning where works of Aristotle, Plato, and other Greek philosophers were translated and preserved. Muslim scholars made groundbreaking discoveries in mathematics (algebra), medicine, astronomy, chemistry, and philosophy. Figures like Al-Khwarizmi (mathematics), Al-Razi (medicine), Al-Kindi (philosophy), and Ibn Sina (Avicenna) laid foundations for modern science. The Abbasids also fostered a culture of tolerance and learning that included Christians, Jews, and people of all backgrounds.",
      achievements: ["Preservation of classical knowledge", "Scientific revolution", "Medical advances", "Mathematical innovations"]
    },
    {
      id: 4,
      title: "Al-Andalus: Islamic Spain",
      period: "711 - 1492 CE",
      icon: <Mosque className="h-6 w-6" />,
      color: "from-red-400 to-orange-500",
      description: "The jewel of Islamic civilization in Europe",
      keyEvents: [
        { year: "711 CE", event: "Tariq ibn Ziyad crosses into Iberia", icon: <MapPin className="h-4 w-4" /> },
        { year: "785 CE", event: "Construction of Córdoba Mosque begins", icon: <Mosque className="h-4 w-4" /> },
        { year: "1031 CE", event: "Fall of Córdoba Caliphate", icon: <Crown className="h-4 w-4" /> },
        { year: "1492 CE", event: "Fall of Granada, end of Muslim rule", icon: <Heart className="h-4 w-4" /> }
      ],
      story: "In the gardens of Córdoba and the halls of the Alhambra, Islamic civilization reached artistic and intellectual heights that made Al-Andalus the envy of medieval Europe. Here, Muslims, Christians, and Jews lived together in relative harmony, creating a unique culture of tolerance and learning.",
      fullStory: "Al-Andalus represented one of the most remarkable experiments in religious and cultural coexistence in human history. Córdoba became the largest and most prosperous city in Europe, with over 500,000 inhabitants, 70 libraries, and countless schools. The Great Mosque of Córdoba, with its famous horseshoe arches, remains one of the world's architectural wonders. Islamic Spain was a beacon of learning - it was here that the works of Aristotle and other Greek philosophers were preserved and transmitted to medieval Europe. Scholars like Averroes (Ibn Rushd) and Maimonides (a Jewish philosopher) flourished under Islamic patronage. The Alhambra in Granada represents the pinnacle of Islamic art and architecture, with its intricate geometric patterns and poetic inscriptions.",
      achievements: ["Architectural masterpieces", "Religious tolerance", "Intellectual renaissance", "Cultural bridge between East and West"]
    },
    {
      id: 5,
      title: "The Ottoman Empire",
      period: "1299 - 1924 CE",
      icon: <Crown className="h-6 w-6" />,
      color: "from-teal-400 to-cyan-500",
      description: "The last great Islamic empire and caliphate",
      keyEvents: [
        { year: "1299 CE", event: "Osman I founds Ottoman dynasty", icon: <Crown className="h-4 w-4" /> },
        { year: "1453 CE", event: "Conquest of Constantinople", icon: <Sword className="h-4 w-4" /> },
        { year: "1529 CE", event: "Siege of Vienna", icon: <MapPin className="h-4 w-4" /> },
        { year: "1924 CE", event: "Abolition of the Caliphate", icon: <Scroll className="h-4 w-4" /> }
      ],
      story: "From a small beylik in Anatolia, the Ottomans built an empire that lasted over 600 years, ruling territories across Europe, Asia, and Africa. They saw themselves as protectors of Islam and guardians of the holy cities of Makkah and Madinah.",
      fullStory: "The Ottoman Empire was the longest-lasting Islamic empire in history, governing diverse populations across three continents for over six centuries. Under Mehmed II, they conquered Constantinople in 1453, ending the Byzantine Empire and making Istanbul their magnificent capital. The Ottomans developed a sophisticated administrative system that allowed considerable autonomy for different religious and ethnic communities through the millet system. During their golden age under Suleiman the Magnificent, they were a major European power, advancing to the gates of Vienna twice. The empire was known for its architectural achievements, including the Blue Mosque and Hagia Sophia's conversion. They served as protectors of the Two Holy Mosques and the last Caliphate until its abolition in 1924.",
      achievements: ["Longest Islamic empire", "Architectural wonders", "Administrative excellence", "Cultural diversity"]
    }
  ];

  const progressPercentage = ((selectedEra + 1) / historicalEras.length) * 100;

  return (
    <div className={`min-h-screen ${currentTheme.containerClasses}`}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-3 p-4 rounded-full ${currentTheme.cardClasses} shadow-lg mb-6`}>
            <BookOpen className={`h-8 w-8 ${currentTheme.textClasses}`} />
            <h1 className={`text-4xl font-bold ${currentTheme.textClasses}`}>Journey Through Islamic History</h1>
          </div>
          <p className={`text-xl ${currentTheme.textClasses} opacity-80 max-w-3xl mx-auto`}>
            Discover the rich tapestry of Islamic civilization through an interactive journey spanning over 1,400 years of history, innovation, and cultural achievement.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className={`${currentTheme.cardClasses} rounded-lg p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${currentTheme.textClasses}`}>Your Historical Journey</h3>
            <Badge className={`${currentTheme.accentClasses}`}>
              {selectedEra + 1} of {historicalEras.length} Eras
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>
            {progressPercentage.toFixed(0)}% of Islamic history explored
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${currentTheme.textClasses} mb-6 text-center`}>Historical Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historicalEras.map((era, index) => (
              <div
                key={era.id}
                onClick={() => setSelectedEra(index)}
                className={`${currentTheme.cardClasses} p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                  selectedEra === index ? `ring-2 ring-emerald-500 ${currentTheme.accentClasses}` : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${era.color} rounded-full flex items-center justify-center text-white`}>
                    {era.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${currentTheme.textClasses}`}>{era.title}</h3>
                    <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>{era.period}</p>
                  </div>
                </div>
                <p className={`text-sm ${currentTheme.textClasses} opacity-80`}>{era.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Era Details */}
        <div className={`${currentTheme.cardClasses} rounded-lg p-8 mb-8`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-r ${historicalEras[selectedEra].color} rounded-full flex items-center justify-center text-white`}>
              {historicalEras[selectedEra].icon}
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${currentTheme.textClasses}`}>{historicalEras[selectedEra].title}</h2>
              <p className={`text-lg ${currentTheme.textClasses} opacity-70`}>{historicalEras[selectedEra].period}</p>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold ${currentTheme.textClasses} mb-4 flex items-center gap-2`}>
              <BookOpen className="h-5 w-5" />
              The Story
            </h3>
            <p className={`text-lg ${currentTheme.textClasses} opacity-90 leading-relaxed mb-4`}>
              {historicalEras[selectedEra].story}
            </p>
            
            <Button
              onClick={() => setExpandedStory(expandedStory === selectedEra ? null : selectedEra)}
              variant="outline"
              className={`${currentTheme.textClasses} border-current`}
            >
              {expandedStory === selectedEra ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Continue Reading
                </>
              )}
            </Button>

            {expandedStory === selectedEra && (
              <div className="mt-4 animate-fade-in">
                <p className={`text-lg ${currentTheme.textClasses} opacity-90 leading-relaxed`}>
                  {historicalEras[selectedEra].fullStory}
                </p>
              </div>
            )}
          </div>

          {/* Key Events */}
          <div className="mb-8">
            <h3 className={`text-xl font-semibold ${currentTheme.textClasses} mb-4 flex items-center gap-2`}>
              <Calendar className="h-5 w-5" />
              Key Events
            </h3>
            <div className="space-y-3">
              {historicalEras[selectedEra].keyEvents.map((event, index) => (
                <div key={index} className={`flex items-center gap-4 p-3 ${currentTheme.accentClasses} rounded-lg`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${historicalEras[selectedEra].color} rounded-full flex items-center justify-center text-white`}>
                    {event.icon}
                  </div>
                  <div>
                    <span className={`font-semibold ${currentTheme.textClasses}`}>{event.year}</span>
                    <p className={`${currentTheme.textClasses} opacity-90`}>{event.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className={`text-xl font-semibold ${currentTheme.textClasses} mb-4 flex items-center gap-2`}>
              <Star className="h-5 w-5" />
              Major Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {historicalEras[selectedEra].achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 ${currentTheme.accentClasses} rounded-lg`}>
                  <div className={`w-2 h-2 bg-gradient-to-r ${historicalEras[selectedEra].color} rounded-full`}></div>
                  <span className={`${currentTheme.textClasses} font-medium`}>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={() => setSelectedEra(Math.max(0, selectedEra - 1))}
            disabled={selectedEra === 0}
            className={`bg-gradient-to-r ${currentTheme.gradientClasses} text-white hover:opacity-90`}
          >
            Previous Era
          </Button>
          
          <Button
            onClick={() => setSelectedEra(Math.min(historicalEras.length - 1, selectedEra + 1))}
            disabled={selectedEra === historicalEras.length - 1}
            className={`bg-gradient-to-r ${currentTheme.gradientClasses} text-white hover:opacity-90`}
          >
            Next Era
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IslamicHistory;
