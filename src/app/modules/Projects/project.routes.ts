import express from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectValidation } from "./project.validation";
import { ProjectControllers } from "./project.controllers";
const router = express.Router();

router.post(
  "/create-project",
  auth("ADMIN"),
  fileUploader.single("file"),
  parseBody,
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectControllers.createProject
);

router.patch(
  "/update-project",
  auth("ADMIN"),
  fileUploader.single("file"),
  parseBody,
  ProjectControllers.updateProject
);

router.get("/get-all-projects", ProjectControllers.getAllProjects);

router.get("/get-project/:id", ProjectControllers.getSingleProject);

router.delete(
  "/delete-project/:id",
  auth("ADMIN"),
  ProjectControllers.deleteProject
);

export const ProjectRoutes = router;
