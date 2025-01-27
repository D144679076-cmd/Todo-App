import type { QueryOptions } from "@prisma/client/runtime/library";
import $prisma from "../../database/init.js";
import type { Prisma } from "@prisma/client";
export const getRoles = async (queryObject: Prisma.rolesSelect) => {
  try {
    const roles = await $prisma.roles.findMany({
      where: {
        name: {
          not: "NORMAL_USER",
        },
      },
      select: { ...queryObject },
    });
    return roles;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const createRole = async (data: Prisma.rolesCreateInput) => {
  try {
    const role = await $prisma.roles.create({
      data: data,
    });
    return role;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const updateRole = async (id: string, data: Prisma.rolesUpdateInput) => {
  try {
    const role = await $prisma.roles.update({
      where: {
        id: id,
      },
      data: data,
    });
    return role;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deleteRole = async (id: string) => {
  try {
    const role = await $prisma.roles.delete({
      where: {
        id: id,
      },
    });
    return role;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
