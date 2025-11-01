import type { Prisma } from "@prisma/client";
import $prisma from "../../database/init";
import { queryObject } from "../libs/reqBody.type";
export const getPermissions = async (query: Prisma.permissionsWhereInput) => {
  try {
    const permissions = await $prisma.permissions.findMany({
      where: query,
    });
    return permissions;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const getPermission = async (id: string) => {
  try {
    const permission = await $prisma.permissions.findMany({
      where: {
        id: parseInt(id),
      },
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const createPermission = async (data: Prisma.permissionsCreateInput) => {
  try {
    const permission = await $prisma.permissions.create({
      data: data,
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const updatePermission = async (
  id: string,
  data: Prisma.permissionsUpdateInput
) => {
  try {
    const permission = await $prisma.permissions.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deletePermission = async (id: string) => {
  try {
    const permission = await $prisma.permissions.delete({
      where: {
        id: parseInt(id),
      },
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deletePermissions = async (
  query: Prisma.permissionsWhereInput
) => {
  try {
    const permissions = await $prisma.permissions.deleteMany({
      where: query,
    });
    return permissions;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const updatePermissions = async (
  query: Prisma.permissionsWhereUniqueInput,
  data: Prisma.permissionsUpdateInput
) => {
  try {
    const permission = await $prisma.permissions.update({
      where: query,
      data: data,
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
