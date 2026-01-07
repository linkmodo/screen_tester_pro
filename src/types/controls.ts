export type ControlType = 'button' | 'slider' | 'toggle' | 'select' | 'color-picker';

export interface ControlConfig {
  id: string;
  label: string;
  type: ControlType;
  value: string | number | boolean;
  options?: { value: string | number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ControlGroup {
  title: string;
  controls: ControlConfig[];
}
