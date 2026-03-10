import { z } from 'zod';

const nonEmptyString = z.string().trim().min(1);

export const caseIdParamSchema = z.object({
  caseId: z.string().regex(/^\d+$/, { message: 'caseId must be a positive integer string.' }),
});

export const profileIdParamSchema = z.object({
  profileId: z.string().regex(/^\d+$/, { message: 'profileId must be a positive integer string.' }),
});

export const studentNumberParamSchema = z.object({
  studentNumber: nonEmptyString.max(64),
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
