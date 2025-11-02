import express from "express";
import {
  useCreateUser,
  useDeleteUser,
  useGetUser,
  useGetUsers,
  useUpdateUser,
  useUpdateUsers,
} from "./user.controller.ts";

const userRouter = express.Router();

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
