import app from "../../index.js";
import type { Request, Response } from "express";
import {
  passwordCompare,
  passwordEncrypt,
  sessionCreate,
} from "./auth.service.js";
app.route("/auth").post((req: Request, res: Response) => {});
