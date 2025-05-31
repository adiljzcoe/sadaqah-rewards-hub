
import React from 'react';

const charityLogos = [
  { name: 'One Nation', logo: '/lovable-uploads/06a0c139-e89f-4071-98fb-da09f757e1eb.png' },
  { name: 'Human Appeal', logo: '/lovable-uploads/fe60c231-8422-4bf0-83e7-47b219d91e70.png' },
  { name: 'Muslim Global Relief', logo: '/lovable-uploads/051509ed-1b47-49b2-8b42-123906f123c6.png' },
  { name: 'Islamic Help', logo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png' },
  { name: 'Muslim Aid', logo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png' }
];

const CharityTicker = () => {
  return (
    <div className="bg-blue-50 border-b border-blue-100 py-1 overflow-hidden w-full">
      <div className="container mx-auto px-4 max-w-full">
        <div className="text-center text-xs text-blue-700 mb-1 font-normal opacity-80">
          Funds distributed to our trusted charity partners
        </div>
        
        {/* Ticker container */}
        <div className="relative overflow-hidden max-w-full">
          <div className="flex animate-ticker space-x-8">
            {/* First set of logos */}
            {charityLogos.map((charity, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={charity.logo} 
                    alt={charity.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {charityLogos.map((charity, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 hover:scale-110 transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={charity.logo} 
                    alt={charity.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityTicker;
