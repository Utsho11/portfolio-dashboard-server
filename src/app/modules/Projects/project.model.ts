import mongoose, { Schema } from "mongoose";
import { TProject } from "./project.interface";

// Create the Mongoose schema
const ProjectSchema: Schema = new Schema<TProject>(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    liveLink: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      required: true,
      validate: [
        (arr: string[]) => arr.length > 0,
        "Technologies cannot be empty",
      ],
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Create and export the Mongoose model
const Project = mongoose.model<TProject>("Project", ProjectSchema);

export default Project;
