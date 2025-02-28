import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { validateUserRegistration } from '../utils/validators.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String, unique: true },
    avatar: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    bio: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  }
);

// Static method for registering a new user (local strategy)
userSchema.statics.registerLocal = async function (data) {
  const errors = validateUserRegistration(data);

  if (errors.length) throw new Error(errors.join(', '));

  const { firstName, lastName, email, password } = data;

  // Check if user already exists
  const existingUser = await this.findOne({ email });

  if (existingUser) throw new Error('A user with this email already exists.');

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
  });

  return user;
};

// Static method for registering a new user (Google OAuth strategy)
userSchema.statics.registerGoogle = async function (profile) {
  const { displayName, emails, id, photos } = profile;

  // Check if user already exists with the given email
  const existingUser = await this.findOne({ email: emails[0].value });

  if (existingUser && !existingUser.googleId) {
    existingUser.googleId = id;

    await existingUser.save();

    return existingUser;
  }

  const user = await this.create({
    name: displayName,
    email: emails[0].value,
    googleId: id,
    avatar: photos[0].value,
  });

  return user;
};

// Instance method to check if password is valid (for local strategy)
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Validate that a user has either a password or googleId (but not both)
userSchema.pre('save', function (next) {
  if (!this.password && !this.googleId) {
    return next(new Error('User must have either a password or googleId'));
  }

  next();
});

export default model('User', userSchema);
