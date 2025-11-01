import { query } from "express";
import $prisma from "../../database/init.ts";
import type { queryObject } from "../libs/reqBody.type.d.ts";
export const getTasksbyID = async (id: string) => {
  try {
    const tasks = await $prisma.tasks.findFirst({
      where: {
        id: Number.parseInt(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        updated_at: true,
        deadline: true,
        priority: true,
        status: true,
        user_id: true,
        task_comments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
            updated_at: true,
            user_id: true,
            task_id: true,
          },
        },
        project_id: true,
      },
    });
    return tasks;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
export const updateTaskByID = async (id: string, data: any) => {
  try {
    const task = await $prisma.tasks.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: data.status,
        user_id: data.user_id,
        project_id: data.project_id,
      },
    });
    return task;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
export const deleteTaskByID = async (id: string) => {
  try {
    const task = await $prisma.tasks.delete({
      where: {
        id: Number.parseInt(id),
      },
    });
    return task;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
export const getTasks = async (query: queryObject) => {
  try {
    const tasks = await $prisma.tasks.findMany({
      where: query,
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        updated_at: true,
        deadline: true,
        priority: true,
        status: true,
        user_id: true,
        task_comments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
            updated_at: true,
            user_id: true,
            task_id: true,
          },
        },
        project_id: true,
      },
    });
    return tasks;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
export const createTask = async (data: any) => {
  try {
    const task = await $prisma.tasks.create({
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: data.status,
        user_id: data.user_id,
        project_id: data.project_id,
      },
    });
    return task;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};

export const updateTasks = async (query: queryObject, data: any) => {
  try {
    const tasks = await $prisma.tasks.updateMany({
      where: query,
      data: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: data.status,
        user_id: data.user_id,
        project_id: data.project_id,
      },
    });
    return tasks;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
export const deleteTasks = async (query: queryObject) => {
  try {
    const tasks = await $prisma.tasks.deleteMany({
      where: query,
    });
    return tasks;
  } catch (err: any) {
    console.log("node: tasks.service.ts:line 10 : error: ", err);
    return null;
  }
};
