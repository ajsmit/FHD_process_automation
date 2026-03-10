'use client';

import { cn } from '@/lib/utils';

export function SidebarItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'w-full rounded-xl px-3 py-2 text-left text-sm transition',
        active ? 'bg-accent/20 text-accent' : 'text-muted hover:bg-white/10 hover:text-text',
      )}
    >
      {label}
    </button>
  );
}
