
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
        <svg 
          className={cn(sizeClasses[size], 'text-primary')}
          viewBox="0 0 30 30" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 2C8.373 2 3 7.373 3 14v8c0 3.314 2.686 6 6 6h12c3.314 0 6-2.686 6-6v-8c0-6.627-5.373-12-12-12z" 
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path 
            d="M15 5C10.029 5 6 9.029 6 14v5c0 2.761 2.239 5 5 5h8c2.761 0 5-2.239 5-5v-5c0-4.971-4.029-9-9-9z" 
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path 
            d="M12 14l2 2 4-4" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
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
