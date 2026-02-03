import { TestConfig } from '../types/test';

export const DEAD_PIXEL_COLORS = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFFFF', // White
  '#000000', // Black
  '#00FFFF', // Cyan
  '#FF00FF', // Magenta
  '#FFFF00', // Yellow
];

export const TESTS: TestConfig[] = [
  {
    id: 'dead-pixel',
    name: 'Dead Pixel',
    description: 'Cycle through solid colors to identify stuck or dead pixels',
    icon: '🔴',
    category: 'core',
    shortcut: '1',
  },
  {
    id: 'uniformity',
    name: 'Uniformity',
    description: 'Check for backlight bleed or tinting issues',
    icon: '⬜',
    category: 'core',
    shortcut: '2',
  },
  {
    id: 'gradient',
    name: 'Color Gradient',
    description: 'Detect color banding with smooth gradients',
    icon: '🌈',
    category: 'core',
    shortcut: '3',
  },
  {
    id: 'response-time',
    name: 'Response Time',
    description: 'Test for ghosting and motion blur',
    icon: '🚀',
    category: 'core',
    shortcut: '4',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    description: 'Evaluate black and white level separation',
    icon: '◼️',
    category: 'extended',
    shortcut: '5',
  },
  {
    id: 'brightness',
    name: 'Brightness',
    description: 'Test brightness levels with window patterns',
    icon: '☀️',
    category: 'extended',
    shortcut: '6',
  },
  {
    id: 'text-clarity',
    name: 'Text Clarity',
    description: 'Evaluate text rendering and subpixel clarity',
    icon: '📝',
    category: 'extended',
    shortcut: '7',
  },
  {
    id: 'viewing-angle',
    name: 'Viewing Angle',
    description: 'Check color accuracy at different angles',
    icon: '👁️',
    category: 'extended',
    shortcut: '8',
  },
  {
    id: 'burn-in-fix',
    name: 'Burn-In Prevention',
    description: 'Protect your display with moving patterns that prevent burn-in',
    icon: '�️',
    category: 'core',
    shortcut: '9',
  },
];

export const SPEED_PRESETS = [
  { label: 'Slow', value: 2000 },
  { label: 'Normal', value: 1000 },
  { label: 'Fast', value: 500 },
  { label: 'Very Fast', value: 250 },
];

export const GRID_SIZES = [2, 3, 4, 5, 8, 10, 16, 20, 32, 50];

export const GRADIENT_STEPS = [8, 16, 32, 64, 128, 256];

export const FONT_SIZES = [10, 12, 14, 16, 18, 24, 32, 48, 64];

export const KEYBOARD_SHORTCUTS = {
  fullscreen: ['f', 'F11'],
  pause: [' '],
  reset: ['r'],
  help: ['?'],
  next: ['ArrowRight'],
  prev: ['ArrowLeft'],
  increase: ['+', '='],
  decrease: ['-', '_'],
};
