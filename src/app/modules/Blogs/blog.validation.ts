import { z } from "zod";

const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    author: z.string(),
    createdAt: z.date().optional(),
  }),
});

const updateBlogSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .optional(),
    description: z
      .string()
      .min(1, "Description is required")
      .optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    createdAt: z.date().optional(),
  }),
});

export const BlogValidations = {
  createBlogSchema,
  updateBlogSchema,
};
