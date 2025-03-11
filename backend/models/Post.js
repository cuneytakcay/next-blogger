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
    teaserText: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (categories) => categories.length > 0,
        message: 'At least one category is required',
      },
      enum: ['Technology', 'Business', 'Entertainment', 'Health', 'Science'],
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model('Post', postSchema);
