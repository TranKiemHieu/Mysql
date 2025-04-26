import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const secret = 'your-secret-key';

// Hàm kiểm tra mật khẩu mạnh
const isStrongPassword = (password: string): boolean => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  });
};

export const signup = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const {username, email, password, role } = req.body;

    //Kiểm tra email và pass
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    //Check email
    if (!validator.isEmail(email)){
      res.status(400).json({ message: 'Invalid email format'});
      return;
    }

    //Check pass
    if (!isStrongPassword(password)){
      res.status(400).json({ message: 
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
      return;
    }

    //Check email exist
    const existUser = await User.findOne({ where: {email} });
    if(existUser){
      res.status(409).json({ message: 'Email already exists'});
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: error.message || 'Some error occurred while registering the user.' });
  }
};

export const signin = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'Email not found.' });
      return;
    }

    if (!user.password) {
      res.status(500).json({ message: 'Invalid user data.' });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Wrong Password!' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ message: error.message || 'Some error occurred while signing in.' });
  }
};