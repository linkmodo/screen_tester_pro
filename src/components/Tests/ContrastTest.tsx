import { useRef, useEffect } from 'react';
import { Select } from '../UI/Select';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { generateCheckerboard } from '../../utils/testPatterns';

interface ContrastTestProps {
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

export function ContrastTest({ gridSize, onGridSizeChange }: ContrastTestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateCheckerboard(ctx, canvas.width, canvas.height, gridSize);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gridSize]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <CollapsiblePanel title="Contrast Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Grid Size"
          value={gridSize}
          onChange={(v) => onGridSizeChange(Number(v))}
          options={[
            { value: 2, label: '2x2' },
            { value: 4, label: '4x4' },
            { value: 8, label: '8x8' },
            { value: 16, label: '16x16' },
            { value: 32, label: '32x32' },
            { value: 50, label: '50x50' },
          ]}
        />

        <p className="text-xs text-gray-400">
          Check for clear separation between black and white squares. Look for any bleeding or blurring at edges.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
