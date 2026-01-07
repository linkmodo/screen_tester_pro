import { useState, useCallback } from 'react';
import { TestType } from '../types/test';

interface TestStateConfig {
  deadPixel: {
    currentColorIndex: number;
    autoMode: boolean;
    interval: number;
  };
  uniformity: {
    color: 'white' | 'gray' | 'black';
    brightness: number;
    gridEnabled: boolean;
    gridSize: number;
  };
  gradient: {
    direction: 'horizontal' | 'vertical' | 'diagonal';
    steps: number;
    preset: 'red-green' | 'green-blue' | 'blue-red' | 'full-spectrum';
  };
  responseTime: {
    speed: number;
    shape: 'circle' | 'square' | 'triangle';
    direction: 'horizontal' | 'vertical' | 'diagonal' | 'circular';
    showTrail: boolean;
  };
  contrast: {
    gridSize: number;
  };
  brightness: {
    brightness: number;
    windowSize: number;
  };
  textClarity: {
    fontSize: number;
    fontFamily: 'sans-serif' | 'serif' | 'monospace';
    letterSpacing: number;
    lineHeight: number;
  };
  viewingAngle: {
    pattern: 'checkerboard' | 'gradient';
    showIndicators: boolean;
  };
}

const defaultConfig: TestStateConfig = {
  deadPixel: {
    currentColorIndex: 0,
    autoMode: false,
    interval: 2000,
  },
  uniformity: {
    color: 'white',
    brightness: 100,
    gridEnabled: false,
    gridSize: 3,
  },
  gradient: {
    direction: 'horizontal',
    steps: 256,
    preset: 'full-spectrum',
  },
  responseTime: {
    speed: 1000,
    shape: 'circle',
    direction: 'horizontal',
    showTrail: true,
  },
  contrast: {
    gridSize: 8,
  },
  brightness: {
    brightness: 100,
    windowSize: 50,
  },
  textClarity: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  viewingAngle: {
    pattern: 'checkerboard',
    showIndicators: true,
  },
};

export function useTestState() {
  const [selectedTest, setSelectedTest] = useState<TestType>('dead-pixel');
  const [isPaused, setIsPaused] = useState(false);
  const [config, setConfig] = useState<TestStateConfig>(defaultConfig);

  const updateConfig = useCallback(
    <K extends keyof TestStateConfig>(
      testKey: K,
      updates: Partial<TestStateConfig[K]>
    ) => {
      setConfig((prev: TestStateConfig) => ({
        ...prev,
        [testKey]: {
          ...prev[testKey],
          ...updates,
        },
      }));
    },
    []
  );

  const resetConfig = useCallback((testKey?: keyof TestStateConfig) => {
    if (testKey) {
      setConfig((prev: TestStateConfig) => ({
        ...prev,
        [testKey]: defaultConfig[testKey],
      }));
    } else {
      setConfig(defaultConfig);
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev: boolean) => !prev);
  }, []);

  return {
    selectedTest,
    setSelectedTest,
    isPaused,
    setIsPaused,
    togglePause,
    config,
    updateConfig,
    resetConfig,
  };
}
