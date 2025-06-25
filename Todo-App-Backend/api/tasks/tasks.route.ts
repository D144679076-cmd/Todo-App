import express from "express";
import {
  useCreateTask,
  useDeleteTaskByID,
  useDeleteTasks,
  useGetTasks,
  useGetTasksByID,
  useUpdateTaskByID,
  useUpdateTasks,
} from "./tasks.controller";
const tasksRouter = express.Router();

tasksRouter
  .route("/:id")
  .get((req, res) => {
    useGetTasksByID(req, res);
  })
  .put((req, res) => {
    useUpdateTaskByID(req, res);
  })
  .delete((req, res) => {
    useDeleteTaskByID(req, res);
  })
  .patch((req, res) => {
    useUpdateTaskByID(req, res);
  });
tasksRouter
  .route("/")
  .get((req, res) => {
    useGetTasks(req, res);
  })
  .post((req, res) => {
    useCreateTask(req, res);
  })
  .put((req, res) => {
    useUpdateTasks(req, res);
  })
  .delete((req, res) => {
    useDeleteTasks(req, res);
  })
  .patch((req, res) => {
    useUpdateTasks(req, res);
  });
export default tasksRouter;
