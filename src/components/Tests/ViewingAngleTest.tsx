import { useRef, useEffect } from 'react';
import { Select } from '../UI/Select';
import { Toggle } from '../UI/Toggle';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { generateCheckerboard, generateGradient } from '../../utils/testPatterns';

interface ViewingAngleTestProps {
  pattern: 'checkerboard' | 'gradient';
  showIndicators: boolean;
  onPatternChange: (pattern: 'checkerboard' | 'gradient') => void;
  onShowIndicatorsChange: (show: boolean) => void;
}

export function ViewingAngleTest({
  pattern,
  showIndicators,
  onPatternChange,
  onShowIndicatorsChange,
}: ViewingAngleTestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (pattern === 'checkerboard') {
        generateCheckerboard(ctx, canvas.width, canvas.height, 8);
      } else {
        const colors = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'];
        generateGradient(ctx, canvas.width, canvas.height, 'horizontal', colors);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [pattern]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {showIndicators && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded">
            ← View from left
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black/50 px-3 py-2 rounded">
            View from right →
          </div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-2 rounded">
            ↑ View from above
          </div>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-2 rounded">
            ↓ View from below
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black/50 px-4 py-3 rounded-lg text-center">
            <div className="text-lg font-medium">Optimal Viewing Position</div>
            <div className="text-sm text-gray-300">Look at screen from different angles</div>
          </div>
        </div>
      )}

      <CollapsiblePanel title="Viewing Angle Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Test Pattern"
          value={pattern}
          onChange={(v) => onPatternChange(v as typeof pattern)}
          options={[
            { value: 'checkerboard', label: 'Checkerboard' },
            { value: 'gradient', label: 'Grayscale Gradient' },
          ]}
        />

        <Toggle
          checked={showIndicators}
          onChange={onShowIndicatorsChange}
          label="Show Viewing Indicators"
        />

        <p className="text-xs text-gray-400">
          Move your head to view the screen from different angles. Check for color shift, contrast loss, or brightness changes.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
