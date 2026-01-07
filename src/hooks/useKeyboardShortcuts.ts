import { useEffect, useCallback } from 'react';
import { TestType } from '../types/test';
import { TESTS } from '../utils/constants';

interface KeyboardShortcutsOptions {
  onTestChange: (test: TestType) => void;
  onToggleFullscreen: () => void;
  onTogglePause: () => void;
  onReset: () => void;
  onShowHelp: () => void;
  onNext: () => void;
  onPrev: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function useKeyboardShortcuts(options: KeyboardShortcutsOptions) {
  const {
    onTestChange,
    onToggleFullscreen,
    onTogglePause,
    onReset,
    onShowHelp,
    onNext,
    onPrev,
    onIncrease,
    onDecrease,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key;

      if (key >= '1' && key <= '8') {
        const index = parseInt(key) - 1;
        if (TESTS[index]) {
          onTestChange(TESTS[index].id);
        }
        return;
      }

      switch (key.toLowerCase()) {
        case 'f':
          event.preventDefault();
          onToggleFullscreen();
          break;
        case 'f11':
          event.preventDefault();
          onToggleFullscreen();
          break;
        case ' ':
          event.preventDefault();
          onTogglePause();
          break;
        case 'r':
          onReset();
          break;
        case '?':
          onShowHelp();
          break;
        case 'arrowright':
          onNext();
          break;
        case 'arrowleft':
          onPrev();
          break;
        case '+':
        case '=':
          onIncrease();
          break;
        case '-':
        case '_':
          onDecrease();
          break;
        case 'escape':
          break;
      }
    },
    [
      onTestChange,
      onToggleFullscreen,
      onTogglePause,
      onReset,
      onShowHelp,
      onNext,
      onPrev,
      onIncrease,
      onDecrease,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
