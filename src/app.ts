import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import router from "./app/routes";

const app: Application = express();

//cors
const corsOptions = {
  origin: [
    "https://portfolio-dashboard-ebon-kappa.vercel.app",
    "https://utshoroy.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Portfolio server is running..",
  });
});

app.use("/api", router);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the PlateShare API",
  });
});

export default app;
