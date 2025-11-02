import {
  createRoles,
  deleteRole,
  deleteRoles,
  getRole,
  getRoles,
  updateRole,
  updateRoles,
} from "./roles.service";
import type { queryObject } from "../libs/reqBody.type";
import type { Request, Response } from "express";
export const useGetRoleByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await getRole(id);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }
  return res.json(role);
};

export const useGetRoleByQuery = async (req: Request, res: Response) => {
  const query = req.query as queryObject;
  const roles = await getRoles(query);
  if (!roles) {
    return res.status(404).json({ message: "Roles not found" });
  }
  return res.json(roles);
};

export const useUpdateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const role = await updateRole(id, data);
  if (!role) {
    return res.status(400).json({ message: "Error updating role" });
  }
  return res.json(role);
};

export const useDeleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const role = await deleteRole(id);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }
  return res.status(204).send();
};

export const useDeleteRoles = async (req: Request, res: Response) => {
  const query = req.query as queryObject;
  const roles = await deleteRoles(query);
  if (!roles) {
    return res.status(404).json({ message: "Roles not found" });
  }
  return res.status(204).send();
};

export const useUpdateRoles = async (req: Request, res: Response) => {
  const query = req.query as queryObject;
  const data = req.body;
  const roles = await updateRoles(query, data);
  if (!roles) {
    return res.status(404).json({ message: "Roles not found" });
  }
  return res.json(roles);
};

export const useCreateRoles = async (req: Request, res: Response) => {
  const data = req.body;
  const roles = await createRoles(data);
  if (!roles) {
    return res.status(400).json({ message: "Error creating roles" });
  }
  return res.status(201).json(roles);
};
