import express from "express";
import { AuthControllers } from "./auth.controllers";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/login", AuthControllers.loginUser);
router.get("/get-me", auth("ADMIN"), AuthControllers.getMe);
router.post("/refresh-token", auth("ADMIN"), AuthControllers.refreshToken);

export const AuthRoutes = router;
