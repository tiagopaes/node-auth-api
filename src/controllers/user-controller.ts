import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { RegisterUserUseCase, RegisterUserInput, UniqueEmailError } from '../use-cases/register-user';
import { GetUserProfileUseCase } from '../use-cases/get-user-profile';
import {
  UserAuthenticationUseCase,
  UserAuthenticationInput,
} from '../use-cases/user-authentication';
import {
  UpdateUserPasswordUseCase,
  UpdateUserPasswordRequestBody
} from '../use-cases/update-user-password';
import { isValidObjectId } from 'mongoose';

class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const schema = z.object({
        email: z.string().email(),
        name: z.string(),
        password: z.string().min(6),
        contact: z.object({
          whatsapp: z.string(),
        }),
      });

      const requestSchema = schema.parse(req.body) as RegisterUserInput;
      const registerUserUseCase = new RegisterUserUseCase();
      const registeredUser = await registerUserUseCase.execute(requestSchema);
      return res.status(201).json(registeredUser);

    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }

      if (error instanceof UniqueEmailError) {
        return res.status(400).json({ error: 'Validation Error', details: error.message });
      }

      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserProfile(req: Request, res: Response) {
    try {
      const schema = z.object({
        id: z.string().refine(value => isValidObjectId(value), { message: 'Invalid ObjectId' }),
      });

      const { id } = schema.parse(req.params);
      const getUserProfileUseCase = new GetUserProfileUseCase();
      const userProfile = await getUserProfileUseCase.execute(id);

      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(userProfile);
    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }

      console.error('Error getting user profile:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string(),
      });

      const userAuthenticationInput = schema.parse(req.body) as UserAuthenticationInput;
      const userAuthenticationUseCase = new UserAuthenticationUseCase();
      const authenticatedUser = await userAuthenticationUseCase.execute(userAuthenticationInput);

      if (!authenticatedUser) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.json(authenticatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }

      console.error('Error authenticating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updatePassword(req: Request, res: Response) {
    try {
      const requestBodyschema = z.object({
        currentPassword: z.string().min(6),
        newPassword: z.string().min(6),
      });

      const paramsSchema = z.object({
        id: z.string().refine(value => isValidObjectId(value), { message: 'Invalid ObjectId' }),
      });

      const { currentPassword, newPassword } = requestBodyschema.parse(req.body) as UpdateUserPasswordRequestBody;
      const { id: userId } = paramsSchema.parse(req.params);

      const updateUserPasswordUseCase = new UpdateUserPasswordUseCase();
      const passwordUpdated = await updateUserPasswordUseCase.execute({
        currentPassword,
        newPassword,
        userId,
      })

      if (!passwordUpdated) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      return res.sendStatus(204);
    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: error.errors });
      }

      console.error('Error updating password:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
