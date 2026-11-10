import React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'fold' | 'checkCall' | 'raise' | 'allIn' | 'ghost' | 'pill' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  sublabel?: string;
  amount?: number | string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  label,
  sublabel,
  amount,
  icon,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-interface font-bold transition-all duration-200 select-none disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-DEFAULT gap-2',
    lg: 'text-base px-6 py-3 rounded-md gap-2.5 min-w-[120px]',
    xl: 'text-lg px-8 py-4 rounded-md gap-3 min-w-[150px] shadow-lg',
  }[size];

  const variantStyles = {
    // Fold (Secondary / Muted)
    fold: 'bg-[#181c24] text-[#a0aec0] border border-white/10 hover:bg-[#262a33] hover:text-white hover:border-white/20',
    
    // Check / Call (Neutral Active with Gold Hairline)
    checkCall: 'bg-[#161c28] text-white border border-gold/40 hover:border-gold hover:bg-[#1e2638] shadow-[inset_0_1px_1px_rgba(212,175,55,0.2)] hover:shadow-glow-gold-subtle',
    
    // Raise / Bet (Primary Bullion Gold)
    raise: 'bg-gold-bullion text-[#0b0f17] border border-gold-bright hover:shadow-glow-gold hover:brightness-110 active:brightness-95',
    
    // All-In (Hero Ruby Crimson Action)
    allIn: 'bg-ruby-allin text-white border border-gold/60 hover:shadow-glow-crimson hover:brightness-110 uppercase tracking-wider',

    // Generic Secondary
    secondary: 'bg-[#1c2028] text-text-main border border-white/10 hover:bg-[#262a33] hover:border-white/20',

    // Ghost
    ghost: 'bg-transparent text-gold hover:bg-gold/10 hover:text-gold-highlight border border-transparent hover:border-gold/30',

    // Tactical Pill (MIN, 33% POT, 50% POT, POT, MAX)
    pill: 'bg-[#141923] text-gold-highlight text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/20 hover:border-gold/60 hover:bg-gold/10 active:bg-gold/20',
  }[variant];

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <div className="flex flex-col items-center justify-center leading-tight">
        <span className="uppercase tracking-wider font-bold">{label}</span>
        {amount !== undefined && (
          <span className="font-tabular text-xs opacity-90 font-medium">
            {typeof amount === 'number' ? `$${amount.toLocaleString()}` : amount}
          </span>
        )}
        {sublabel && (
          <span className="text-[10px] opacity-75 font-normal tracking-normal">{sublabel}</span>
        )}
      </div>
      {children}
    </button>
  );
};

