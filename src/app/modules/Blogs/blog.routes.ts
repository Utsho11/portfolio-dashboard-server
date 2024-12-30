import express from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import { BlogValidations } from "./blog.validation";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controllers";
const router = express.Router();

router.post(
  "/create-blog",
  auth("ADMIN"),
  fileUploader.single("file"),
  parseBody,
  validateRequest(BlogValidations.createBlogSchema),
  BlogControllers.createBlog
);

router.patch(
  "/update-blog",
  auth("ADMIN"),
  fileUploader.single("file"),
  parseBody,
  BlogControllers.updateBlog
);

router.get("/get-all-blogs", BlogControllers.getAllBlogs);

router.get("/get-blog/:id", BlogControllers.getSingleBlog);

router.delete("/delete-blog/:id", auth("ADMIN"), BlogControllers.deleteBlog);

export const BlogRoutes = router;
