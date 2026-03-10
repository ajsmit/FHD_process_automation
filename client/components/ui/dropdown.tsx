'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function DecisionDropdown({ value, onChange }: { value: 'vetted' | 'insufficient'; onChange: (value: 'vetted' | 'insufficient') => void }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm'>
        {value === 'vetted' ? 'Vetted' : 'Insufficient'}
        <ChevronDown size={14} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className='z-20 rounded-xl border border-white/10 bg-surface p-1 shadow-card'>
          <DropdownMenu.Item className='cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:bg-white/10' onSelect={() => onChange('vetted')}>
            Vetted
          </DropdownMenu.Item>
          <DropdownMenu.Item className='cursor-pointer rounded-lg px-2 py-1 text-sm outline-none hover:bg-white/10' onSelect={() => onChange('insufficient')}>
            Insufficient
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
