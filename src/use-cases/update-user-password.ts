import bcrypt from 'bcrypt';
import { User } from '../models/user-model';

export interface UpdateUserPasswordInput {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserPasswordRequestBody {
  currentPassword: string,
  newPassword: string
}

export class UpdateUserPasswordUseCase {
  async execute(input: UpdateUserPasswordInput): Promise<boolean> {
    const user = await User.findById(input.userId);
    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(input.currentPassword, user.password)) {
      return false;
    }

    await User.updateOne({ _id: user._id }, { password: bcrypt.hashSync(input.newPassword, 10) });

    return true;
  }
}
