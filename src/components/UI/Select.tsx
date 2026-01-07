import { SelectProps } from '../../types/ui';

export function Select({
  options,
  value,
  onChange,
  label,
  className = '',
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <select
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          const numVal = Number(val);
          onChange(isNaN(numVal) ? val : numVal);
        }}
        className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00d9ff] focus:border-transparent cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
