import { useEffect, useRef } from 'react';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';
import { Select } from '../UI/Select';
import { Slider } from '../UI/Slider';
import { Toggle } from '../UI/Toggle';

interface BurnInFixTestProps {
  settings: Record<string, any>;
  onSettingsChange: (settings: Record<string, any>) => void;
}

export function BurnInFixTest({ settings, onSettingsChange }: BurnInFixTestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const pattern = settings.pattern || 'scrolling-bars';
    const speed = settings.speed || 50;
    const colorCycle = settings.colorCycle !== false;
    const shiftAmount = settings.shiftAmount || 5;

    let offset = 0;
    let hue = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update offset based on speed
      offset += speed / 10;
      if (colorCycle) {
        hue = (hue + 0.5) % 360;
      }

      const baseColor = colorCycle 
        ? `hsl(${hue}, 100%, 50%)`
        : '#ffffff';

      switch (pattern) {
        case 'scrolling-bars':
          drawScrollingBars(ctx, canvas.width, canvas.height, offset, baseColor);
          break;
        case 'pixel-shift':
          drawPixelShift(ctx, canvas.width, canvas.height, offset, shiftAmount, baseColor);
          break;
        case 'wave-pattern':
          drawWavePattern(ctx, canvas.width, canvas.height, offset, baseColor);
          break;
        case 'spiral':
          drawSpiral(ctx, canvas.width, canvas.height, offset, baseColor);
          break;
        case 'bouncing-box':
          drawBouncingBox(ctx, canvas.width, canvas.height, offset, baseColor);
          break;
        case 'plasma':
          drawPlasma(ctx, canvas.width, canvas.height, offset, colorCycle);
          break;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings]);

  return (
    <div className="relative w-full h-full bg-black">
      <canvas ref={canvasRef} className="absolute inset-0" />

      <CollapsiblePanel title="Burn-In Prevention">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pattern Type</label>
            <Select
              value={settings.pattern || 'scrolling-bars'}
              onChange={(value) => onSettingsChange({ ...settings, pattern: value })}
              options={[
                { value: 'scrolling-bars', label: 'Scrolling Bars' },
                { value: 'pixel-shift', label: 'Pixel Shift' },
                { value: 'wave-pattern', label: 'Wave Pattern' },
                { value: 'spiral', label: 'Spiral' },
                { value: 'bouncing-box', label: 'Bouncing Box' },
                { value: 'plasma', label: 'Plasma Effect' },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Speed: {settings.speed || 50}
            </label>
            <Slider
              value={settings.speed || 50}
              onChange={(value) => onSettingsChange({ ...settings, speed: value })}
              min={10}
              max={100}
            />
          </div>

          {settings.pattern === 'pixel-shift' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Shift Amount: {settings.shiftAmount || 5}px
              </label>
              <Slider
                value={settings.shiftAmount || 5}
                onChange={(value) => onSettingsChange({ ...settings, shiftAmount: value })}
                min={1}
                max={20}
              />
            </div>
          )}

          <div>
            <Toggle
              label="Color Cycling"
              checked={settings.colorCycle !== false}
              onChange={(checked) => onSettingsChange({ ...settings, colorCycle: checked })}
            />
          </div>

          <div className="text-xs text-gray-400 mt-2 p-3 bg-black/30 rounded border border-gray-700">
            <p className="font-medium text-white mb-1">💡 How to use:</p>
            <p>Run this pattern for 30-60 minutes to help reduce burn-in risk. The moving patterns exercise all pixels evenly.</p>
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
}

// Pattern drawing functions
function drawScrollingBars(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  color: string
) {
  const barWidth = 50;
  const spacing = 100;
  
  ctx.fillStyle = color;
  
  for (let x = -spacing; x < width + spacing; x += spacing) {
    const xPos = (x + offset) % (width + spacing);
    ctx.fillRect(xPos, 0, barWidth, height);
  }
}

function drawPixelShift(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  shiftAmount: number,
  color: string
) {
  const gridSize = 20;
  const shiftX = Math.sin(offset / 50) * shiftAmount;
  const shiftY = Math.cos(offset / 50) * shiftAmount;
  
  ctx.fillStyle = color;
  
  for (let x = 0; x < width; x += gridSize * 2) {
    for (let y = 0; y < height; y += gridSize * 2) {
      ctx.fillRect(x + shiftX, y + shiftY, gridSize, gridSize);
    }
  }
}

function drawWavePattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  color: string
) {
  ctx.fillStyle = color;
  
  const waveHeight = height / 8;
  const frequency = 0.015;
  const numWaves = 8;
  const waveSpacing = height / numWaves;
  
  // Draw multiple overlapping horizontal waves
  for (let wave = 0; wave < numWaves; wave++) {
    const baseY = (wave + 0.5) * waveSpacing;
    const phaseShift = wave * Math.PI / 4;
    
    ctx.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const y = baseY + Math.sin((x + offset + phaseShift * 100) * frequency) * waveHeight;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
  
  // Draw vertical waves
  for (let wave = 0; wave < numWaves; wave++) {
    const baseX = (wave + 0.5) * (width / numWaves);
    const phaseShift = wave * Math.PI / 4;
    
    ctx.beginPath();
    for (let y = 0; y <= height; y += 2) {
      const x = baseX + Math.cos((y + offset + phaseShift * 100) * frequency) * (width / 16);
      if (y === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

function drawSpiral(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  color: string
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2;
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
    const radius = (angle / (Math.PI * 8)) * maxRadius;
    const x = centerX + Math.cos(angle + offset / 50) * radius;
    const y = centerY + Math.sin(angle + offset / 50) * radius;
    
    if (angle === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
}

function drawBouncingBox(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  color: string
) {
  const boxSize = 100;
  const x = Math.abs(Math.sin(offset / 100)) * (width - boxSize);
  const y = Math.abs(Math.cos(offset / 80)) * (height - boxSize);
  
  ctx.fillStyle = color;
  ctx.fillRect(x, y, boxSize, boxSize);
  
  // Draw trail
  ctx.globalAlpha = 0.3;
  ctx.fillRect(x - 10, y - 10, boxSize + 20, boxSize + 20);
  ctx.globalAlpha = 1;
}

function drawPlasma(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
  colorCycle: boolean
) {
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  
  const time = offset / 50;
  
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const value = Math.sin(x / 16 + time) +
                   Math.sin(y / 8 + time) +
                   Math.sin((x + y) / 16 + time) +
                   Math.sin(Math.sqrt(x * x + y * y) / 8 + time);
      
      const index = (y * width + x) * 4;
      
      if (colorCycle) {
        const hue = (value + 4) / 8 * 360;
        const rgb = hslToRgb(hue, 100, 50);
        data[index] = rgb[0];
        data[index + 1] = rgb[1];
        data[index + 2] = rgb[2];
      } else {
        const brightness = ((value + 4) / 8) * 255;
        data[index] = brightness;
        data[index + 1] = brightness;
        data[index + 2] = brightness;
      }
      data[index + 3] = 255;
      
      // Fill 2x2 block for performance
      if (x + 1 < width) {
        data[index + 4] = data[index];
        data[index + 5] = data[index + 1];
        data[index + 6] = data[index + 2];
        data[index + 7] = 255;
      }
      if (y + 1 < height) {
        const nextRow = ((y + 1) * width + x) * 4;
        data[nextRow] = data[index];
        data[nextRow + 1] = data[index + 1];
        data[nextRow + 2] = data[index + 2];
        data[nextRow + 3] = 255;
        if (x + 1 < width) {
          data[nextRow + 4] = data[index];
          data[nextRow + 5] = data[index + 1];
          data[nextRow + 6] = data[index + 2];
          data[nextRow + 7] = 255;
        }
      }
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}
