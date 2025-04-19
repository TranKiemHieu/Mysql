import { Request, Response, NextFunction } from 'express';

export const welcome = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({ message: 'Welcome to the API!' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: error.message || 'Some error occurred.' });
  }
};