import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';

import { cn } from '@/lib/tailwind';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: ReactNode;
}
const Button: FC<Props> = ({ variant = 'default', size = 'default', className, children, ...props }) => {
  const variantClass = useMemo(() => {
    const type = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };
    return type[variant];
  }, [variant]);

  const sizeClass = useMemo(() => {
    const type = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    };
    return type[size];
  }, [size]);

  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        variantClass,
        sizeClass,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
