import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FloatingTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

const FloatingTooltip = ({ 
  children, 
  content, 
  side = 'top', 
  align = 'center' 
}: FloatingTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 320; // max-w-xs equivalent
    const tooltipHeight = 100; // approximate height
    
    let top = 0;
    let left = 0;

    // Calculate position based on side
    switch (side) {
      case 'top':
        top = rect.top - tooltipHeight - 10;
        break;
      case 'bottom':
        top = rect.bottom + 10;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
        break;
    }

    // Calculate left position for top/bottom
    if (side === 'top' || side === 'bottom') {
      switch (align) {
        case 'start':
          left = rect.left;
          break;
        case 'center':
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case 'end':
          left = rect.right - tooltipWidth;
          break;
      }
    }

    // Keep tooltip within viewport
    const padding = 10;
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipWidth - padding));
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipHeight - padding));

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  const tooltip = isVisible ? createPortal(
    <div
      className="fixed z-[99999] max-w-xs bg-slate-900 text-white border border-slate-700 shadow-2xl p-4 rounded-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        pointerEvents: 'none'
      }}
    >
      {content}
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {tooltip}
    </>
  );
};

export default FloatingTooltip;
