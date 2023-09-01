import UserModel, { userSchema } from '../../models/user.model';
import validator from 'validator';
import bcrypt from 'bcrypt';

userSchema.statics.register = async ({
  name,
  photoUrl,
  email,
  password,
  address,
  phoneNumber,
}) => {
  if (!name || !photoUrl || email || !password) {
    throw new Error('Must fill name, photoUrl, email and password');
  }

  // existing email
  const existingUser = await UserModel.find({ email });

  if (existingUser) {
    throw new Error('Email already in use');
  }

  // validate email
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  // create salt
  const salt = await bcrypt.genSalt(10);

  // encrypt password/hash
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await UserModel.create({
    name,
    photoUrl,
    email,
    password: hash,
    address,
    phoneNumber,
  });

  return user;
};
