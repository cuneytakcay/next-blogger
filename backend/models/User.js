import { Schema, model } from 'mongoose';
import CryptoJS from 'crypto-js';
import validator from 'validator';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

// Static method for registering a new user
userSchema.statics.register = async function ({
  firstName,
  lastName,
  email,
  password,
  avatar,
}) {
  const errors = [];

  if (validator.isEmpty(firstName)) errors.push('First name cannot be empty');

  if (validator.isEmpty(lastName)) errors.push('Last name cannot be empty');

  if (!email || !validator.isEmail(email)) errors.push('Invalid email');

  if (
    !validator.matches(
      password,
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
    )
  )
    errors.push(
      'Password must contain at least one number and one special character and must be at least 8 characters long'
    );

  if (errors.length) throw new Error(errors.join(', '));

  const hashedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRET
  ).toString();

  const user = await this.create({
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
    avatar,
  });

  return user;
};

// Static method for logging in a user
userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });

  if (!user) throw new Error('Invalid user credentials');

  const bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET);
  const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (originalPassword !== password)
    throw new Error('Invalid user credentials');

  return user;
};

export default model('User', userSchema);
