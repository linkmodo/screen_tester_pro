export function generateCheckerboard(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number,
  color1: string = '#000000',
  color2: string = '#FFFFFF'
): void {
  const cellWidth = width / gridSize;
  const cellHeight = height / gridSize;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? color1 : color2;
      ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
    }
  }
}

export function generateGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  direction: 'horizontal' | 'vertical' | 'diagonal',
  colors: string[]
): void {
  let gradient: CanvasGradient;

  switch (direction) {
    case 'horizontal':
      gradient = ctx.createLinearGradient(0, 0, width, 0);
      break;
    case 'vertical':
      gradient = ctx.createLinearGradient(0, 0, 0, height);
      break;
    case 'diagonal':
      gradient = ctx.createLinearGradient(0, 0, width, height);
      break;
  }

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

export function generateSteppedGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  direction: 'horizontal' | 'vertical' | 'diagonal',
  colors: string[]
): void {
  const steps = colors.length;

  if (direction === 'horizontal') {
    const stepWidth = width / steps;
    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * stepWidth, 0, stepWidth, height);
    });
  } else if (direction === 'vertical') {
    const stepHeight = height / steps;
    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, index * stepHeight, width, stepHeight);
    });
  } else {
    const stepSize = Math.sqrt(width * width + height * height) / steps;
    const angle = Math.atan2(height, width);
    
    ctx.save();
    ctx.rotate(angle);
    
    const rotatedWidth = Math.sqrt(width * width + height * height);
    colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * stepSize, -height, stepSize, height * 3);
    });
    
    ctx.restore();
  }
}

export function generateGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize: number,
  lineColor: string = 'rgba(255, 255, 255, 0.3)',
  lineWidth: number = 1
): void {
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;

  const cellWidth = width / gridSize;
  const cellHeight = height / gridSize;

  ctx.beginPath();
  
  for (let i = 1; i < gridSize; i++) {
    ctx.moveTo(i * cellWidth, 0);
    ctx.lineTo(i * cellWidth, height);
    ctx.moveTo(0, i * cellHeight);
    ctx.lineTo(width, i * cellHeight);
  }
  
  ctx.stroke();
}

export function generateBrightnessWindow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  windowSize: number,
  brightness: number
): void {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  const windowWidth = width * (windowSize / 100);
  const windowHeight = height * (windowSize / 100);
  const x = (width - windowWidth) / 2;
  const y = (height - windowHeight) / 2;

  const gray = Math.round((brightness / 100) * 255);
  ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
  ctx.fillRect(x, y, windowWidth, windowHeight);
}
