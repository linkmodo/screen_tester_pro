import { useState } from 'react';
import { TooltipProps } from '../../types/ui';

export function Tooltip({
  content,
  children,
  position = 'top',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute ${positionStyles[position]} z-50 px-3 py-2 text-sm text-white bg-[#333] rounded-lg shadow-lg whitespace-nowrap`}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-[#333] transform rotate-45 ${
              position === 'top'
                ? 'top-full left-1/2 -translate-x-1/2 -mt-1'
                : position === 'bottom'
                ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
                : position === 'left'
                ? 'left-full top-1/2 -translate-y-1/2 -ml-1'
                : 'right-full top-1/2 -translate-y-1/2 -mr-1'
            }`}
          />
        </div>
      )}
    </div>
  );
}
