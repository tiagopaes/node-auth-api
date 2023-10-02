import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';

export interface UserAuthenticationInput {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  payload: JWTTokenPayload;
  token: string;
  expiresIn: number;
}

interface JWTTokenPayload {
  id: string,
  email: string,
  name: string;
  contact?: {
    whatsapp?: string;
  },
  createdAt: Date,
  updatedAt: Date,
}

export class UserAuthenticationUseCase {
  async execute(input: UserAuthenticationInput): Promise<AuthenticatedUser | null> {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      return null;
    }

    if (!bcrypt.compareSync(input.password, user.password)) {
      return null;
    }

    return generateAccessToken({
      id: user._id,
      email: user.email,
      name: user.name,
      contact: user.contact,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

function generateAccessToken(payload: JWTTokenPayload) {
  const expiresIn = 3600;
  const token = jwt.sign(payload, process.env.JWT_SECRET  as string, { expiresIn: `${expiresIn}s` });

  return {
    token,
    expiresIn,
    payload,
  }
}
