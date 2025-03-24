
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  showText = true
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <ShieldCheck className={cn(
          sizeClasses[size], 
          'text-primary animate-pulse'
        )} />
        <Shield className={cn(
          sizeClasses[size], 
          'absolute top-0 left-0 text-accent/30'
        )} />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            'font-bold leading-none tracking-tight',
            textSizeClasses[size]
          )}>
            Cognizant Data Compliance
          </span>
          <span className="text-xs text-muted-foreground">
            Agent
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
