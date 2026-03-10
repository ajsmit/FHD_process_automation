'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building2, Contact, Globe, Info, Link2, MapPin, UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  completeExternalAcademicInvite,
  getExternalAcademicInvite,
  type ExternalAcademicProfilePayload,
  type ExternalIdentifierType,
} from '@/lib/api';

const identifierTypes: ExternalIdentifierType[] = ['SA_ID', 'PASSPORT', 'OTHER'];
const contactMethods = ['Email', 'Phone', 'WhatsApp', 'Either email or phone'];
const countryOptions = ['South Africa', 'Namibia', 'Botswana', 'Zimbabwe', 'Kenya', 'United Kingdom', 'United States', 'Other'];

const inputClassName =
  'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm text-text outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25';

function roleLabel(role: string): string {
  if (role === 'supervisor') return 'Main supervisor';
  if (role === 'admin') return 'Administrative supervisor';
  if (role === 'co1' || role === 'co2') return 'Co-supervisor';
  return 'Supervisor';
}

function FieldLabel({ text, required = false, optional = false }: { text: string; required?: boolean; optional?: boolean }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm text-muted'>{text}</span>
      {required ? <span className='text-xs text-rose-300'>Required</span> : null}
      {optional ? <span className='text-xs text-muted'>Optional</span> : null}
    </div>
  );
}

function SectionCard(props: { title: string; description: string; icon: React.ComponentType<{ size?: number; className?: string }>; delay: number; children: React.ReactNode }) {
  const Icon = props.icon;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: props.delay }}>
      <Card>
        <div className='mb-3 flex items-center gap-2'>
          <Icon size={14} className='text-accent' />
          <h3 className='text-sm font-bold'>{props.title}</h3>
        </div>
        <p className='mb-3 text-xs text-muted'>{props.description}</p>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
          {props.children}
        </div>
      </Card>
    </motion.div>
  );
}

