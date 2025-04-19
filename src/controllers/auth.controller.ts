import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secret = 'your-secret-key';

export const signup = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({ message: 'User was registered successfully!' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: error.message || 'Some error occurred while registering the user.' });
  }
};

export const signin = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ message: 'User Not found.' });
      return;
    }

    if (!user.password) {
      res.status(500).json({ message: 'Invalid user data.' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Invalid Password!' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      role: user.role,
      accessToken: token,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: error.message || 'Some error occurred while signing in.' });
  }
};