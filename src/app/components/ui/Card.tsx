import { ReactNode } from 'react';
import { cn } from './utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function Card({ children, className, noPadding }: CardProps) {
  return (
    <div className={cn(
      "bg-[#0d1238] border border-[#1a2151] rounded-lg",
      !noPadding && "p-4 md:p-6",
      className
    )}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4 mb-4 md:mb-6", className)}>
      <div>
        <h2 className="text-base md:text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs md:text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={className}>{children}</div>;
}
