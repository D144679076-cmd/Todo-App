import app from "../../index.js";
import type { Request, Response } from "express";
import { loginByEmail } from "./auth.controller.js";
app.route("/auth").post(async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});
app.route("/user/register").post(async (req: Request, res: Response) => {});
