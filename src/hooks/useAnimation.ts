import { useRef, useCallback, useEffect, useState } from 'react';

interface AnimationState {
  isRunning: boolean;
  currentTime: number;
  deltaTime: number;
}

export function useAnimation(
  callback: (state: AnimationState) => void,
  autoStart: boolean = false
) {
  const [isRunning, setIsRunning] = useState(autoStart);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      callback({
        isRunning: true,
        currentTime: timestamp - startTimeRef.current,
        deltaTime,
      });

      frameRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      lastTimeRef.current = performance.now();
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [isRunning, animate]);

  const stop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const toggle = useCallback(() => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  }, [isRunning, start, stop]);

  const reset = useCallback(() => {
    startTimeRef.current = 0;
    lastTimeRef.current = 0;
  }, []);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [autoStart, start]);

  return {
    isRunning,
    start,
    stop,
    toggle,
    reset,
  };
}
