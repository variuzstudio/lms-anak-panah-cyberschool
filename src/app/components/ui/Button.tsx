import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth,
  icon,
  className, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variantStyles = {
    primary: "bg-[#00aeff] hover:bg-[#0099dd] text-white border border-[#00aeff]",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    danger: "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50",
    success: "bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50",
    warning: "bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-600/50"
  };
  
  const sizeStyles = {
    sm: "px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm",
    md: "px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base",
    lg: "px-4 md:px-6 py-2.5 md:py-3 text-base md:text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4 md:w-5 md:h-5">{icon}</span>}
      {children}
    </button>
  );
}
