import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);
const sasiStudentNumber = z.string().trim().regex(/^\d{7}$/, { message: 'studentNumber must be exactly 7 digits.' });

export const caseIdParamSchema = z.object({
  caseId: z.string().regex(/^\d+$/, { message: 'caseId must be a positive integer string.' }),
});

export const profileIdParamSchema = z.object({
  profileId: z.string().regex(/^\d+$/, { message: 'profileId must be a positive integer string.' }),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'id must be a positive integer string.' }),
});

export const studentNumberParamSchema = z.object({
  studentNumber: sasiStudentNumber,
});

export const tokenParamSchema = z.object({
  token: nonEmptyString.max(512),
});

export const phase1StepParamSchema = z.object({
  step: z.enum(['mou', 'title_registration', 'supervisor_profile', 'examiners', 'intention_to_submit']),
});

export const devLoginBodySchema = z.object({
  sasiId: nonEmptyString.max(64),
});

export const loginBodySchema = z.object({
  identifier: nonEmptyString.max(255),
  password: z.string().min(1).max(512),
});

export const refreshTokenBodySchema = z.object({
  refreshToken: nonEmptyString.max(1024),
});

export const reviewDecisionBodySchema = z.object({
  decision: z.enum(['vetted', 'insufficient']),
  comments: z.string().max(5000).optional(),
});

export const moduleReviewDecisionBodySchema = z.object({
  decision: z.enum(['approved', 'returned']),
  comments: z.string().max(5000).optional(),
});

export const commentsOnlyBodySchema = z.object({
  comments: z.string().max(5000).optional(),
});

export const patchPayloadBodySchema = z.object({}).passthrough();

export const directoryQuerySchema = z.object({
  faculty: z.string().trim().min(1).max(128).optional(),
  department: z.string().trim().min(1).max(255).optional(),
  q: z.string().trim().min(1).max(255).optional(),
  internalOnly: z.enum(['true', 'false']).optional(),
});

export const sasiSearchQuerySchema = z.object({
  studentNumber: sasiStudentNumber.optional(),
  firstName: z.string().trim().min(1).max(128).optional(),
  lastName: z.string().trim().min(1).max(128).optional(),
}).refine((value) => Boolean(value.studentNumber || value.firstName || value.lastName), {
  message: 'Provide studentNumber or firstName/lastName query parameters.',
});

export const pipelineQuerySchema = z.object({
  caseId: z.string().regex(/^\d+$/, { message: 'caseId must be a positive integer string.' }).optional(),
});

export const calendarYearParamSchema = z.object({
  year: z.string().regex(/^\d{4}$/, { message: 'year must be a 4-digit value.' }),
});

export const calendarQuerySchema = z.object({
  year: z.string().regex(/^\d{4}$/, { message: 'year must be a 4-digit value.' }).optional(),
});

const calendarDateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must use YYYY-MM-DD format.' });

export const calendarPatchBodySchema = z.object({
  rottSubmissionDeadline: calendarDateString.nullish(),
  progressReportDeadline: calendarDateString.nullish(),
  intentionToSubmitDeadline: calendarDateString.nullish(),
  appointExaminersDeadline: calendarDateString.nullish(),
  publishedNotice: z.string().max(5000).nullish(),
});

export const messageIdParamSchema = z.object({
  messageId: z.string().regex(/^\d+$/, { message: 'messageId must be a positive integer string.' }),
});

export const landingMessagesQuerySchema = z.object({
  caseId: z.string().regex(/^\d+$/, { message: 'caseId must be a positive integer string.' }).optional(),
  department: z.string().trim().min(1).max(255).optional(),
});

export const landingMessageBodySchema = z.object({
  scope: z.enum(['faculty', 'department']),
  departmentName: z.string().trim().min(1).max(255).optional().nullable(),
  message: nonEmptyString.max(8000),
  activeFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'activeFrom must use YYYY-MM-DD format.' }).optional().nullable(),
  activeUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'activeUntil must use YYYY-MM-DD format.' }).optional().nullable(),
});

export const landingMessagePatchBodySchema = z.object({
  message: z.string().trim().min(1).max(8000).optional(),
  activeFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'activeFrom must use YYYY-MM-DD format.' }).optional().nullable(),
  activeUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'activeUntil must use YYYY-MM-DD format.' }).optional().nullable(),
});

export const externalInviteCreateBodySchema = z.object({
  caseId: z.coerce.number().int().positive(),
  role: z.enum(['supervisor', 'admin', 'co1', 'co2']),
  email: z.string().trim().email().max(255),
});

export const externalInviteCompleteBodySchema = z.object({
  title: nonEmptyString.max(64),
  first_name: nonEmptyString.max(128),
  middle_names: z.string().max(255).optional(),
  preferred_name: z.string().max(128).optional(),
  last_name: nonEmptyString.max(128),
  highest_qualification: nonEmptyString.max(255),
  email: z.string().trim().email().max(255),
  alternate_email: z.string().trim().email().max(255).optional(),
  preferred_contact_method: z.string().max(64).optional(),
  address: nonEmptyString.max(512),
  city: z.string().max(128).optional(),
  province_state: z.string().max(128).optional(),
  postal_code: z.string().max(32).optional(),
  country: nonEmptyString.max(128),
  phone: z.string().max(64).optional(),
  affiliation_institution: z.string().max(255).optional(),
  affiliation_department: z.string().max(255).optional(),
  affiliation_position_title: z.string().max(255).optional(),
  orcid: z.string().max(64).optional(),
  website_url: z.string().max(512).optional(),
  google_scholar_url: z.string().max(512).optional(),
  scopus_id: z.string().max(128).optional(),
  expertise_keywords: z.string().max(1024).optional(),
  identifier_type: z.enum(['SA_ID', 'PASSPORT', 'OTHER']),
  identifier_value: nonEmptyString.max(128),
});

export const phase1TitleRegistrationBodySchema = z.object({
  studentNumber: sasiStudentNumber,
  proposedTitle: nonEmptyString.max(500),
  abstract: z.string().max(8000).optional(),
});

export const profileCvUploadBodySchema = z.object({
  fileName: nonEmptyString.max(255),
  contentBase64: nonEmptyString.max(25_000_000),
});

export const titleRegistrationCreateBodySchema = z.object({
  student_id: z.coerce.number().int().positive(),
  supervisor_id: z.coerce.number().int().positive(),
  proposed_title: nonEmptyString.max(500),
  abstract: z.string().max(8000).optional(),
});
