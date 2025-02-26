import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (categories) => categories.length > 0,
        message: 'At least one category is required',
      },
    },
  },
  { timestamps: true }
);

export default model('Post', postSchema);
