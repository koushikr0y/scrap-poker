import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'pod' | 'modal' | 'rail';
  goldTrim?: boolean;
  blur?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'surface',
  goldTrim = true,
  blur = 'lg',
  className,
  children,
  ...props
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-20',
  }[blur];

  const variantClasses = {
    surface: 'bg-[#121620]/90 border border-white/10 shadow-lg',
    pod: 'bg-[#121620]/85 border border-gold/25 shadow-card-float',
    modal: 'bg-[#0f131c]/95 border border-gold/35 shadow-modal-deep',
    rail: 'bg-[#051d15]/80 border-t border-gold/20 shadow-inner',
  }[variant];

  return (
    <div
      className={cn(
        'relative rounded-DEFAULT overflow-hidden transition-all duration-200',
        blurClasses,
        variantClasses,
        goldTrim && 'border border-gold/25',
        className
      )}
      {...props}
    >
      {/* Subtle top edge glint reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

