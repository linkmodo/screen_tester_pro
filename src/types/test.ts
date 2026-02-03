export type TestType = 
  | 'dead-pixel' 
  | 'uniformity' 
  | 'gradient' 
  | 'response-time' 
  | 'contrast' 
  | 'brightness' 
  | 'text-clarity' 
  | 'viewing-angle'
  | 'burn-in-fix';

export interface TestConfig {
  id: TestType;
  name: string;
  description: string;
  icon: string;
  category: 'core' | 'extended';
  shortcut: string;
}

export interface TestState {
  selectedTest: TestType;
  isFullscreen: boolean;
  isPaused: boolean;
}

export interface DeadPixelSettings {
  currentColor: string;
  autoMode: boolean;
  interval: number;
}

export interface UniformitySettings {
  color: 'white' | 'gray' | 'black';
  brightness: number;
  gridEnabled: boolean;
  gridSize: number;
}

export interface GradientSettings {
  direction: 'horizontal' | 'vertical' | 'diagonal';
  steps: number;
  preset: 'red-green' | 'green-blue' | 'blue-red' | 'full-spectrum';
}

export interface ResponseTimeSettings {
  speed: number;
  shape: 'circle' | 'square' | 'triangle';
  direction: 'horizontal' | 'vertical' | 'diagonal' | 'circular';
  showTrail: boolean;
}

export interface ContrastSettings {
  gridSize: number;
  contrastRatio: number;
}

export interface BrightnessSettings {
  brightness: number;
  windowSize: number;
}

export interface TextClaritySettings {
  fontSize: number;
  fontFamily: 'sans-serif' | 'serif' | 'monospace';
  letterSpacing: number;
  lineHeight: number;
}

export interface ViewingAngleSettings {
  pattern: 'checkerboard' | 'gradient';
  showIndicators: boolean;
}

export interface BurnInFixSettings {
  pattern: 'scrolling-bars' | 'pixel-shift' | 'wave-pattern' | 'spiral' | 'plasma';
  speed: number;
  colorCycle: boolean;
  shiftAmount: number;
}

export type TestSettings = 
  | DeadPixelSettings 
  | UniformitySettings 
  | GradientSettings 
  | ResponseTimeSettings
  | ContrastSettings
  | BrightnessSettings
  | TextClaritySettings
  | ViewingAngleSettings
  | BurnInFixSettings;
