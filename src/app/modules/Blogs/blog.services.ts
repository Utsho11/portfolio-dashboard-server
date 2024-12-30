import { Request } from "express";
import AppError from "../../errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";

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

const createBlogIntoDB = async (req: Request) => {
  const payload: TBlog = req.body;

  const file = req.file as IFile | undefined;

  console.log(file);

  payload.image = file?.path;

  const result = await Blog.create(payload);

  return result;
};

const updateBlogIntoDB = async (req: Request) => {
  // const { id } = req.params;
  const payload = req.body;
  const b_id = payload.key;
  const file = req.file as IFile | undefined;
  if (file) {
    payload.image = file?.path;
  }

  const isProductExists = await Blog.findById(b_id);

  if (!isProductExists) {
    throw new AppError(404, "Blog not found by id: " + b_id);
  }

  const blog = await Blog.findByIdAndUpdate(b_id, payload, { new: true });

  return blog;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();

  return result;
};

const getBlogByIdFromDB = async (req: Request) => {
  const { id } = req.params;
  const result = await Blog.findById(id);

  if (!result) {
    throw new AppError(404, "Blog not found by id: " + id);
  }

  return result;
};

const deleteBlogFromDB = async (req: Request) => {
  const { id } = req.params;
  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, "Blog not found by id: " + id);
  }

  return "Blog deleted";
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
};
