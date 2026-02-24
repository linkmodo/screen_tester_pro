import { useRef, useEffect } from 'react';
import { Select } from '../UI/Select';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { generateGradientColors } from '../../utils/colorUtils';
import { generateSteppedGradient } from '../../utils/testPatterns';

interface ColorGradientTestProps {
  direction: 'horizontal' | 'vertical' | 'diagonal';
  steps: number;
  preset: 'red-green' | 'green-blue' | 'blue-red' | 'full-spectrum';
  onDirectionChange: (direction: 'horizontal' | 'vertical' | 'diagonal') => void;
  onStepsChange: (steps: number) => void;
  onPresetChange: (preset: 'red-green' | 'green-blue' | 'blue-red' | 'full-spectrum') => void;
}

export function ColorGradientTest({
  direction,
  steps,
  preset,
  onDirectionChange,
  onStepsChange,
  onPresetChange,
}: ColorGradientTestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGradient();
    };

    const drawGradient = () => {
      const colors = generateGradientColors(steps, preset);
      generateSteppedGradient(ctx, canvas.width, canvas.height, direction, colors);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [direction, steps, preset]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <CollapsiblePanel title="Color Gradient Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Gradient Preset"
          value={preset}
          onChange={(v) => onPresetChange(v as typeof preset)}
          options={[
            { value: 'full-spectrum', label: 'Full RGB Spectrum' },
            { value: 'red-green', label: 'Red to Green' },
            { value: 'green-blue', label: 'Green to Blue' },
            { value: 'blue-red', label: 'Blue to Red' },
          ]}
        />

        <Select
          label="Direction"
          value={direction}
          onChange={(v) => onDirectionChange(v as typeof direction)}
          options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
            { value: 'diagonal', label: 'Diagonal' },
          ]}
        />

        <Select
          label="Color Steps"
          value={steps}
          onChange={(v) => onStepsChange(Number(v))}
          options={[
            { value: 8, label: '8 steps' },
            { value: 16, label: '16 steps' },
            { value: 32, label: '32 steps' },
            { value: 64, label: '64 steps' },
            { value: 128, label: '128 steps' },
            { value: 256, label: '256 steps' },
            { value: 512, label: '512 steps' },
            { value: 1024, label: '1024 steps' },
            { value: 2048, label: '2048 steps (ultra smooth)' },
            { value: 4096, label: '4096 steps (max)' },
          ]}
        />

        <p className="text-xs text-gray-400">
          Look for visible banding between color steps. Fewer steps make banding more visible.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
