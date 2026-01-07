import { SliderProps } from '../../types/ui';

export function Slider({
  min,
  max,
  value,
  step = 1,
  label,
  onChange,
  className = '',
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-300">{label}</label>
          <span className="text-sm text-[#00d9ff] font-mono">{value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
        style={{
          background: `linear-gradient(to right, #00d9ff 0%, #00d9ff ${percentage}%, #1a1a1a ${percentage}%, #1a1a1a 100%)`,
        }}
      />
    </div>
  );
}
