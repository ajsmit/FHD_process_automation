import { Request, Response } from 'express';
import * as titleRegistrationService from '../services/titleRegistrationService';
import { toAppError } from '../errors/httpErrors';

function handleControllerError(
  res: Response,
  error: unknown,
  fallback: { statusCode: number; code: string; message: string },
): void {
  const appError = toAppError(error, fallback);
  const message = appError.exposeMessage ? appError.message : fallback.message;
  res.status(appError.statusCode).json({ message, code: appError.code, details: appError.details });
}

export const createTitleRegistration = async (req: Request, res: Response) => {
    try {
        const { student_id, supervisor_id, proposed_title } = req.body;
        if (!student_id || !supervisor_id || !proposed_title) {
            return res.status(400).json({ message: 'student_id, supervisor_id, and proposed_title are required' });
        }

        const newRegistration = await titleRegistrationService.create(req.body);
        res.status(201).json(newRegistration);
    } catch (error) {
        handleControllerError(res, error, { statusCode: 500, code: 'title_registration_create_failed', message: 'Error creating title registration.' });
    }
};

export const getTitleRegistrationById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const registration = await titleRegistrationService.getById(id);
        if (registration) {
            res.status(200).json(registration);
        } else {
            res.status(404).json({ message: 'Title registration not found' });
        }
    } catch (error) {
        handleControllerError(res, error, { statusCode: 500, code: 'title_registration_get_failed', message: 'Error retrieving title registration.' });
    }
};

export const getAllTitleRegistrations = async (req: Request, res: Response) => {
    try {
        const registrations = await titleRegistrationService.getAll();
        res.status(200).json(registrations);
    } catch (error) {
        handleControllerError(res, error, { statusCode: 500, code: 'title_registration_list_failed', message: 'Error retrieving title registrations.' });
    }
}
