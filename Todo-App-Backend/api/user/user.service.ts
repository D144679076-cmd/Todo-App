import $prisma from "../../database/init.js";
import CryptoJS from "crypto-js";
import { createDecoder, createSigner } from "fast-jwt";
import { configDotenv } from "dotenv";
import { env } from "node:process";
import { Prisma } from "@prisma/client";
configDotenv({ path: "../../.env" });
type permissionObjects = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};
export const getUser = async (email: string) => {
  try {
    const user = await $prisma.users.findMany({
      where: {
        email: email,
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
      data: data,
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
export const sessionCreate = async (
  userID: string,
  ip: string,
  origin: string,
  accessToken: string,
  refreshToken: string
) => {
  try {
    const newSession = await $prisma.sessions.create({
      data: {
        user_id: userID,
        access_tokens: accessToken,
        refresh_tokens: refreshToken,
        expires: new Date(Date.now() + Number(env.TOKEN_LIFE_TIME) * 60 * 1000),
        ip: ip,
        origin: origin,
      },
    });
    return newSession;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 27 : error: ", err);
    return null;
  }
};
export const passwordEncrypt = (password: string) => {
  const hash = CryptoJS.AES.encrypt(password, "login key").toString();
  return hash;
};
export const passwordDecrypt = (passwordInDB: string) => {
  const pasrePassword = CryptoJS.AES.decrypt(passwordInDB, "login key");
  return pasrePassword.toString(CryptoJS.enc.Utf8);
};
export const passwordCompare = (passwordInDB: string, password: string) => {
  const pasrePassword = CryptoJS.AES.decrypt(passwordInDB, "login key");
  if (pasrePassword.toString(CryptoJS.enc.Utf8) === password) {
    return true;
  }
  return false;
};
export const tokenGenerator = (permissionObject: {
  user: string;
  permission: permissionObjects[];
  expiresTime?: number;
}) => {
  const generator = createSigner({ key: "access_token", algorithm: "HS256" });
  const token = generator(permissionObject);
  return token;
};
export const tokenDecode = (token: string) => {
  const decoder = createDecoder();
  const decoded = decoder(token);
  return decoded;
};
export const refreshTokenGenerator = async (refreshObject: {
  user: string;
  expiresTime?: number;
}) => {
  const generator = createSigner({ key: "refresh_token", algorithm: "HS256" });
  const token = generator(refreshObject);
  return token;
};
