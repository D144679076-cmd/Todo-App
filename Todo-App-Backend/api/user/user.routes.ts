import express from "express";
import type { Request, Response } from "express";
import {
  loginByEmail,
  registerByEmail,
  useCreateUser,
  useDeleteUser,
  useGetUser,
  useGetUsers,
  useUpdateUser,
  useUpdateUsers,
} from "./user.controller.js";
const userRouter = express.Router();
userRouter.route("/auth").post(async (req: Request, res: Response) => {
  await loginByEmail(req, res);
});
userRouter.route("/register").post(async (req, res) => {
  console.log(req.body);
  await registerByEmail(req, res);
});
userRouter
  .route("/:id")
  .get(async (req, res) => {
    await useGetUser(req, res);
  })
  .patch(async (req, res) => {
    await useUpdateUser(req, res);
  })
  .delete(async (req, res) => {
    await useDeleteUser(req, res);
  });
userRouter
  .route("/")
  .get(async (req, res) => {
    await useGetUsers(req, res);
  })
  .post(async (req, res) => {
    await useCreateUser(req, res);
  })
  .patch(async (req, res) => {
    await useUpdateUsers(req, res);
  })
  .delete(async (req, res) => {
    await useDeleteUser(req, res);
  });

export default userRouter;
