import { useState, useEffect, useRef } from 'react';
import { Select } from '../UI/Select';
import { Toggle } from '../UI/Toggle';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { SPEED_PRESETS } from '../../utils/constants';

const COLOR_PRESETS = [
  { value: '#00d9ff', label: 'Cyan' },
  { value: '#00ff00', label: 'Green' },
  { value: '#ff00ff', label: 'Magenta' },
  { value: '#ff0000', label: 'Red' },
  { value: '#ffaa00', label: 'Orange' },
  { value: '#ffffff', label: 'White' },
  { value: '#ffff00', label: 'Yellow' },
  { value: '#4488ff', label: 'Blue' },
];

interface ResponseTimeTestProps {
  speed: number;
  shape: 'circle' | 'square' | 'triangle';
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'circular';
  showTrail: boolean;
  isPaused: boolean;
  objectColor?: string;
  onSpeedChange: (speed: number) => void;
  onShapeChange: (shape: 'circle' | 'square' | 'triangle') => void;
  onDirectionChange: (direction: 'horizontal' | 'vertical' | 'diagonal' | 'circular') => void;
  onShowTrailChange: (show: boolean) => void;
  onObjectColorChange?: (color: string) => void;
}

export function ResponseTimeTest({
  speed,
  shape,
  direction,
  showTrail,
  isPaused,
  objectColor,
  onSpeedChange,
  onShapeChange,
  onDirectionChange,
  onShowTrailChange,
  onObjectColorChange,
}: ResponseTimeTestProps) {
  const [position, setPosition] = useState(0);
  const [customColor, setCustomColor] = useState(objectColor || '#00d9ff');
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const activeColor = objectColor || '#00d9ff';

  useEffect(() => {
    if (isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      
      const progress = (delta / speed) % 1;
      setPosition(progress);

      if (progress >= 1) {
        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, isPaused]);

  const getObjectPosition = () => {
    const container = containerRef.current;
    if (!container) return { x: 0, y: 0 };

    const width = container.clientWidth;
    const height = container.clientHeight;
    const objectSize = 60;
    const padding = objectSize;

    const pingPong = position <= 0.5 ? position * 2 : 2 - position * 2;

    switch (direction) {
      case 'horizontal':
        return {
          x: padding + pingPong * (width - 2 * padding - objectSize),
          y: height / 2 - objectSize / 2,
        };
      case 'vertical':
        return {
          x: width / 2 - objectSize / 2,
          y: padding + pingPong * (height - 2 * padding - objectSize),
        };
      case 'diagonal':
        return {
          x: padding + pingPong * (width - 2 * padding - objectSize),
          y: padding + pingPong * (height - 2 * padding - objectSize),
        };
      case 'circular':
        const angle = position * Math.PI * 2;
        const radius = Math.min(width, height) / 3;
        return {
          x: width / 2 + Math.cos(angle) * radius - objectSize / 2,
          y: height / 2 + Math.sin(angle) * radius - objectSize / 2,
        };
    }
  };

  const renderShape = (x: number, y: number, opacity: number = 1) => {
    const size = 60;
    const style = {
      position: 'absolute' as const,
      left: x,
      top: y,
      width: size,
      height: size,
      opacity,
      transition: showTrail ? 'none' : 'opacity 0.1s',
    };

    switch (shape) {
      case 'circle':
        return (
          <div
            key={opacity}
            style={{ ...style, backgroundColor: activeColor, boxShadow: `0 10px 15px -3px ${activeColor}80` }}
            className="rounded-full"
          />
        );
      case 'square':
        return (
          <div
            key={opacity}
            style={{ ...style, backgroundColor: activeColor, boxShadow: `0 10px 15px -3px ${activeColor}80` }}
          />
        );
      case 'triangle':
        return (
          <div
            key={opacity}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${activeColor}`,
              filter: `drop-shadow(0 0 10px ${activeColor}80)`,
            }}
          />
        );
    }
  };

  const { x, y } = getObjectPosition();

  const trailPositions = showTrail
    ? Array.from({ length: 5 }, (_, i) => {
        const trailPos = (position - i * 0.02 + 1) % 1;
        const pingPong = trailPos <= 0.5 ? trailPos * 2 : 2 - trailPos * 2;
        const container = containerRef.current;
        if (!container) return { x: 0, y: 0, opacity: 0 };

        const width = container.clientWidth;
        const height = container.clientHeight;
        const objectSize = 60;
        const padding = objectSize;

        let tx = 0, ty = 0;
        switch (direction) {
          case 'horizontal':
            tx = padding + pingPong * (width - 2 * padding - objectSize);
            ty = height / 2 - objectSize / 2;
            break;
          case 'vertical':
            tx = width / 2 - objectSize / 2;
            ty = padding + pingPong * (height - 2 * padding - objectSize);
            break;
          case 'diagonal':
            tx = padding + pingPong * (width - 2 * padding - objectSize);
            ty = padding + pingPong * (height - 2 * padding - objectSize);
            break;
          case 'circular':
            const angle = trailPos * Math.PI * 2;
            const radius = Math.min(width, height) / 3;
            tx = width / 2 + Math.cos(angle) * radius - objectSize / 2;
            ty = height / 2 + Math.sin(angle) * radius - objectSize / 2;
            break;
        }
        return { x: tx, y: ty, opacity: 0.6 - i * 0.1 };
      })
    : [];

  return (
    <div className="relative w-full h-full bg-[#111]" ref={containerRef}>
      {trailPositions.map((pos) => renderShape(pos.x, pos.y, pos.opacity))}
      {renderShape(x, y, 1)}

      <CollapsiblePanel title="Response Time Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Speed"
          value={speed}
          onChange={(v) => onSpeedChange(Number(v))}
          options={SPEED_PRESETS.map((p) => ({ value: p.value, label: p.label }))}
        />

        <Select
          label="Shape"
          value={shape}
          onChange={(v) => onShapeChange(v as typeof shape)}
          options={[
            { value: 'circle', label: 'Circle' },
            { value: 'square', label: 'Square' },
            { value: 'triangle', label: 'Triangle' },
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
            { value: 'circular', label: 'Circular' },
          ]}
        />

        <Toggle
          checked={showTrail}
          onChange={onShowTrailChange}
          label="Show Motion Trail"
        />

        <div>
          <label className="block text-sm font-medium mb-2">Object Color</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setCustomColor(preset.value);
                  onObjectColorChange?.(preset.value);
                }}
                className={`w-7 h-7 rounded border-2 transition-all ${
                  activeColor === preset.value
                    ? 'border-white scale-110'
                    : 'border-transparent hover:border-white/50'
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.label}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  onObjectColorChange?.(e.target.value);
                }
              }}
              placeholder="#00d9ff"
              className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1 text-sm text-white font-mono"
              maxLength={7}
            />
            <div
              className="w-7 h-7 rounded border border-white/20"
              style={{ backgroundColor: activeColor }}
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Watch for ghosting or blur behind the moving object. Faster speeds reveal slower response times.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
