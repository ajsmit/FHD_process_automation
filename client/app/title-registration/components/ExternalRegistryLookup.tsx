'use client';

import type { ExternalAcademicDirectory } from '@/lib/api';

interface ExternalRegistryLookupProps {
  role: 'supervisor' | 'admin' | 'co1' | 'co2';
  searchValue: string;
  onSearchChange: (value: string) => void;
  lookupValue: string;
  onLookupChange: (value: string) => void;
  options: ExternalAcademicDirectory[];
  formatOptionLabel: (person: ExternalAcademicDirectory) => string;
}

export function ExternalRegistryLookup({
  searchValue,
  onSearchChange,
  lookupValue,
  onLookupChange,
  options,
  formatOptionLabel,
}: ExternalRegistryLookupProps) {
  return (
    <>
      <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
        <span className='text-muted'>Search external registry (surname/email/ID/passport)</span>
        <input
          className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2'
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder='Example: Smith, person@uni.edu, 7801015009087'
        />
      </label>
      <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
        <span className='text-muted'>Lookup previously used external academics</span>
        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={lookupValue} onChange={(event) => onLookupChange(event.target.value)}>
          <option value=''>Not in database / enter manually</option>
          {options.map((person) => (
            <option key={person.id} value={String(person.id)}>{formatOptionLabel(person)}</option>
          ))}
        </select>
      </label>
    </>
  );
}