export default function ExternalAcademicInvitePage() {
  const params = useParams<{ token: string }>();
  const token = useMemo(() => String(params?.token ?? ''), [params]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [role, setRole] = useState('supervisor');
  const [studentName, setStudentName] = useState('Student');
  const [thesisType, setThesisType] = useState('Not specified');
  const [thesisTitle, setThesisTitle] = useState('Not specified');
  const [inviteeName, setInviteeName] = useState('Colleague');

  const [form, setForm] = useState<ExternalAcademicProfilePayload>({
    title: '',
    first_name: '',
    middle_names: '',
    preferred_name: '',
    last_name: '',
    highest_qualification: '',
    email: '',
    alternate_email: '',
    preferred_contact_method: '',
    address: '',
    city: '',
    province_state: '',
    postal_code: '',
    country: '',
    phone: '',
    affiliation_institution: '',
    affiliation_department: '',
    affiliation_position_title: '',
    orcid: '',
    website_url: '',
    google_scholar_url: '',
    scopus_id: '',
    expertise_keywords: '',
    identifier_type: 'SA_ID',
    identifier_value: '',
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    void getExternalAcademicInvite(token)
      .then((invite) => {
        setPrefillEmail(invite.email);
        setForm((prev) => ({
          ...prev,
          email: invite.email,
          preferred_contact_method: prev.preferred_contact_method || 'Email',
          country: prev.country || 'South Africa',
        }));
        setRole(invite.role);
        setStudentName(invite.studentName || 'Student');
        setThesisType(invite.thesisType || 'Not specified');
        setThesisTitle(invite.thesisTitle || 'Not specified');
        const salutation = `${invite.inviteeTitle || ''} ${invite.inviteeFirstName || ''} ${invite.inviteeSurname || ''}`.replace(/\s+/g, ' ').trim();
        setInviteeName(salutation || 'Colleague');
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Failed to load invite');
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    setInfo(null);
    try {
      await completeExternalAcademicInvite(token, form);
      setInfo('Profile submitted successfully. Thank you, your details have been saved and linked to the workflow case.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to submit profile');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className='mx-auto max-w-7xl p-4 md:p-8 text-sm text-muted'>Loading invite...</main>;
  }

  return (
    <main className='min-h-screen p-4 md:p-8'>
      <div className='mx-auto max-w-7xl space-y-4'>
        <Card>
          <h1 className='text-lg font-bold'>UWC External Academic Profile</h1>
          <p className='mt-2 text-sm text-muted'>Dear <span className='font-semibold text-white'>{inviteeName}</span>,</p>
          <p className='mt-4 text-sm text-muted'>
            You have been invited in the role of <span className='font-semibold text-white'>{roleLabel(role)}</span> for the thesis{' '}
            <span className='font-semibold text-white'>{thesisType}</span>, <span className='font-semibold text-white'>{thesisTitle}</span>, and student{' '}
            <span className='font-semibold text-white'>{studentName}</span>.
          </p>
          <p className='mt-4 text-sm text-muted'>To ensure we have your details on record, please complete the form below.</p>
          {prefillEmail ? <p className='mt-1 text-sm text-muted'>Invite email: {prefillEmail}</p> : null}
        </Card>

        {error ? (
          <motion.div initial={{ x: 0 }} animate={{ x: [0, -5, 5, -3, 3, 0] }} transition={{ duration: 0.32 }}>
            <Card className='border-rose-500/40'>
              <p className='text-sm text-rose-300'>{error}</p>
            </Card>
          </motion.div>
        ) : null}
        {info ? (
          <Card className='border-emerald-500/40'>
            <p className='text-sm text-emerald-300'>{info}</p>
          </Card>
        ) : null}

        <form className='space-y-4' onSubmit={handleSubmit}>
          <SectionCard title='Identity' description='Core personal and identification details used for role assignment and verification.' icon={UserRound} delay={0}>
            <label className='space-y-1 md:col-span-2 lg:col-span-2'>
              <FieldLabel text='Title' required />
              <input className={inputClassName} placeholder='Prof / Dr / Mr / Ms' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='First name' required />
              <input className={inputClassName} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='Surname' required />
              <input className={inputClassName} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='Middle names' optional />
              <input className={inputClassName} value={form.middle_names ?? ''} onChange={(e) => setForm({ ...form, middle_names: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='Preferred name' optional />
              <input className={inputClassName} value={form.preferred_name ?? ''} onChange={(e) => setForm({ ...form, preferred_name: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Highest qualification' required />
              <input className={inputClassName} value={form.highest_qualification} onChange={(e) => setForm({ ...form, highest_qualification: e.target.value })} required />
            </label>
            <label className='space-y-1 md:col-span-2 lg:col-span-3'>
              <FieldLabel text='Identifier type' required />
              <select className={inputClassName} value={form.identifier_type} onChange={(e) => setForm({ ...form, identifier_type: e.target.value as ExternalIdentifierType })}>
                {identifierTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className='space-y-1 md:col-span-4 lg:col-span-5'>
              <FieldLabel text='ID / Passport / Other unique number' required />
              <input className={inputClassName} value={form.identifier_value} onChange={(e) => setForm({ ...form, identifier_value: e.target.value })} required />
            </label>
          </SectionCard>

          <SectionCard title='Contact' description='Preferred communication channels for workflow communication and reminders.' icon={Contact} delay={0.03}>
            <label className='space-y-1 md:col-span-6 lg:col-span-6'>
              <FieldLabel text='Primary email' required />
              <input className={`${inputClassName} cursor-not-allowed bg-surface/70 text-muted`} type='email' value={form.email} readOnly aria-readonly='true' required />
              <p className='text-xs text-muted'>Prefilled from the invite and fixed for this request.</p>
            </label>
            <label className='space-y-1 md:col-span-6 lg:col-span-6'>
              <FieldLabel text='Alternate email' optional />
              <input className={inputClassName} type='email' value={form.alternate_email ?? ''} onChange={(e) => setForm({ ...form, alternate_email: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Phone' optional />
              <input className={inputClassName} value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Preferred contact method' required />
              <select className={inputClassName} value={form.preferred_contact_method ?? ''} onChange={(e) => setForm({ ...form, preferred_contact_method: e.target.value })}>
                <option value='' disabled>--- Select contact method ---</option>
                {contactMethods.map((method) => <option key={method} value={method}>{method}</option>)}
              </select>
            </label>
          </SectionCard>

          <SectionCard title='Address' description='Mailing address and region details for verification and records.' icon={MapPin} delay={0.06}>
            <label className='space-y-1 md:col-span-6 lg:col-span-7'>
              <FieldLabel text='Address' required />
              <textarea className={`${inputClassName} min-h-20`} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='City' optional />
              <input className={inputClassName} value={form.city ?? ''} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-2'>
              <FieldLabel text='Postal code' optional />
              <input className={inputClassName} value={form.postal_code ?? ''} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Province/State' optional />
              <input className={inputClassName} value={form.province_state ?? ''} onChange={(e) => setForm({ ...form, province_state: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Country' required />
              <select className={inputClassName} value={form.country ?? ''} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                <option value='' disabled>--- Select country ---</option>
                {countryOptions.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
            </label>
          </SectionCard>

          <SectionCard title='Institution And Role' description='Current affiliation details relevant to the role in this thesis workflow.' icon={Building2} delay={0.09}>
            <label className='space-y-1 md:col-span-6 lg:col-span-5'>
              <FieldLabel text='Institution' optional />
              <input className={inputClassName} value={form.affiliation_institution ?? ''} onChange={(e) => setForm({ ...form, affiliation_institution: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-4'>
              <FieldLabel text='Department' optional />
              <input className={inputClassName} value={form.affiliation_department ?? ''} onChange={(e) => setForm({ ...form, affiliation_department: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='Position title' optional />
              <input className={inputClassName} value={form.affiliation_position_title ?? ''} onChange={(e) => setForm({ ...form, affiliation_position_title: e.target.value })} />
            </label>
          </SectionCard>

          <SectionCard title='Research Profile' description='Scholarly profile links and expertise tags used for selection and auditing.' icon={Globe} delay={0.12}>
            <label className='space-y-1 md:col-span-3 lg:col-span-3'>
              <FieldLabel text='ORCID' optional />
              <input className={inputClassName} value={form.orcid ?? ''} onChange={(e) => setForm({ ...form, orcid: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-3 lg:col-span-5'>
              <FieldLabel text='Google Scholar URL' optional />
              <div className='relative'>
                <Link2 size={14} className='pointer-events-none absolute left-2 top-3 text-muted' />
                <input className={`${inputClassName} pl-7`} value={form.google_scholar_url ?? ''} onChange={(e) => setForm({ ...form, google_scholar_url: e.target.value })} />
              </div>
            </label>
            <label className='space-y-1 md:col-span-6 lg:col-span-4'>
              <FieldLabel text='Scopus ID' optional />
              <input className={inputClassName} value={form.scopus_id ?? ''} onChange={(e) => setForm({ ...form, scopus_id: e.target.value })} />
            </label>
            <label className='space-y-1 md:col-span-6 lg:col-span-6'>
              <FieldLabel text='Website URL' optional />
              <div className='relative'>
                <Link2 size={14} className='pointer-events-none absolute left-2 top-3 text-muted' />
                <input className={`${inputClassName} pl-7`} value={form.website_url ?? ''} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
              </div>
            </label>
            <label className='space-y-1 md:col-span-6 lg:col-span-6'>
              <FieldLabel text='Expertise keywords (comma-separated)' optional />
              <input className={inputClassName} value={form.expertise_keywords ?? ''} onChange={(e) => setForm({ ...form, expertise_keywords: e.target.value })} />
              <p className='inline-flex items-center gap-1 text-xs text-muted'><Info size={12} />Example: Marine ecology, climate adaptation, taxonomy</p>
            </label>
          </SectionCard>

          <Card className='sticky bottom-3 border-accent/30 bg-surface/95'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div className='text-xs text-muted'>Review required fields before submitting. You can use keyboard `Tab` navigation through all inputs.</div>
              <Button type='submit' disabled={submitting} className='min-w-40'>{submitting ? 'Submitting...' : 'Submit profile'}</Button>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}
