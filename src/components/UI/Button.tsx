import { ButtonProps } from '../../types/ui';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
  title,
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]';
  
  const variantStyles = {
    primary: 'bg-[#00d9ff] text-black hover:bg-[#00b8d9] focus:ring-[#00d9ff]',
    secondary: 'bg-[#1a1a1a] text-white border border-[#333] hover:bg-[#2a2a2a] focus:ring-[#00d9ff]',
    tertiary: 'bg-transparent text-[#00d9ff] hover:bg-[#1a1a1a] focus:ring-[#00d9ff]',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}
