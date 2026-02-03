import { useState, useRef, useCallback, ReactNode, useEffect } from 'react';

interface CollapsiblePanelProps {
  title: string;
  children: ReactNode;
  autoHideInFullscreen?: boolean;
}

export function CollapsiblePanel({
  title,
  children,
  autoHideInFullscreen = false,
}: CollapsiblePanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hideTimeoutRef = useRef<number>();

  useEffect(() => {
    if (position === null && panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: window.innerHeight - rect.height - 100,
      });
    }
  }, [position]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, input, select')) return;
    
    e.preventDefault();
    setIsDragging(true);
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      const maxX = window.innerWidth - (panelRef.current?.offsetWidth || 300);
      const maxY = window.innerHeight - (panelRef.current?.offsetHeight || 200);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Auto-hide in fullscreen after 5 seconds of mouse inactivity
  useEffect(() => {
    if (!autoHideInFullscreen) return;

    const resetHideTimer = () => {
      setIsHidden(false);
      
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      const isFullscreen = document.fullscreenElement !== null;
      if (isFullscreen) {
        hideTimeoutRef.current = window.setTimeout(() => {
          setIsHidden(true);
        }, 5000);
      }
    };

    const handleMouseMove = () => {
      resetHideTimer();
    };

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        resetHideTimer();
      } else {
        setIsHidden(false);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Initial check
    if (document.fullscreenElement) {
      resetHideTimer();
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [autoHideInFullscreen]);

  const positionStyle = position
    ? { left: position.x, top: position.y }
    : { left: '50%', bottom: '5rem', transform: 'translateX(-50%)' };

  return (
    <div
      ref={panelRef}
      className={`fixed bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 z-50 select-none transition-opacity duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={positionStyle}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-move border-b border-white/10 ${
          isDragging ? 'bg-white/5' : ''
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          </div>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isCollapsed ? 'max-h-0' : 'max-h-[500px]'
        }`}
      >
        <div className="p-4 min-w-[300px]">{children}</div>
      </div>
    </div>
  );
}
