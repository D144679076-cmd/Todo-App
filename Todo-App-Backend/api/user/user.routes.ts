import express from "express";
import type { Request, Response } from "express";
import { loginByEmail, registerByEmail } from "./user.controller.js";
const userRouter = express.Router();
userRouter.route("/auth").post(async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});
userRouter.route("/register").post(async (req, res) => {
  console.log(req.body);
  await registerByEmail(req, res);
});
export default userRouter;
