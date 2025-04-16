import { FC, ReactNode, useMemo } from 'react';

import { cn } from '@/lib/tailwind';

interface Props {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children: ReactNode;
}
const Badge: FC<Props> = ({ variant = 'default', className, children }) => {
  const variantClass = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80';
      case 'destructive':
        return 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80';
      case 'outline':
        return 'text-foreground';
      default:
        return 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
    }
  }, [variant]);

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClass,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
