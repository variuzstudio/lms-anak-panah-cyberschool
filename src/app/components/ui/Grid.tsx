import { ReactNode } from 'react';
import { cn } from './utils';

interface GridProps {
  children: ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: number;
  className?: string;
}

export function Grid({ children, cols = { default: 1, md: 2, lg: 3 }, gap = 4, className }: GridProps) {
  const colsClasses = [];
  
  if (cols.default) colsClasses.push(`grid-cols-${cols.default}`);
  if (cols.sm) colsClasses.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) colsClasses.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) colsClasses.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) colsClasses.push(`xl:grid-cols-${cols.xl}`);

  return (
    <div className={cn(
      "grid",
      colsClasses.join(" "),
      `gap-${gap}`,
      className
    )}>
      {children}
    </div>
  );
}
