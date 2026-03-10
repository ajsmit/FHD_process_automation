import { cn } from '@/lib/utils';

const tone = {
  approved: 'bg-ok/20 text-ok',
  in_progress: 'bg-accent/20 text-accent',
  action_required: 'bg-warn/20 text-warn',
  default: 'bg-white/10 text-muted',
};

export function Badge({ label, status = 'default' }: { label: string; status?: keyof typeof tone }) {
  return <span className={cn('inline-flex rounded-full px-2 py-1 text-xs font-medium', tone[status])}>{label}</span>;
}
