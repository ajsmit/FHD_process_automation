import { Mail, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface OperationalPanelsProps {
  activeModule: string;
  toDoItems: Array<Record<string, unknown>>;
  pipeline: Array<Record<string, unknown>>;
  tasks: Array<Record<string, unknown>>;
  people: Array<Record<string, unknown>>;
  notifications: Array<Record<string, unknown>>;
}

export function OperationalPanels({ activeModule, toDoItems, pipeline, tasks, people, notifications }: OperationalPanelsProps) {
  return (
    <>
      {activeModule === 'to_do' && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>To Do Module</h2>
          <div className='space-y-2'>
            {toDoItems.map((item, index) => (
              <div key={`${String(item.type)}-${String(item.case_id)}-${index}`} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                <div className='font-semibold'>{String(item.title)}</div>
                <div className='text-muted'>{String(item.student_number)} • {String(item.student_name)}</div>
                <div className='text-muted'>{String(item.detail)}</div>
              </div>
            ))}
            {toDoItems.length === 0 && <p className='text-sm text-muted'>No pending or in-progress actions.</p>}
          </div>
        </Card>
      )}

      {activeModule === 'pipeline' && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>Pipeline View</h2>
          <div className='space-y-2'>
            {pipeline.map((item) => (
              <div key={String(item.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                <div className='font-semibold'>{String(item.student_number)} • {String(item.first_names)} {String(item.last_name)}</div>
                <div className='text-muted'>Status: {String(item.case_status)} • Completion: {String(item.completion_percent)}%</div>
                <div className='text-muted'>Supervisor profiles: {String(item.supervisor_profiles_completed ?? 0)}/{String(item.supervisor_profiles_total ?? 0)} completed</div>
                <div className='text-muted'>MOU: {String(item.mou_status ?? 'pending')} • Title formalities finalised: {String(Boolean(item.title_formalities_finalised))}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeModule === 'tasks' && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>Tasks Module</h2>
          <div className='space-y-2'>
            {tasks.map((item) => (
              <div key={String(item.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                <div className='font-semibold'>{String(item.module_name)} • {String(item.student_number)}</div>
                <div className='text-muted'>{String(item.status)} • {String(item.summary)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(activeModule === 'people' || activeModule === 'team') && (
        <Card>
          <h2 className='mb-3 flex items-center gap-2 text-base font-bold'><Users size={16} /> People / Team</h2>
          <div className='space-y-2'>
            {people.map((person) => (
              <div key={String(person.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                <div className='font-semibold'>{String(person.full_name)}</div>
                <div className='text-muted'>{String(person.role)} • {String(person.email)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(activeModule === 'approvals' || activeModule === 'system') && (
        <Card>
          <h2 className='mb-3 flex items-center gap-2 text-base font-bold'><Mail size={16} /> Notification Queue</h2>
          <div className='space-y-2'>
            {notifications.map((note) => (
              <div key={String(note.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                <div className='font-semibold'>{String(note.subject)}</div>
                <div className='text-muted'>To: {String(note.email_to)} • Status: {String(note.status)}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {['radar', 'timelines', 'calendar', 'kanban', 'policy'].includes(activeModule) && (
        <Card>
          <h2 className='text-base font-bold capitalize'>{activeModule} module</h2>
          <p className='mt-1 text-sm text-muted'>Entries are created and updated from title registration state changes via backend module mappings.</p>
        </Card>
      )}
    </>
  );
}
