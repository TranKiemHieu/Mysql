import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

const secret = 'your-secret-key';

// Định nghĩa kiểu RequestHandler rõ ràng
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //Token
  //const token = req.headers['x-access-token'] as string;
  //Bearer token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    res.status(403).json({ message: 'No token provided!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: number; role: string };
    const user = await User.findByPk(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized!' });
    return;
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Require Admin Role!' });
    return;
  }
  next();
};