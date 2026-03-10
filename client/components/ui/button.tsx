'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: HTMLMotionProps<'button'>) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm font-semibold text-text shadow-card transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
