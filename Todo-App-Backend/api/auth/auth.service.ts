import { CallTracker } from "assert";
import $prisma from "../../database/init.js";
import { AuthBody } from "../libs/reqBody.type.js";
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
export const sessionCreate = async (userID: string) => {
  try {
    const newSession = await $prisma.sessions.create({
      data: {
        user_id: userID,
        access_tokens: "",
        refresh_tokens: "",
        expires: "",
        ip: "",
        origin: "",
      },
    });
  } catch (err: any) {
    console.log("node: auth.service.ts:line 27 : error: ", err);
    return null;
  }
};
