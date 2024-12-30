import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
  const Blog = await BlogServices.createBlogIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Blog created successfully",
    data: Blog,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await BlogServices.updateBlogIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog updated successfully",
    data: blog,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const Blogs = await BlogServices.getAllBlogsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blogs are retrieved successfully",
    data: Blogs,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const Blog = await BlogServices.getBlogByIdFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog is retrieved successfully",
    data: Blog,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const Blog = await BlogServices.deleteBlogFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Blog is deleted successfully",
    data: Blog,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
