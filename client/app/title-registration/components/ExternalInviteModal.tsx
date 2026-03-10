'use client';

import { Button } from '@/components/ui/button';

interface ExternalInviteModalProps {
  open: boolean;
  role: 'supervisor' | 'admin' | 'co1' | 'co2';
  email: string;
  onEmailChange: (value: string) => void;
  feedback: string | null;
  inviteLink: string | null;
  onSend: () => void;
  onClose: () => void;
}

export function ExternalInviteModal({
  open,
  role,
  email,
  onEmailChange,
  feedback,
  inviteLink,
  onSend,
  onClose,
}: ExternalInviteModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-5 shadow-card'>
        <h3 className='text-base font-semibold'>Send External Profile Link</h3>
        <p className='mt-1 text-sm text-muted'>
          Role: <span className='font-medium text-text'>{role}</span>
        </p>
        <label className='mt-4 block space-y-1 text-sm'>
          <span className='text-muted'>External academic email</span>
          <input
            className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2'
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder='name@example.org'
          />
        </label>
        {feedback && (
          <p className={`mt-3 text-sm ${inviteLink ? 'text-emerald-400' : 'text-rose-400'}`}>{feedback}</p>
        )}
        <div className='mt-4 flex gap-2'>
          <Button onClick={onSend}>Send Link</Button>
          <Button className='bg-transparent' onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
