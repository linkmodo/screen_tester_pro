import { Button } from '../UI/Button';
import { Tooltip } from '../UI/Tooltip';

interface HeaderProps {
  onShowHelp: () => void;
}

export function Header({ onShowHelp }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 relative flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Monitor frame */}
            <rect x="3" y="4" width="30" height="22" rx="3" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
            {/* Screen inner */}
            <rect x="6" y="7" width="24" height="16" rx="1.5" fill="#0f0f0f" />
            {/* Pixel grid */}
            <rect x="8" y="9" width="4" height="4" rx="0.5" fill="#00d9ff" opacity="0.9" />
            <rect x="13" y="9" width="4" height="4" rx="0.5" fill="#00ff00" opacity="0.9" />
            <rect x="18" y="9" width="4" height="4" rx="0.5" fill="#ff3366" opacity="0.7" />
            <rect x="23" y="9" width="4" height="4" rx="0.5" fill="#ffaa00" opacity="0.7" />
            <rect x="8" y="14" width="4" height="4" rx="0.5" fill="#aa44ff" opacity="0.7" />
            <rect x="13" y="14" width="4" height="4" rx="0.5" fill="#ffffff" opacity="0.5" />
            <rect x="18" y="14" width="4" height="4" rx="0.5" fill="#00d9ff" opacity="0.6" />
            <rect x="23" y="14" width="4" height="4" rx="0.5" fill="#00ff00" opacity="0.6" />
            {/* Stand */}
            <path d="M14 26L13 30H23L22 26" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="11" y1="30" x2="25" y2="30" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Checkmark overlay */}
            <circle cx="27" cy="27" r="6" fill="#0f0f0f" stroke="#00ff00" strokeWidth="1.5" />
            <path d="M24 27L26 29L30 25" stroke="#00ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="logoGrad" x1="3" y1="4" x2="33" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00d9ff" />
                <stop offset="1" stopColor="#00ff00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white leading-tight tracking-tight">
            Screen Tester <span className="text-[#00d9ff]">Pro</span>
          </h1>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#00ff00]/80 leading-tight">
            Display &amp; Burn-In Prevention
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] rounded-lg border border-[#00d9ff]/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#00d9ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
          <span className="text-sm text-gray-300">
            Press <kbd className="px-2 py-0.5 bg-[#333] rounded text-[#00d9ff] font-semibold">F</kbd> or <kbd className="px-2 py-0.5 bg-[#333] rounded text-[#00d9ff] font-semibold">F11</kbd> for fullscreen
          </span>
        </div>

        <Tooltip content="Keyboard Shortcuts (?)">
          <Button variant="tertiary" size="sm" onClick={onShowHelp}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </Tooltip>
      </div>
    </header>
  );
}
