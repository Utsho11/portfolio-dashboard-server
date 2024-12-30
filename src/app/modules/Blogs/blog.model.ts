import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const BlogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

export const Blog = model<TBlog>("blogs", BlogSchema);
