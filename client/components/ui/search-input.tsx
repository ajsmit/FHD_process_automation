'use client';

import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className='flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2'>
      <Search size={16} className='text-muted' />
      <input {...props} className={cn('w-full bg-transparent text-sm text-text outline-none placeholder:text-muted', props.className)} />
    </div>
  );
}
