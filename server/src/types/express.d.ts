import type { Role } from '../auth/tokenService';

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: number;
        sasiId: string;
        role: Role;
        firstName: string;
        lastName: string;
      };
    }
  }
}

export {};

