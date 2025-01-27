import express from "express";
import type { Request, Response } from "express";
import { loginByEmail, registerByEmail } from "./user.controller.js";
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});
router.post("/auth", async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});
router.post("/register", async (req: Request, res: Response) => {
  console.log("register");
  await registerByEmail(req, res);
});
export default router;
