import { TestType } from '../../types/test';
import { TESTS } from '../../utils/constants';

interface FooterProps {
  selectedTest: TestType;
  isPaused: boolean;
}

export function Footer({ selectedTest, isPaused }: FooterProps) {
  const currentTest = TESTS.find((t) => t.id === selectedTest);

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[40px] bg-[#0f0f0f]/90 backdrop-blur-sm border-t border-[#1a1a1a] flex items-center justify-between px-6 z-40">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          Current: <span className="text-white font-medium">{currentTest?.name}</span>
        </span>
        {isPaused && (
          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
            PAUSED
          </span>
        )}
      </div>

      <div className="flex items-center gap-6 text-xs text-gray-500">
        <span>
          <kbd className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-gray-400">1-8</kbd> Switch Test
        </span>
        <span>
          <kbd className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-gray-400">F</kbd> Fullscreen
        </span>
        <span>
          <kbd className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-gray-400">Space</kbd> Pause
        </span>
        <span>
          <kbd className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-gray-400">←→</kbd> Navigate
        </span>
        <span>
          <kbd className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-gray-400">?</kbd> Help
        </span>
      </div>
    </footer>
  );
}
