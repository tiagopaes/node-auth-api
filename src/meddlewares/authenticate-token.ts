import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}