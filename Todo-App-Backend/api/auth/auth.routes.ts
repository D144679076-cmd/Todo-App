import express, { Request, Response } from "express";
import {
  loginByEmail,
  registerByEmail,
  logoutByEmail,
} from "./auth.controller.js";

const authRouter = express.Router();

authRouter.route("/login").post(async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});

authRouter.route("/register").post(async (req: Request, res: Response) => {
  console.log("req", req);
  await registerByEmail(req, res);
});

authRouter.route("/logout").post(async (req: Request, res: Response) => {
  await logoutByEmail(req, res);
});

authRouter.post("/password-reset", (req: Request, res: Response) => {
  // Add your password reset logic here
  res
    .status(200)
    .json({ message: "Password reset endpoint not implemented yet" });
});

export default authRouter;
