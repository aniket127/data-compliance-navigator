
import React from 'react';
import { cn } from '@/lib/utils';

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
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        {/* Use the uploaded logo image */}
        <img 
          src="/lovable-uploads/558d4f11-c0c5-4e7e-a54d-9fffc70e4ea7.png" 
          alt="Cognizant Logo"
          className={cn(sizeClasses[size])}
        />
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
