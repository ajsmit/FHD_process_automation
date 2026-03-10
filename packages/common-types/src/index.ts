export type CaseStatus =
  | 'awaiting_student_vetting'
  | 'awaiting_supervisor_review'
  | 'returned_by_supervisor'
  | 'awaiting_dept_fhd_review'
  | 'awaiting_chairperson_signature'
  | 'awaiting_dept_fhd_send_to_faculty'
  | 'returned_by_dept_fhd'
  | 'sent_to_faculty_fhd'
  | 'returned_by_faculty_fhd'
  | 'approved';

export type ReviewDecision = 'vetted' | 'insufficient';

export interface TitleRegistrationCase {
  id: number;
  sasi_student_id: number;
  case_status: CaseStatus;
  form_data_json: string;
  completion_percent: number;
  pdf_path: string | null;
  student_vetted_at: string | null;
  supervisor_reviewed_at: string | null;
  dept_reviewed_at: string | null;
  faculty_reviewed_at: string | null;
  sent_to_faculty_at: string | null;
  last_reminder_at: string | null;
  last_comments: string | null;
  created_at: string;
  updated_at: string;
}

export interface FormData {
  'Student Title': string;
  'Student First-Name': string;
  'Student Surname': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Date of first title registration on SASI': string;
  'Student registration active on SASI': 'Yes' | 'No';
  'PhD by traditional thesis format': boolean;
  'PhD by publication': boolean;
  'Masters Full-thesis': boolean;
  'Masters Mini thesis': boolean;
  'Masters by publication': boolean;
  'Supervisor Title': string;
  Supervisor: string;
  'Supervisor Qualifications': string;
  'Supervisor is UWC-internal': 'Yes' | 'No';
  'Supervisor External Lookup Id': string;
  'Supervisor External First Name': string;
  'Supervisor External Surname': string;
  'Supervisor External Address': string;
  'Supervisor External Email': string;
  'Administrative Supervisor same as Supervisor': 'Yes' | 'No';
  'Administrative Supervisor (Nominal Role)': string;
  'Administrative Supervisor Qualifications (Nominal Role)': string;
  'Administrative Supervisor is UWC-internal': 'Yes' | 'No';
  'Administrative Supervisor External Lookup Id': string;
  'Administrative Supervisor External Title': string;
  'Administrative Supervisor External First Name': string;
  'Administrative Supervisor External Surname': string;
  'Administrative Supervisor External Address': string;
  'Administrative Supervisor External Email': string;
  'Has Co-supervisor?': 'Yes' | 'No';
  'Co-supervisor Title': string;
  'Co-supervisor': string;
  'Co-supervisor Qualifications': string;
  'Co-supervisor is UWC-internal': 'Yes' | 'No';
  'Co-supervisor External Lookup Id': string;
  'Co-supervisor External First Name': string;
  'Co-supervisor External Surname': string;
  'Co-supervisor External Address': string;
  'Co-supervisor External Email': string;
  'Second Co-supervisor Title': string;
  'Second Co-supervisor': string;
  'Second Co-supervisor Qualifications': string;
  'Second Co-supervisor is UWC-internal': 'Yes' | 'No';
  'Second Co-supervisor External Lookup Id': string;
  'Second Co-supervisor External First Name': string;
  'Second Co-supervisor External Surname': string;
  'Second Co-supervisor External Address': string;
  'Second Co-supervisor External Email': string;
  'Thesis title': string;
  'Key words': string;
  'Does this project need Ethics clearance?': 'Yes' | 'No';
  'Ethics clearance reference number': string;
  'Date on which ethics clearance was issued': string;
  'Has the MOU been submitted?': 'Yes' | 'No';
  'Year first registered': string;
  'Semester first registered': string;
  'Initial thesis title for upgrade from Masters to Doctoral': string;
  Abstract: string;
  'PhD proposal link (5-10 pages incl. timeframes)': string;
}

export type SupervisorProfileRole = 'supervisor' | 'co_supervisor' | 'admin_supervisor';

