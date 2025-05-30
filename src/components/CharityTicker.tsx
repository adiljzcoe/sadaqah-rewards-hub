
import React from 'react';

const charityLogos = [
  { name: 'Islamic Relief', logo: '🌍' },
  { name: 'Human Appeal', logo: '❤️' },
  { name: 'Muslim Aid', logo: '🤝' },
  { name: 'MATW Project', logo: '🏠' },
  { name: 'Penny Appeal', logo: '💰' },
  { name: 'Islamic Aid', logo: '🕌' },
  { name: 'Al-Khair Foundation', logo: '✨' },
  { name: 'Helping Hand', logo: '🤲' },
  { name: 'One Nation', logo: '🌟' },
  { name: 'Ummah Welfare Trust', logo: '☪️' },
  { name: 'Save the Children', logo: '👶' },
  { name: 'Oxfam', logo: '🌱' }
];

const CharityTicker = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600 mb-2 font-medium">
          Trusted by leading charities worldwide
        </div>
        
        {/* Ticker container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] space-x-8">
            {/* First set of logos */}
            {charityLogos.map((charity, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap flex-shrink-0 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{charity.logo}</span>
                <span className="text-sm font-medium text-gray-700">{charity.name}</span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {charityLogos.map((charity, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-2 whitespace-nowrap flex-shrink-0 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg">{charity.logo}</span>
                <span className="text-sm font-medium text-gray-700">{charity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default CharityTicker;
