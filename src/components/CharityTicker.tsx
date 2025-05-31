
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
    <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-b border-blue-200 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-blue-700 mb-3 font-medium">
          Our fundraising is distributed to our chosen charities below
        </div>
        
        {/* Ticker container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-ticker space-x-8">
            {/* First set of logos */}
            {charityLogos.map((charity, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center space-x-3 whitespace-nowrap flex-shrink-0 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/80 transition-all duration-300 border border-blue-200/50 shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src={charity.logo} 
                    alt={charity.name}
                    className="max-w-full max-h-full object-contain filter brightness-75 contrast-125 hue-rotate-180 saturate-150"
                    style={{
                      filter: 'brightness(0.8) contrast(1.2) hue-rotate(200deg) saturate(1.3)'
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-blue-800">{charity.name}</span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {charityLogos.map((charity, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center space-x-3 whitespace-nowrap flex-shrink-0 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/80 transition-all duration-300 border border-blue-200/50 shadow-sm hover:shadow-md"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src={charity.logo} 
                    alt={charity.name}
                    className="max-w-full max-h-full object-contain filter brightness-75 contrast-125 hue-rotate-180 saturate-150"
                    style={{
                      filter: 'brightness(0.8) contrast(1.2) hue-rotate(200deg) saturate(1.3)'
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-blue-800">{charity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityTicker;