export interface SupervisorProfileForm {
  id: number;
  case_id: number;
  role: SupervisorProfileRole;
  person_name: string;
  person_title: string;
  qualifications: string;
  is_internal: 'Yes' | 'No';
  external_address: string;
  contact_email: string;
  publication_count: number | null;
  recent_publications_json: string;
  contribution_motivation: string;
  new_to_department: 'Yes' | 'No';
  cv_attached: 'Yes' | 'No';
  cv_file_path: string;
  status: 'draft' | 'requested' | 'completed' | 'inactive';
  requested_at: string | null;
  submitted_at: string | null;
  last_reminder_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MouFormRecord {
  id: number;
  case_id: number;
  form_data_json: string;
  completion_percent: number;
  status: 'draft' | 'completed';
  pdf_path: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MouFormData {
  'Student Full Name': string;
  'Student Number': string;
  Degree: string;
  Department: string;
  'First Year of Registration': string;
  'Study Mode': 'FULL TIME' | 'PART-TIME';
  'Expected Date of Completion': string;
  'Thesis Title': string;
  'Brief Description of Project (<200 words)': string;
  'Principal Supervisor': string;
  'Principal Supervisor Highest Qualifications': string;
  'Principal Supervisor Main Responsibilities': string;
  'Co-supervisor(s)': string;
  'Co-supervisor Highest Qualifications': string;
  'Co-supervisor Main Responsibilities': string;
  'Supervisor Availability Arrangements': string;
  'Student Leave Entitlement Per Annum': string;
  'Student Extended Research Away from UWC Arrangements': string;
  'Prescribed Courses/Workshops': string;
  'Time Allocation': string;
  'Space Allocation': string;
  'Computer Facilities': string;
  'Financial Arrangements for Project': string;
  'Publication Issues': string;
  'Data Ownership': string;
  'Supervisor-Student Meetings': string;
  'Progress Reports': string;
  'Study Outputs': string;
  'Research Visits/Conferences': string;
  'Other Duties': string;
  'Other Expectations': string;
  'Other Issues Relevant to Study': string;
  'Student Signature Confirmed': 'Yes' | 'No';
  'Supervisor Signature Confirmed': 'Yes' | 'No';
  'Co-supervisor Signature Confirmed': 'Yes' | 'No';
  'Dept Chair/PG Coord Signature Confirmed': 'Yes' | 'No';
}

export interface ModuleFormRecord {
  id: number;
  case_id: number;
  form_data_json: string;
  completion_percent: number;
  status:
    | 'draft'
    | 'submitted'
    | 'awaiting_supervisor_review'
    | 'awaiting_dept_review'
    | 'awaiting_chairperson_review'
    | 'awaiting_faculty_review'
    | 'returned_by_supervisor'
    | 'returned_by_dept'
    | 'returned_by_chairperson'
    | 'returned_by_faculty'
    | 'approved';
  pdf_path: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ModuleReviewDecision = 'approved' | 'returned';

export interface IntentionToSubmitFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Year of first enrolment': string;
  'Submission type': '' | 'Mini thesis' | 'Project' | 'Full thesis';
  'Intended submission date': string;
  'Student declaration': string;
  'Student signature date': string;
  'Supervisor approval status': 'Pending' | 'Approved' | 'Not approved';
  'Co-supervisor approval status': 'Not applicable' | 'Pending' | 'Approved' | 'Not approved';
  'Department PG coordinator approval status': 'Pending' | 'Approved' | 'Not approved';
  'Non-approval motivation': string;
}

export interface AppointExaminersFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Faculty and Department': string;
  Degree: string;
  Supervisor: string;
  'Co-supervisor(s)': string;
  'Thesis title': string;
  'Year of first enrolment': string;
  'Title already registered': 'Yes' | 'No';
  'Concurrent title-change declaration': string;
  'Examiner 1 Name': string;
  'Examiner 1 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 1 Affiliation': string;
  'Examiner 1 Motivation': string;
  'Examiner 1 CV received': 'Yes' | 'No';
  'Examiner 1 Conflict disclosure': string;
  'Examiner 2 Name': string;
  'Examiner 2 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 2 Affiliation': string;
  'Examiner 2 Motivation': string;
  'Examiner 2 CV received': 'Yes' | 'No';
  'Examiner 2 Conflict disclosure': string;
  'Examiner 3 Name': string;
  'Examiner 3 Type': '' | 'Internal' | 'External' | 'International';
  'Examiner 3 Affiliation': string;
  'Examiner 3 Motivation': string;
  'Examiner 3 CV received': 'Yes' | 'No';
  'Examiner 3 Conflict disclosure': string;
}

export interface ChangeExaminersFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Current examiner panel summary': string;
  'Change motivation': string;
  'Replacement Examiner 1 Name': string;
  'Replacement Examiner 1 Type': '' | 'Internal' | 'External' | 'International';
  'Replacement Examiner 1 Affiliation': string;
  'Replacement Examiner 1 Motivation': string;
  'Replacement Examiner 2 Name': string;
  'Replacement Examiner 2 Type': '' | 'Internal' | 'External' | 'International';
  'Replacement Examiner 2 Affiliation': string;
  'Replacement Examiner 2 Motivation': string;
}

export interface ExaminerSummaryCvFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Examiner panel summary': string;
  'Summary CV packet status': 'Pending' | 'Complete';
  'Compiled by': string;
  'Compilation date': string;
  Notes: string;
}

export interface AppointArbiterFormData {
  'Student Full Name': string;
  'Student Number': string;
  'Thesis title': string;
  'Examiner panel summary': string;
  'Arbiter Name': string;
  'Arbiter Type': '' | 'Internal' | 'External' | 'International';
  'Arbiter Affiliation': string;
  'Arbiter Motivation': string;
  'Arbiter CV received': 'Yes' | 'No';
  'Arbiter conflict disclosure': string;
}

export interface ChangeTitleFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Current Thesis Title': string;
  'Proposed Thesis Title': string;
  'Change Rationale': string;
  'Ethics Impact': string;
  'Supervisor Comments': string;
}

export interface ChangeSupervisorFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Current Supervision Roster': string;
  'Role To Change': '' | 'Primary Supervisor' | 'Administrative Supervisor' | 'Co-supervisor 1' | 'Co-supervisor 2';
  'Outgoing Academic': string;
  'Incoming Academic': string;
  'Incoming Academic Qualification': string;
  'Incoming Academic Is UWC Internal': 'Yes' | 'No';
  'Change Rationale': string;
  'Continuity Plan': string;
}

export interface AddCoSupervisorFormData {
  'Student Full Name': string;
  'Student Number': string;
  Department: string;
  Degree: string;
  'Thesis Title': string;
  Supervisor: string;
  'Current Co-supervisors': string;
  'Proposed Co-supervisor': string;
  'Proposed Co-supervisor Qualification': string;
  'Proposed Co-supervisor Is UWC Internal': 'Yes' | 'No';
  'Motivation For Addition': string;
}
