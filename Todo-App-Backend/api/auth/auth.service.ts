import $prisma from "../../database/init.js";
import CryptoJS from "crypto-js";
import { createDecoder, createSigner } from "fast-jwt";
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
      },
    });
    return user;
  } catch (err: any) {
    console.log("node: auth.service.ts:line 18 : error: ", err);
    return null;
  }
};
export const sessionCreate = async (
  userID: string,
  ip: string,
  origin: string
) => {
  try {
    const newSession = await $prisma.sessions.create({
      data: {
        user_id: userID,
        access_tokens: "",
        refresh_tokens: "",
        expires: "",
        ip: ip,
        origin: origin,
      },
    });
  } catch (err: any) {
    console.log("node: auth.service.ts:line 27 : error: ", err);
    return null;
  }
};
export const passwordEncrypt = (password: string) => {
  const hash = CryptoJS.AES.encrypt(password, "login key").toString();
  return hash;
};
export const passwordCompare = (passwordInDB: string, password: string) => {
  const pasrePassword = CryptoJS.AES.decrypt(passwordInDB, "login key");
  if (pasrePassword.toString(CryptoJS.enc.Utf8) === password) {
    return true;
  } else {
    return false;
  }
};
export const tokenGenerator = async (permissionObject: permissionObjects) => {
  const generator = createSigner({ key: "access_token", algorithm: "HS256" });
  const token = generator(permissionObject);
  return token;
};
export const tokenDecode = (token: string) => {
  const decoder = createDecoder();
  const decoded = decoder(token);
  return decoded;
};
