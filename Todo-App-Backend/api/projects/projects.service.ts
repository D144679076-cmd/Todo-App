import { Prisma } from "@prisma/client";
import $prisma from "../../database/init";
export const getProjects = async (query: Prisma.projectsWhereInput) => {
  try {
    const projects = await $prisma.projects.findMany({
      where: query,
    });
    return projects;
  } catch (error) {
    throw new Error(`Failed to get projects: ${error}`);
  }
};
export const createManyProjects = async (
  data: Prisma.projectsCreateManyInput[]
) => {
  try {
    const projects = await $prisma.projects.createMany({
      data: data,
    });
    return projects;
  } catch (error) {
    throw new Error(`Failed to create projects: ${error}`);
  }
};
export const updateProjects = async (
  query: Prisma.projectsWhereUniqueInput,
  data: Prisma.projectsUpdateInput
) => {
  try {
    const project = await $prisma.projects.update({
      where: query,
      data: data,
    });
    return project;
  } catch (error) {
    throw new Error(`Failed to update project: ${error}`);
  }
};

export const deleteProjects = async (
  query: Prisma.projectsWhereUniqueInput
) => {
  try {
    const project = await $prisma.projects.deleteMany({
      where: query,
    });
    return project;
  } catch (error) {
    throw new Error(`Failed to delete project: ${error}`);
  }
};
