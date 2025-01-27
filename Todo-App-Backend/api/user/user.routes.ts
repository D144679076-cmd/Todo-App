import express from "express";
import type { Request, Response } from "express";
import { loginByEmail, registerByEmail } from "./user.controller.js";
const userRouter = express.Router();
userRouter.route("/").get(async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});
userRouter.route("/auth").post(async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});
userRouter.route("/register").post(async (req: Request, res: Response) => {
  console.log("register");
  await registerByEmail(req, res);
});
export default userRouter;
