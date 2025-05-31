
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
    <div className="bg-white py-6 w-full border-b border-gray-100 overflow-hidden max-w-full">
      <div className="container mx-auto px-4 overflow-hidden max-w-full">
        <div className="text-center text-xs text-gray-400 mb-6 font-light tracking-wide">
          Charities we choose to fundraise for
        </div>
        
        {/* Ticker container */}
        <div className="relative overflow-hidden w-full max-w-full">
          <div 
            className="flex space-x-12 animate-ticker"
            style={{ 
              width: 'calc(240px * 10)',
              minWidth: '200%'
            }}
          >
            {/* First set of logos */}
            {charityLogos.map((charity, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 opacity-40 hover:opacity-60 transition-opacity duration-300"
                style={{ minWidth: '120px', maxWidth: '120px' }}
              >
                <img 
                  src={charity.logo} 
                  alt={charity.name}
                  className="w-20 h-10 object-contain filter grayscale"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {charityLogos.map((charity, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center justify-center whitespace-nowrap flex-shrink-0 opacity-40 hover:opacity-60 transition-opacity duration-300"
                style={{ minWidth: '120px', maxWidth: '120px' }}
              >
                <img 
                  src={charity.logo} 
                  alt={charity.name}
                  className="w-20 h-10 object-contain filter grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityTicker;
