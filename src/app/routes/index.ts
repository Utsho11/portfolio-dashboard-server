import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { BlogRoutes } from "../modules/Blogs/blog.routes";
import { ProjectRoutes } from "../modules/Projects/project.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
