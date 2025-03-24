
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
        {/* Official Cognizant logo SVG */}
        <svg 
          className={cn(sizeClasses[size], 'text-primary')}
          viewBox="0 0 152 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M33.9,23c0-11.6-9.4-21-21-21S-8,11.4-8,23c0,9.1,5.8,16.9,13.9,19.9c0.6,0.2,1.2,0.4,1.8,0.6 c1.8,0.5,3.6,0.7,5.5,0.7c1.6,0,3.2-0.2,4.8-0.5c0.8-0.2,1.6-0.4,2.3-0.7C28.2,40,33.9,32.1,33.9,23z" 
            fill="#0033A1"/>
          <path d="M12.9,39.9c-0.6-0.2-1.2-0.4-1.8-0.6C3,36.5-2.8,28.5-2.2,19.5C-1.8,11.6,4.8,5.1,12.6,4.7 c1-0.1,2-0.1,3,0.1c-7.3,0.9-12.8,7.2-12.8,14.8c0,5.1,2.5,9.6,6.4,12.3C10.2,33.3,11.4,36.7,12.9,39.9z" 
            fill="#00B140"/>
          <path d="M21.1,43c-1.6,0.3-3.2,0.5-4.8,0.5c-1.9,0-3.7-0.2-5.5-0.7c-1.5-3.2-2.7-6.6-3.7-8c2.1,1.4,4.6,2.3,7.3,2.3 c5.3,0,9.9-3.1,12-7.7c0.5-1.2,0.9-2.4,1-3.7c0.1-0.8,0.1-1.7,0-2.5c5.3,1.6,9.2,6.5,9.2,12.4C36.7,39.4,29.6,42.7,21.1,43z" 
            fill="#FF9E1B"/>
          <path d="M14.5,37.1c-2.7,0-5.2-0.8-7.3-2.3c1,1.4,2.2,4.8,3.7,8c0.6,0.2,1.2,0.4,1.8,0.6c-1.5-3.2-2.7-6.6-3.7-8 c2.1,1.4,4.6,2.3,7.3,2.3c5.3,0,9.9-3.1,12-7.7c-2.3,4.1-6.7,6.9-11.8,7.1C15.8,37.1,15.1,37.1,14.5,37.1z" 
            fill="#FF078E"/>
          <path d="M26.4,30.1c-2.1,4.5-6.7,7.7-12,7.7c-2.7,0-5.2-0.8-7.3-2.3c1,1.4,2.2,4.8,3.7,8c0.6,0.2,1.2,0.4,1.8,0.6 c-1.5-3.2-2.7-6.6-3.7-8c2.1,1.4,4.6,2.3,7.3,2.3c5.3,0,9.9-3.1,12-7.7c0.5-1.2,0.9-2.4,1-3.7C28.7,27.8,27.7,29.2,26.4,30.1z" 
            fill="#A100FF"/>
          <path d="M144.1,18.9c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6c0-0.9,0.7-1.6,1.6-1.6 C143.4,17.3,144.1,18,144.1,18.9z M141.2,18.9c0,0.7,0.6,1.3,1.3,1.3c0.7,0,1.3-0.6,1.3-1.3c0-0.7-0.6-1.3-1.3-1.3 C141.8,17.6,141.2,18.2,141.2,18.9z M142.2,19.7h-0.3v-1.6h0.7c0.4,0,0.6,0.2,0.6,0.5c0,0.3-0.2,0.4-0.5,0.5l0.5,0.6h-0.3 l-0.4-0.6h-0.3V19.7z M142.2,18.9h0.3c0.2,0,0.4-0.1,0.4-0.3c0-0.2-0.2-0.2-0.4-0.2h-0.3V18.9z" 
            fill="#0033A1"/>
          <path d="M69,19.8c0-0.8-0.7-1.5-1.5-1.5h-5.1v11.5h2.4v-4.4h2.1l1.9,4.4h2.7L69,25.1c0.9-0.5,1.5-1.4,1.5-2.4v-0.4 C70.5,21.4,69.9,20.5,69,19.8z M68.1,22.3c0,0.6-0.4,1-1,1h-2.3v-3.1h2.3c0.6,0,1,0.4,1,1V22.3z" 
            fill="#0033A1"/>
          <path d="M82.4,28c-2,0-3.7-1.6-3.7-3.7c0-2,1.6-3.7,3.7-3.7c1.2,0,2.3,0.6,3,1.6l1.7-1.8c-1.1-1.3-2.8-2.1-4.6-2.1 c-3.4,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1c1.8,0,3.5-0.8,4.6-2.1l-1.7-1.8C84.7,27.4,83.6,28,82.4,28z" 
            fill="#0033A1"/>
          <path d="M152,27.2h-7.9v-2.1h6.9v-2.2h-6.9v-1.9h7.7v-2.2h-10.1v11.5h10.3V27.2z" 
            fill="#0033A1"/>
          <path d="M101.9,22.9c1.1-0.5,1.9-1.7,1.9-3v-0.3c0-1.8-1.5-3.3-3.3-3.3H92v13.8h8.5c1.9,0,3.4-1.5,3.4-3.4v-0.4 C103.9,24.7,103.1,23.4,101.9,22.9z M94.4,19h5.9c0.7,0,1.2,0.5,1.2,1.2v0.3c0,0.7-0.5,1.2-1.2,1.2h-5.9V19z M101.7,26.4 c0,0.7-0.6,1.3-1.3,1.3h-6v-3.9h6c0.7,0,1.3,0.6,1.3,1.3V26.4z" 
            fill="#0033A1"/>
          <path d="M119.4,28c-2,0-3.7-1.6-3.7-3.7c0-2,1.6-3.7,3.7-3.7c1.2,0,2.3,0.6,3,1.6l1.7-1.8c-1.1-1.3-2.8-2.1-4.6-2.1 c-3.4,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1c1.8,0,3.5-0.8,4.6-2.1l-1.7-1.8C121.7,27.4,120.6,28,119.4,28z" 
            fill="#0033A1"/>
          <path d="M47.3,18.2h2.4v11.5h-2.4V18.2z" 
            fill="#0033A1"/>
          <path d="M111.6,18.2v11.5h2.4v-7.3l7.2,7.3h2V18.2h-2.4v7.3l-7.2-7.3H111.6z" 
            fill="#0033A1"/>
          <path d="M135.3,18.2v11.5h2.4v-7.3l7.2,7.3h2V18.2h-2.4v7.3l-7.2-7.3H135.3z" 
            fill="#0033A1"/>
          <path d="M55.6,18.2L50,29.7h2.7l1.1-2.3h5.8l1.1,2.3h2.7l-5.6-11.5H55.6z M54.7,25.2l2-4.2l2,4.2H54.7z" 
            fill="#0033A1"/>
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
