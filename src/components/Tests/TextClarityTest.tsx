import { Select } from '../UI/Select';
import { Slider } from '../UI/Slider';
import { CollapsiblePanel } from '../UI/CollapsiblePanel';

interface TextClarityTestProps {
  fontSize: number;
  fontFamily: 'sans-serif' | 'serif' | 'monospace';
  letterSpacing: number;
  lineHeight: number;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: 'sans-serif' | 'serif' | 'monospace') => void;
  onLetterSpacingChange: (spacing: number) => void;
  onLineHeightChange: (height: number) => void;
}

const sampleText = `The quick brown fox jumps over the lazy dog.
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789 !@#$%^&*()_+-=[]{}|;':",.<>?/

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

iIlL1| oO0Q S5$ Z2 B8 G6 rn m vv w`;

export function TextClarityTest({
  fontSize,
  fontFamily,
  letterSpacing,
  lineHeight,
  onFontSizeChange,
  onFontFamilyChange,
  onLetterSpacingChange,
  onLineHeightChange,
}: TextClarityTestProps) {
  const fontFamilyMap = {
    'sans-serif': 'ui-sans-serif, system-ui, sans-serif',
    'serif': 'ui-serif, Georgia, serif',
    'monospace': 'ui-monospace, SFMono-Regular, monospace',
  };

  return (
    <div className="relative w-full h-full bg-white overflow-auto">
      <div className="p-8 max-w-4xl mx-auto">
        <pre
          className="text-black whitespace-pre-wrap"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamilyMap[fontFamily],
            letterSpacing: `${letterSpacing}px`,
            lineHeight: lineHeight,
          }}
        >
          {sampleText}
        </pre>
      </div>

      <CollapsiblePanel title="Text Clarity Test">
        <div className="flex flex-col gap-4">
        <Select
          label="Font Size"
          value={fontSize}
          onChange={(v) => onFontSizeChange(Number(v))}
          options={[
            { value: 10, label: '10px' },
            { value: 12, label: '12px' },
            { value: 14, label: '14px' },
            { value: 16, label: '16px' },
            { value: 18, label: '18px' },
            { value: 24, label: '24px' },
            { value: 32, label: '32px' },
            { value: 48, label: '48px' },
            { value: 64, label: '64px' },
          ]}
        />

        <Select
          label="Font Family"
          value={fontFamily}
          onChange={(v) => onFontFamilyChange(v as typeof fontFamily)}
          options={[
            { value: 'sans-serif', label: 'Sans-serif' },
            { value: 'serif', label: 'Serif' },
            { value: 'monospace', label: 'Monospace' },
          ]}
        />

        <Slider
          min={-2}
          max={10}
          step={0.5}
          value={letterSpacing}
          onChange={onLetterSpacingChange}
          label="Letter Spacing (px)"
        />

        <Slider
          min={1}
          max={3}
          step={0.1}
          value={lineHeight}
          onChange={onLineHeightChange}
          label="Line Height"
        />

        <p className="text-xs text-gray-400">
          Evaluate text sharpness and subpixel rendering. Look for fuzzy edges or color fringing.
        </p>
        </div>
      </CollapsiblePanel>
    </div>
  );
}
