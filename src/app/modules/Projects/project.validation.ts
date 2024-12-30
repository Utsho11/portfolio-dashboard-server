import { z } from "zod";

const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    github: z.string().min(1, "Github is required"),
    liveLink: z.string().min(1, "Live Link is required"),
    technologies: z
      .array(z.string())
      .min(1, "At least one technology is required"),
    createdAt: z.date().optional(),
  }),
});
const updateProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .optional(),
    description: z
      .string()
      .min(1, "Description is required")
      .optional(),
    image: z
      .string()
      .url("Image must be a valid URL")
      .optional(),
    technologies: z
      .array(z.string())
      .min(1, "At least one technology is required")
      .optional(),
    createdAt: z.date().optional(),
  }),
});

export const ProjectValidation = {
  createProjectSchema,
  updateProjectSchema,
};
