import express from "express";
import {
  useCreateManyProjects,
  useDeleteProject,
  useDeleteProjectsByQuery,
  useGetProjectByID,
  useGetProjectsByQuery,
  useUpdateProject,
  useUpdateProjectsByQuery,
} from "./projects.controller.ts";

const projectsRouter = express.Router();

projectsRouter
  .route("/")
  .get((req, res) => {
    useGetProjectsByQuery(req, res);
  })
  .post((req, res) => {
    useCreateManyProjects(req, res);
  })
  .patch((req, res) => {
    useUpdateProjectsByQuery(req, res);
  })
  .delete((req, res) => {
    useDeleteProjectsByQuery(req, res);
  });

projectsRouter
  .route("/:id")
  .get((req, res) => {
    useGetProjectByID(req, res);
  })
  .patch((req, res) => {
    useUpdateProject(req, res);
  })
  .delete((req, res) => {
    useDeleteProject(req, res);
  });

export default projectsRouter;