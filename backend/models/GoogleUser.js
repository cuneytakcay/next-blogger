import { Schema, model } from 'mongoose';

const googleUserSchema = new Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
});

export default model('GoogleUser', googleUserSchema);
