import { query } from "express";
import $prisma from "../../database/init";
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
export const getRole = async (id: string) => {
  try {
    const role = await $prisma.roles.findMany({
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

export const deleteRoles = async (query: Prisma.rolesWhereInput) => {
  try {
    const roles = await $prisma.roles.deleteMany({
      where: query,
    });
    return roles;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};

export const updateRoles = async (
  query: Prisma.rolesWhereInput,
  data: Prisma.rolesUpdateInput
) => {
  try {
    const roles = await $prisma.roles.updateMany({
      where: query,
      data: data,
    });
    return roles;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};

export const createRoles = async (data: Prisma.rolesCreateManyInput[]) => {
  try {
    const roles = await $prisma.roles.createMany({
      data: data,
    });
    return roles;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
