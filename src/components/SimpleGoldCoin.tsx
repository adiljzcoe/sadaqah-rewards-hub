
import React from 'react';

interface SimpleGoldCoinProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const SimpleGoldCoin: React.FC<SimpleGoldCoinProps> = ({ 
  size = 24, 
  className = "",
  children 
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-lg border-2 border-yellow-200"
        style={{
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2),
            0 4px 8px rgba(0, 0, 0, 0.3)
          `,
          animation: 'spin 4s linear infinite'
        }}
      >
        {/* Inner highlight circle */}
        <div 
          className="absolute top-1 left-1 w-3/4 h-3/4 rounded-full bg-gradient-to-br from-yellow-200 to-transparent opacity-60"
          style={{ transform: 'scale(0.7)' }}
        />
        
        {/* Center emboss */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 border border-yellow-300"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.2)'
            }}
          />
        </div>
      </div>
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center text-amber-900 font-bold text-xs">
          {children}
        </div>
      )}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotateY(0deg); }
          25% { transform: rotateY(90deg); }
          50% { transform: rotateY(180deg); }
          75% { transform: rotateY(270deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SimpleGoldCoin;
