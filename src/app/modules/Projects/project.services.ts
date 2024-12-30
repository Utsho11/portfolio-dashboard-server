import { Request } from "express";
import { TProject } from "./project.interface";
import Project from "./project.model";
import AppError from "../../errors/AppError";

export type IFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

const createProjectIntoDB = async (req: Request) => {
  const payload: TProject = req.body;

  const file = req.file as IFile | undefined;

  payload.image = file?.path;

  const result = await Project.create(payload);

  return result;
};

const updateProjectIntoDB = async (req: Request) => {
  const payload = req.body;
  const id = payload.key;
  const file = req.file as IFile | undefined;
  if (file) {
    payload.image = file?.path;
  }

  const isProductExists = await Project.findById(id);

  if (!isProductExists) {
    throw new AppError(404, "Project not found by id: " + id);
  }

  const project = await Project.findByIdAndUpdate(id, payload, { new: true });

  return project;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find();

  return result;
};

const getProjectByIdFromDB = async (req: Request) => {
  const { id } = req.params;
  const result = await Project.findById(id);

  if (!result) {
    throw new AppError(404, "Project not found by id: " + id);
  }

  return result;
};

const deleteProjectFromDB = async (req: Request) => {
  const { id } = req.params;
  const result = await Project.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, "Project not found by id: " + id);
  }

  return "Project deleted";
};

export const ProjectServices = {
  createProjectIntoDB,
  updateProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  deleteProjectFromDB,
};
