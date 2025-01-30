import type { Prisma } from "@prisma/client";
import $prisma from "../../database/init";
export const getPermissions = async () => {
  try {
    const permissions = await $prisma.permissions.findMany();
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
        id: id,
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
        id: id,
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
        id: id,
      },
    });
    return permission;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
export const deletePermissions = async (id: string[]) => {
  try {
    const permissions = await $prisma.permissions.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    return permissions;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 34 : error: ", err);
    return null;
  }
};
