import { Button } from '../UI/Button';
import { Tooltip } from '../UI/Tooltip';

interface HeaderProps {
  onShowHelp: () => void;
}

export function Header({ onShowHelp }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff00] rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-sm">ST</span>
        </div>
        <h1 className="text-xl font-semibold text-white">
          Screen Tester <span className="text-[#00d9ff]">Pro</span>
        </h1>
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
