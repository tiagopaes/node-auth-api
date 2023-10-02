import { User } from '../models/user-model';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  contact?: {
    whatsapp?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class GetUserProfileUseCase {
  async execute(userId: string): Promise<UserProfile | null> {
  
    const user = await User.findById(userId);
    
    if (user) {
      return {
        id: user._id,
        email: user.email,
        name: user.name,
        contact: user.contact,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }

    return null;
  }
}
