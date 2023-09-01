import UserModel, { userSchema } from '../../models/user.model';
import bcrypt from 'bcrypt';

userSchema.statics.login = async ({ email, password }) => {
  if (email || !password) {
    throw new Error('Must fill email and password');
  }

  // find user
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email or password');
  }

  // checking password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect email or password');
  }

  return user;
};
