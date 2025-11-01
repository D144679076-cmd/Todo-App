import { queryObject } from "../libs/reqBody.type";
import {
  createPermission,
  deletePermission,
  deletePermissions,
  getPermission,
  getPermissions,
  updatePermission,
  updatePermissions,
} from "./permissions.service";
import type { Request, Response } from "express";
export const useGetPermissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const permission = await getPermission(id);
  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }
  return res.json(permission);
};
export const useGetPermissionsByQuery = async (req: Request, res: Response) => {
  const query = req.query as queryObject;
  const permissions = await getPermissions(query);
  if (!permissions) {
    return res.status(404).json({ message: "Permissions not found" });
  }
  return res.json(permissions);
};

export const useCreatePermission = async (req: Request, res: Response) => {
  const data = req.body;
  const permission = await createPermission(data);
  if (!permission) {
    return res.status(400).json({ message: "Error creating permission" });
  }
  return res.status(201).json(permission);
};

export const useUpdatePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const permission = await updatePermission(id, data);
  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }
  return res.json(permission);
};

export const useDeletePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const permission = await deletePermission(id);
  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }
  return res.json(permission);
};

export const useUpdatePermissions = async (req: Request, res: Response) => {
  const query = req.query as any;
  const data = req.body;
  const permissions = await updatePermissions(query, data);
  if (!permissions) {
    return res.status(404).json({ message: "Permissions not found" });
  }
  return res.json(permissions);
};

export const useDeletePermissions = async (req: Request, res: Response) => {
  const query = req.query as queryObject;
  const permissions = await deletePermissions(query);
  if (!permissions) {
    return res.status(404).json({ message: "Permissions not found" });
  }
  return res.status(204).send();
};
