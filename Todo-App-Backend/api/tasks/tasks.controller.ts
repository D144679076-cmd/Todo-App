import { Request, Response } from "express";
import type { queryObject } from "../libs/reqBody.type.d.ts";
import {
  getTasksbyID,
  getTasks,
  createTask,
  updateTaskByID,
  deleteTaskByID,
  updateTasks,
  deleteTasks,
} from "./tasks.service.ts";
export const useGetTasksByID = (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = getTasksbyID(id);
  res.status(200).json({ tasks });
};
export const useCreateTask = (req: Request, res: Response) => {
  const body = req.body;
  // Assuming a createTask function exists in tasks.service.ts
  const task = createTask(body);
  res.status(201).json({ task });
};
export const useUpdateTaskByID = (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  // Assuming an updateTask function exists in tasks.service.ts
  const updatedTask = updateTaskByID(id, body);
  res.status(200).json({ updatedTask });
};
export const useDeleteTaskByID = (req: Request, res: Response) => {
  const { id } = req.params;
  // Assuming a deleteTask function exists in tasks.service.ts
  const deletedTask = deleteTaskByID(id);
  res.status(200).json({ deletedTask });
};
export const useGetTasks = (req: Request, res: Response) => {
  const query: queryObject = req.query as queryObject;
  const tasks = getTasks(query);
  res.status(200).json({ tasks });
};
export const useUpdateTasks = (req: Request, res: Response) => {
  const queryObject = req.query as queryObject;
  const body = req.body;
  const updatedTasks = updateTasks(queryObject, body);
  res.status(200).json({ updatedTasks });
};
export const useDeleteTasks = (req: Request, res: Response) => {
  const queryObject = req.query as queryObject;
  const deletedTasks = deleteTasks(queryObject);
  res.status(200).json({ deletedTasks });
};
