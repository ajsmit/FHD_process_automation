'use client';

import { useEffect, useState } from 'react';
import {
  createLandingMessage,
  getFacultyCalendar,
  getManagedLandingMessages,
  patchFacultyCalendar,
  patchLandingMessage,
  setActivePolicyAdminActor,
  type LandingMessage,
  type PolicyAdminActor,
} from '@/lib/api';

interface CalendarDraft {
  year: string;
  rottSubmissionDeadline: string;
  progressReportDeadline: string;
  intentionToSubmitDeadline: string;
  appointExaminersDeadline: string;
  publishedNotice: string;
}

function inputClassName() {
  return 'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm';
}

export default function AdminPolicyPage() {
  const [activeActor, setActiveActor] = useState<PolicyAdminActor>('faculty');
  const [calendar, setCalendar] = useState<CalendarDraft>({
    year: String(new Date().getUTCFullYear()),
    rottSubmissionDeadline: '',
    progressReportDeadline: '',
    intentionToSubmitDeadline: '',
    appointExaminersDeadline: '',
    publishedNotice: '',
  });
  const [facultyMessage, setFacultyMessage] = useState('');
  const [departmentName, setDepartmentName] = useState('Biodiversity & Conservation Biology');
  const [departmentMessage, setDepartmentMessage] = useState('');
  const [managedFacultyMessages, setManagedFacultyMessages] = useState<LandingMessage[]>([]);
  const [managedDeptMessages, setManagedDeptMessages] = useState<LandingMessage[]>([]);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV === 'production') {
      setActiveActor('faculty');
      return;
    }
    const actorParam = (new URLSearchParams(window.location.search).get('actor') ?? '').trim().toLowerCase();
    setActiveActor(actorParam === 'dept' || actorParam === 'student' ? actorParam : 'faculty');
  }, []);

  function formatRequestError(requestError: unknown): string {
    const raw = requestError instanceof Error ? requestError.message : 'Request failed';
    if (raw.includes('Cannot reach API')) {
      return 'Policy Administration cannot connect to the API right now. Start the backend (`npm run dev:server`) and refresh this page.';
    }
    return raw;
  }

  async function loadCalendar(year: number) {
    const response = await getFacultyCalendar(year);
    setCalendar({
      year: String(response.calendar.academicYear),
      rottSubmissionDeadline: response.calendar.rottSubmissionDeadline ?? '',
      progressReportDeadline: response.calendar.progressReportDeadline ?? '',
      intentionToSubmitDeadline: response.calendar.intentionToSubmitDeadline ?? '',
      appointExaminersDeadline: response.calendar.appointExaminersDeadline ?? '',
      publishedNotice: response.calendar.publishedNotice ?? '',
    });
  }

  async function loadManagedMessages() {
    const [facultyResult, deptResult] = await Promise.all([
      getManagedLandingMessages(activeActor),
      getManagedLandingMessages(activeActor),
    ]);
    setManagedFacultyMessages(facultyResult.data.filter((entry) => entry.scope === 'faculty'));
    setManagedDeptMessages(deptResult.data.filter((entry) => entry.scope === 'department'));
  }

  useEffect(() => {
    setActivePolicyAdminActor(activeActor);
    void (async () => {
      try {
        await loadCalendar(Number.parseInt(calendar.year, 10));
        await loadManagedMessages();
      } catch (requestError) {
        setError(formatRequestError(requestError));
      }
    })();
  }, [activeActor]);

  async function saveCalendar() {
    setError(null);
    setInfo(null);
    try {
      const year = Number.parseInt(calendar.year, 10);
      await patchFacultyCalendar(year, {
        rottSubmissionDeadline: calendar.rottSubmissionDeadline || null,
        progressReportDeadline: calendar.progressReportDeadline || null,
        intentionToSubmitDeadline: calendar.intentionToSubmitDeadline || null,
        appointExaminersDeadline: calendar.appointExaminersDeadline || null,
        publishedNotice: calendar.publishedNotice || null,
      }, activeActor);
      setInfo('Faculty deadline calendar updated.');
      await loadCalendar(year);
    } catch (requestError) {
      setError(formatRequestError(requestError));
    }
  }

  async function publishFacultyMessage() {
    setError(null);
    setInfo(null);
    try {
      await createLandingMessage({
        scope: 'faculty',
        message: facultyMessage,
      }, activeActor);
      setFacultyMessage('');
      await loadManagedMessages();
      setInfo('Faculty landing message published.');
    } catch (requestError) {
      setError(formatRequestError(requestError));
    }
  }

  async function publishDepartmentMessage() {
    setError(null);
    setInfo(null);
    try {
      await createLandingMessage({
        scope: 'department',
        departmentName,
        message: departmentMessage,
      }, activeActor);
      setDepartmentMessage('');
      await loadManagedMessages();
      setInfo('Department landing message published.');
    } catch (requestError) {
      setError(formatRequestError(requestError));
    }
  }

  async function closeMessage(entry: LandingMessage) {
    setError(null);
    setInfo(null);
    try {
      const today = new Date().toISOString().slice(0, 10);
      await patchLandingMessage(entry.id, { activeUntil: today }, activeActor);
      await loadManagedMessages();
      setInfo('Message closed for display.');
    } catch (requestError) {
      setError(formatRequestError(requestError));
    }
  }

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <div className='mx-auto max-w-6xl space-y-4'>
        <header className='rounded-2xl border border-white/10 bg-surface p-4'>
          <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
            <div>
              <h1 className='text-xl font-bold'>Policy and Deadline Administration</h1>
              <p className='mt-1 text-sm text-muted'>Manage annual Faculty deadlines and landing-page communications for Faculty and Department audiences.</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <a className='rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-surface2' href='/#main-menu'>
                Return to Main Menu
              </a>
              <a className='rounded-lg border border-white/20 px-3 py-1.5 text-sm hover:bg-surface2' href='/#landing'>
                Return to Landing Page
              </a>
            </div>
          </div>
        </header>

        {error && <div className='rounded-xl border border-red-300/40 bg-red-100/10 p-3 text-sm text-red-200'>{error}</div>}
        {info && <div className='rounded-xl border border-emerald-300/40 bg-emerald-100/10 p-3 text-sm text-emerald-200'>{info}</div>}

        <section className='grid gap-4 lg:grid-cols-2'>
          <div className='rounded-2xl border border-white/10 bg-surface p-4'>
            <h2 className='text-base font-semibold'>Faculty Annual Calendar</h2>
            <div className='mt-3 space-y-3'>
              <label className='block text-sm'>
                Academic year
                <input className={inputClassName()} value={calendar.year} onChange={(event) => setCalendar((prev) => ({ ...prev, year: event.target.value }))} />
              </label>
              <label className='block text-sm'>
                ROTT submission deadline
                <input type='date' className={inputClassName()} value={calendar.rottSubmissionDeadline} onChange={(event) => setCalendar((prev) => ({ ...prev, rottSubmissionDeadline: event.target.value }))} />
              </label>
              <label className='block text-sm'>
                Progress report deadline
                <input type='date' className={inputClassName()} value={calendar.progressReportDeadline} onChange={(event) => setCalendar((prev) => ({ ...prev, progressReportDeadline: event.target.value }))} />
              </label>
              <label className='block text-sm'>
                Intention to submit deadline
                <input type='date' className={inputClassName()} value={calendar.intentionToSubmitDeadline} onChange={(event) => setCalendar((prev) => ({ ...prev, intentionToSubmitDeadline: event.target.value }))} />
              </label>
              <label className='block text-sm'>
                Appoint examiners deadline
                <input type='date' className={inputClassName()} value={calendar.appointExaminersDeadline} onChange={(event) => setCalendar((prev) => ({ ...prev, appointExaminersDeadline: event.target.value }))} />
              </label>
              <label className='block text-sm'>
                Faculty published notice
                <textarea className={inputClassName()} rows={3} value={calendar.publishedNotice} onChange={(event) => setCalendar((prev) => ({ ...prev, publishedNotice: event.target.value }))} />
              </label>
              <button className='rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black' onClick={() => void saveCalendar()}>Save Faculty Calendar</button>
            </div>
          </div>

          <div className='rounded-2xl border border-white/10 bg-surface p-4'>
            <h2 className='text-base font-semibold'>Landing Messages</h2>
            <div className='mt-3 space-y-3'>
              <label className='block text-sm'>
                New Faculty message
                <textarea className={inputClassName()} rows={3} value={facultyMessage} onChange={(event) => setFacultyMessage(event.target.value)} />
              </label>
              <button className='rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black' onClick={() => void publishFacultyMessage()}>Publish Faculty Message</button>

              <label className='block text-sm'>
                Department
                <input className={inputClassName()} value={departmentName} onChange={(event) => setDepartmentName(event.target.value)} />
              </label>
              <label className='block text-sm'>
                New Department message
                <textarea className={inputClassName()} rows={3} value={departmentMessage} onChange={(event) => setDepartmentMessage(event.target.value)} />
              </label>
              <button className='rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-black' onClick={() => void publishDepartmentMessage()}>Publish Department Message</button>
            </div>
          </div>
        </section>

        <section className='grid gap-4 lg:grid-cols-2'>
          <div className='rounded-2xl border border-white/10 bg-surface p-4'>
            <h3 className='text-sm font-semibold'>Active/Managed Faculty Messages</h3>
            <div className='mt-3 space-y-2'>
              {managedFacultyMessages.length === 0 && <p className='text-sm text-muted'>No faculty messages.</p>}
              {managedFacultyMessages.map((entry) => (
                <div key={entry.id} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                  <p>{entry.message}</p>
                  <button className='mt-2 rounded-lg border border-white/20 px-3 py-1 text-xs' onClick={() => void closeMessage(entry)}>Close Message</button>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-2xl border border-white/10 bg-surface p-4'>
            <h3 className='text-sm font-semibold'>Active/Managed Department Messages</h3>
            <div className='mt-3 space-y-2'>
              {managedDeptMessages.length === 0 && <p className='text-sm text-muted'>No department messages.</p>}
              {managedDeptMessages.map((entry) => (
                <div key={entry.id} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                  <p className='text-xs text-muted'>{entry.departmentName ?? 'Department'}</p>
                  <p className='mt-1'>{entry.message}</p>
                  <button className='mt-2 rounded-lg border border-white/20 px-3 py-1 text-xs' onClick={() => void closeMessage(entry)}>Close Message</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
