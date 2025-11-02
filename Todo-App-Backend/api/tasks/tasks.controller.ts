import { Request, Response } from "express";
import type { queryObject } from "../libs/reqBody.type.d.ts";
import {
  createTask,
  deleteTaskByID,
  deleteTasks,
  getTasks,
  getTasksbyID,
  updateTaskByID,
  updateTasks,
} from "./tasks.service.ts";

export const useGetTasksByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = await getTasksbyID(id);
  res.status(200).json({ tasks });
};
export const useCreateTask = async (req: Request, res: Response) => {
  const body = req.body;
  // Assuming a createTask function exists in tasks.service.ts
  const task = await createTask(body);
  res.status(201).json({ task });
};
export const useUpdateTaskByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  // Assuming an updateTask function exists in tasks.service.ts
  const updatedTask = await updateTaskByID(id, body);
  res.status(200).json({ updatedTask });
};
export const useDeleteTaskByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Assuming a deleteTask function exists in tasks.service.ts
  const deletedTask = await deleteTaskByID(id);
  res.status(200).json({ deletedTask });
};
export const useGetTasks = async (req: Request, res: Response) => {
  const query: queryObject = req.query as queryObject;
  const tasks = await getTasks(query);
  res.status(200).json({ tasks });
};
export const useUpdateTasks = async (req: Request, res: Response) => {
  const queryObject = req.query as queryObject;
  const body = req.body;
  const updatedTasks = await updateTasks(queryObject, body);
  res.status(200).json({ updatedTasks });
};
export const useDeleteTasks = async (req: Request, res: Response) => {
  const queryObject = req.query as queryObject;
  const deletedTasks = await deleteTasks(queryObject);
  res.status(200).json({ deletedTasks });
};
