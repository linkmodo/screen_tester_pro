import { useRef, useEffect } from 'react';
import { Slider } from '../UI/Slider';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { generateBrightnessWindow } from '../../utils/testPatterns';

interface BrightnessTestProps {
  brightness: number;
  windowSize: number;
  onBrightnessChange: (brightness: number) => void;
  onWindowSizeChange: (size: number) => void;
}

export function BrightnessTest({
  brightness,
  windowSize,
  onBrightnessChange,
  onWindowSizeChange,
}: BrightnessTestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateBrightnessWindow(ctx, canvas.width, canvas.height, windowSize, brightness);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [brightness, windowSize]);

  const presets = [5, 10, 25, 50, 75, 100];

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <CollapsiblePanel title="Brightness Test">
        <div className="flex flex-col gap-4">
        <Slider
          min={0}
          max={100}
          value={brightness}
          onChange={onBrightnessChange}
          label="Brightness Level"
        />

        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => onBrightnessChange(preset)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                brightness === preset
                  ? 'bg-[#00d9ff] text-black'
                  : 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>

        <Slider
          min={10}
          max={100}
          value={windowSize}
          onChange={onWindowSizeChange}
          label="Window Size"
        />

        <p className="text-xs text-gray-400">
          Use this test to evaluate brightness uniformity and peak brightness levels.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
