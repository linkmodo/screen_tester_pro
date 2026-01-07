export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export function calculateCircularPosition(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): Point {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

export function calculateLinearPosition(
  start: Point,
  end: Point,
  progress: number
): Point {
  return {
    x: start.x + (end.x - start.x) * progress,
    y: start.y + (end.y - start.y) * progress,
  };
}

export function getTrianglePath(
  centerX: number,
  centerY: number,
  size: number
): string {
  const height = (size * Math.sqrt(3)) / 2;
  const halfSize = size / 2;

  return `M ${centerX} ${centerY - height / 2} 
          L ${centerX - halfSize} ${centerY + height / 2} 
          L ${centerX + halfSize} ${centerY + height / 2} Z`;
}

export function getSquarePath(
  centerX: number,
  centerY: number,
  size: number
): string {
  const halfSize = size / 2;
  return `M ${centerX - halfSize} ${centerY - halfSize} 
          L ${centerX + halfSize} ${centerY - halfSize} 
          L ${centerX + halfSize} ${centerY + halfSize} 
          L ${centerX - halfSize} ${centerY + halfSize} Z`;
}

export function distance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function getDirectionVector(
  direction: 'horizontal' | 'vertical' | 'diagonal',
  containerSize: Size
): { start: Point; end: Point } {
  switch (direction) {
    case 'horizontal':
      return {
        start: { x: 0, y: containerSize.height / 2 },
        end: { x: containerSize.width, y: containerSize.height / 2 },
      };
    case 'vertical':
      return {
        start: { x: containerSize.width / 2, y: 0 },
        end: { x: containerSize.width / 2, y: containerSize.height },
      };
    case 'diagonal':
      return {
        start: { x: 0, y: 0 },
        end: { x: containerSize.width, y: containerSize.height },
      };
  }
}
