import type { registeBody } from "../libs/reqBody.type.d.ts";
import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
  updateUsers,
} from "./user.service.ts";

export const useGetUser = async (req: Request, res: Response) => {
  const userID = req.params.id;
  const userInfor = await getUser("", userID);
  if (userInfor) {
    return res.status(200).json(userInfor);
  }
  return res.status(404).json({
    error: "User not found",
    code: 404,
  });
};
export const useGetUsers = async (req: Request, res: Response) => {
  const userInfor = await getUsers();
  if (userInfor && userInfor.length > 0) {
    return res.status(200).json(userInfor);
  }
  return res.status(404).json({
    error: "Users not found",
    code: 404,
  });
};
export const useDeleteUser = async (req: Request, res: Response) => {
  const userID = req.params.id;
  const userInfor = await deleteUser(userID);
  if (userInfor) {
    return res.status(200).json({
      message: "Delete user success",
    });
  }
  return res.status(404).json({
    error: "User not found",
    code: 404,
  });
};
export const useUpdateUser = async (req: Request, res: Response) => {
  const userID = req.params.id;
  const userInfor = await updateUser(userID, req.body);
  if (userInfor) {
    return res.status(200).json({
      message: "Update user success",
    });
  }
  return res.status(404).json({
    error: "Update user failed",
    code: 404,
  });
};

export const useCreateUser = async (req: Request, res: Response) => {
  const registeBody: registeBody = req.body as registeBody;
  const userInfor = await createUser(registeBody);
  if (userInfor) {
    return res.status(200).json({
      message: "Create user success",
    });
  }
  return res.status(404).json({
    error: "Create user failed",
    code: 404,
  });
};

export const useUpdateUsers = async (req: Request, res: Response) => {
  const userID = req.body.id as string[];
  const userInfor = await updateUsers(req.body, userID);
  if (userInfor) {
    return res.status(200).json({
      message: "Update user success",
    });
  }
  return res.status(404).json({
    error: "Update user failed",
    code: 404,
  });
};
export const useDeleteUsers = async (req: Request, res: Response) => {
  const userID = req.body.id as string[];
  const userInfor = await deleteUsers(userID);
  if (userInfor) {
    return res.status(200).json({
      message: "Delete user success",
    });
  }
  return res.status(404).json({
    error: "Delete user failed",
    code: 404,
  });
};
