import { Request, Response } from "express";
import {
  createManyProjects,
  deleteProjects,
  getProjects,
  updateProjects,
} from "./projects.service";
import { Prisma } from "@prisma/client";
export const useGetProjectByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await getProjects({ id: parseInt(id) });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json(project);
};

export const useGetProjectsByQuery = async (req: Request, res: Response) => {
  const query = req.query;
  const projects = await getProjects(query);
  if (!projects) {
    return res.status(404).json({ message: "Projects not found" });
  }
  return res.json(projects);
};

export const useCreateManyProjects = async (req: Request, res: Response) => {
  const data = req.body as Prisma.projectsCreateManyInput[];
  const projects = await createManyProjects(data);
  if (!projects) {
    return res.status(400).json({ message: "Error creating projects" });
  }
  return res.status(201).json(projects);
};

export const useUpdateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as Prisma.projectsUpdateInput;
  const project = await updateProjects({ id: parseInt(id) }, data);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json(project);
};

export const useUpdateProjectsByQuery = async (req: Request, res: Response) => {
  const query = req.query as any as Prisma.projectsWhereUniqueInput;
  const data = req.body as Prisma.projectsUpdateInput;
  const project = await updateProjects(query, data);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json(project);
};

export const useDeleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await deleteProjects({ id: parseInt(id) });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.status(204).send();
};

export const useDeleteProjectsByQuery = async (req: Request, res: Response) => {
  const query = req.query as any as Prisma.projectsWhereUniqueInput;
  const project = await deleteProjects(query);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.status(204).send();
};
