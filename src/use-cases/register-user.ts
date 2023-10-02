import bcrypt from 'bcrypt';
import { User } from '../models/user-model';

export interface RegisterUserInput {
  email: string;
  name: string;
  password: string;
  contact: {
    whatsapp: string;
  };
};

export class UniqueEmailError extends Error {}

export interface RegisteredUser {
  id: string;
  email: string;
  name: string;
  contact: {
    whatsapp: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class RegisterUserUseCase {
  async execute(input: RegisterUserInput): Promise<RegisteredUser> {
    const { email, name, contact, password } = input;

    const user = await User.findOne({ email });
    if (user) {
      throw new UniqueEmailError('The email is already in use')
    }

    const createdUser = await User.create({
      email,
      name,
      contact,
      password: bcrypt.hashSync(password, 10),
    });

    return {
      id: createdUser._id,
      email,
      name,
      contact,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  }
}
