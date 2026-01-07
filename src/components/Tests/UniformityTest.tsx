import { Select } from '../UI/Select';
import { Slider } from '../UI/Slider';
import { Toggle } from '../UI/Toggle';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';

interface UniformityTestProps {
  color: 'white' | 'gray' | 'black';
  brightness: number;
  gridEnabled: boolean;
  gridSize: number;
  onColorChange: (color: 'white' | 'gray' | 'black') => void;
  onBrightnessChange: (brightness: number) => void;
  onGridEnabledChange: (enabled: boolean) => void;
  onGridSizeChange: (size: number) => void;
}

export function UniformityTest({
  color,
  brightness,
  gridEnabled,
  gridSize,
  onColorChange,
  onBrightnessChange,
  onGridEnabledChange,
  onGridSizeChange,
}: UniformityTestProps) {
  const getBackgroundColor = () => {
    const value = Math.round((brightness / 100) * 255);
    switch (color) {
      case 'white':
        return `rgb(${value}, ${value}, ${value})`;
      case 'gray':
        return `rgb(${Math.round(value / 2)}, ${Math.round(value / 2)}, ${Math.round(value / 2)})`;
      case 'black':
        return `rgb(${Math.round(value * 0.1)}, ${Math.round(value * 0.1)}, ${Math.round(value * 0.1)})`;
    }
  };

  const renderGrid = () => {
    if (!gridEnabled) return null;

    const lines = [];
    for (let i = 1; i < gridSize; i++) {
      const percent = (i / gridSize) * 100;
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-red-500/50"
          style={{ left: `${percent}%` }}
        />,
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-red-500/50"
          style={{ top: `${percent}%` }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 transition-colors duration-200"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        {renderGrid()}
      </div>

      <CollapsiblePanel title="Uniformity Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Background Color"
          value={color}
          onChange={(v) => onColorChange(v as 'white' | 'gray' | 'black')}
          options={[
            { value: 'white', label: 'White' },
            { value: 'gray', label: 'Gray (50%)' },
            { value: 'black', label: 'Black' },
          ]}
        />

        <Slider
          min={0}
          max={100}
          value={brightness}
          onChange={onBrightnessChange}
          label="Brightness"
        />

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Toggle
            checked={gridEnabled}
            onChange={onGridEnabledChange}
            label="Show Grid Overlay"
          />
          {gridEnabled && (
            <Select
              label="Grid Size"
              value={gridSize}
              onChange={(v) => onGridSizeChange(Number(v))}
              options={[
                { value: 2, label: '2x2' },
                { value: 3, label: '3x3' },
                { value: 4, label: '4x4' },
                { value: 5, label: '5x5' },
              ]}
            />
          )}
        </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
