import $prisma from "../../database/init.js";
import { configDotenv } from "dotenv";
import type { Prisma } from "@prisma/client";
configDotenv({ path: "../../.env" });
type permissionObjects = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};
export const getUser = async (email?: string, id?: string) => {
  try {
    const user = await $prisma.users.findMany({
      where: {
        ...(email && { email: email }),
        ...(id && { id: id }),
      },
      select: {
        id: true,
        password: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return user;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 18 : error: ", err);
    return null;
  }
};
export const createUser = async (data: Partial<Prisma.usersCreateInput>) => {
  try {
    const user = await $prisma.users.create({
      data: data as any,
    });
    return user;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const updateUser = async (
  id: string,
  data: Partial<Prisma.usersUpdateInput>
) => {
  try {
    const user = await $prisma.users.update({
      where: {
        id: id,
      },
      data: data,
    });
    return user;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deleteUser = async (id: string) => {
  try {
    const user = await $prisma.users.delete({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const getUsers = async () => {
  try {
    const users = await $prisma.users.findMany({
      select: {
        id: true,
        password: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return users;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const updateUsers = async (
  data: Prisma.usersUpdateInput,
  id: string[]
) => {
  try {
    const users = await $prisma.users.updateMany({
      where: {
        id: {
          in: id,
        },
      },
      data: data,
    });
    return users;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deleteUsers = async (id: string[]) => {
  try {
    const users = await $prisma.users.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    return users;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
