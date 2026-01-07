import { useEffect, useCallback } from 'react';
import { DEAD_PIXEL_COLORS } from '../../utils/constants';
import { Button } from '../UI/Button';
import { Slider } from '../UI/Slider';
import { Toggle } from '../UI/Toggle';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';

interface DeadPixelTestProps {
  currentColorIndex: number;
  autoMode: boolean;
  interval: number;
  isPaused: boolean;
  onColorChange: (index: number) => void;
  onAutoModeChange: (auto: boolean) => void;
  onIntervalChange: (interval: number) => void;
}

export function DeadPixelTest({
  currentColorIndex,
  autoMode,
  interval,
  isPaused,
  onColorChange,
  onAutoModeChange,
  onIntervalChange,
}: DeadPixelTestProps) {
  const currentColor = DEAD_PIXEL_COLORS[currentColorIndex];

  const nextColor = useCallback(() => {
    onColorChange((currentColorIndex + 1) % DEAD_PIXEL_COLORS.length);
  }, [currentColorIndex, onColorChange]);

  const prevColor = useCallback(() => {
    onColorChange(
      (currentColorIndex - 1 + DEAD_PIXEL_COLORS.length) % DEAD_PIXEL_COLORS.length
    );
  }, [currentColorIndex, onColorChange]);

  useEffect(() => {
    if (autoMode && !isPaused) {
      const timer = setInterval(nextColor, interval);
      return () => clearInterval(timer);
    }
  }, [autoMode, isPaused, interval, nextColor]);

  const colorNames = ['Red', 'Green', 'Blue', 'White', 'Black', 'Cyan', 'Magenta', 'Yellow'];

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 transition-colors duration-200"
        style={{ backgroundColor: currentColor }}
      />

      <CollapsiblePanel title="Dead Pixel Test">
        <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">
            {colorNames[currentColorIndex]} ({currentColorIndex + 1}/{DEAD_PIXEL_COLORS.length})
          </span>
          <div
            className="w-6 h-6 rounded border border-white/30"
            style={{ backgroundColor: currentColor }}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={prevColor} className="flex-1">
            ← Previous
          </Button>
          <Button variant="secondary" onClick={nextColor} className="flex-1">
            Next →
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {DEAD_PIXEL_COLORS.map((color, index) => (
            <button
              key={color}
              onClick={() => onColorChange(index)}
              className={`w-8 h-8 rounded border-2 transition-all ${
                index === currentColorIndex
                  ? 'border-[#00d9ff] scale-110'
                  : 'border-transparent hover:border-white/50'
              }`}
              style={{ backgroundColor: color }}
              title={colorNames[index]}
            />
          ))}
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Toggle
            checked={autoMode}
            onChange={onAutoModeChange}
            label="Auto-cycle colors"
          />
          {autoMode && (
            <Slider
              min={500}
              max={5000}
              step={100}
              value={interval}
              onChange={onIntervalChange}
              label="Interval (ms)"
            />
          )}
        </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
