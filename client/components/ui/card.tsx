import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('rounded-xl2 border border-white/10 bg-surface/75 p-4 shadow-card backdrop-blur', className)}>{children}</section>;
}
