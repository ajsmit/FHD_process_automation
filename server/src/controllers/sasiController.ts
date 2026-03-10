import { Request, Response } from 'express';
import { searchStudents } from '../services/sasiService';

export async function searchSasiStudents(req: Request, res: Response): Promise<void> {
  try {
    const studentNumber = typeof req.query.studentNumber === 'string' ? req.query.studentNumber : undefined;
    const firstName = typeof req.query.firstName === 'string' ? req.query.firstName : undefined;
    const lastName = typeof req.query.lastName === 'string' ? req.query.lastName : undefined;

    if (!studentNumber && !firstName && !lastName) {
      res.status(400).json({ message: 'Provide studentNumber or firstName/lastName query parameters.' });
      return;
    }

    const students = await searchStudents({ studentNumber, firstName, lastName });
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: 'Failed to search SASI students', error });
  }
}
