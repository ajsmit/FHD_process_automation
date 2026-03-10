import { Request, Response } from 'express';
import * as titleRegistrationService from '../services/titleRegistrationService';

export const createTitleRegistration = async (req: Request, res: Response) => {
    try {
        const { student_id, supervisor_id, proposed_title } = req.body;
        if (!student_id || !supervisor_id || !proposed_title) {
            return res.status(400).json({ message: 'student_id, supervisor_id, and proposed_title are required' });
        }

        const newRegistration = await titleRegistrationService.create(req.body);
        res.status(201).json(newRegistration);
    } catch (error) {
        // A simple error handler
        res.status(500).json({ message: 'Error creating title registration', error });
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
        res.status(500).json({ message: 'Error retrieving title registration', error });
    }
};

export const getAllTitleRegistrations = async (req: Request, res: Response) => {
    try {
        const registrations = await titleRegistrationService.getAll();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving title registrations', error });
    }
}