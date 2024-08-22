import { AuthBody } from "../libs/reqBody.type.js";
import type { Request, Response } from "express";
import {
  getUser,
  passwordDecrypt,
  refreshTokenGenerator,
  sessionCreate,
  tokenGenerator,
} from "./auth.service.js";
import { error } from "console";
import $prisma from "../../database/init.js";
import { env } from "process";

export const loginByEmail = async (req: Request, res: Response) => {
  const authRequest: AuthBody = req.body as AuthBody;
  console.log("authRequest:", authRequest);
  if (!authRequest || !authRequest.email || !authRequest.password) {
    res.status(400).json({
      error: "Invalid request",
      message: "Vui loại đăng ký tài khoảng và mật khách hãng",
      code: 400,
    });
  }
  const userInDb = await getUser(authRequest.email);
  if (!userInDb || userInDb.length === 0) {
    res.status(401).json({
      error: "User not found",
      message: "Tài khoản không tồn tại, vui lòng đăng ký tài khoảng",
      code: 401,
    });
  } else if (passwordDecrypt(userInDb[0].password) === authRequest.password) {
    console.log("login in process:", userInDb[0].email);
    const permissionObjects = await $prisma.permissions.findMany({
      where: {
        role: userInDb[0].role,
      },
      select: {
        create: true,
        read: true,
        update: true,
        delete: true,
      },
    });
    console.log("permissionObjects:", permissionObjects);
    const token = tokenGenerator({
      user: userInDb[0].id,
      permission: permissionObjects,
      expiresTime: Number(env.TOKEN_LIFE_TIME!) * 60 * 1000,
    });
    const refreshToken = await refreshTokenGenerator({
      user: userInDb[0].id,
      expiresTime: Number(env.REFRESH_LIFE_TIME!) * 60 * 1000,
    });
    const newSession = await sessionCreate(
      userInDb[0].id,
      req.headers.host ?? "localhost",
      req.headers.origin ?? "localhost",
      token,
      refreshToken
    );
    res.status(200).json({
      user_id: userInDb[0].id,
      token: token,
      refreshToken: refreshToken,
      lifeTime: Number(env.TOKEN_LIFE_TIME) * 60 * 1000,
    });
  } else {
    res.status(403).json({
      error: "Wrong password",
      message: "Mật khẩu nhập sai, vui lý kiểm tra lại",
      code: 403,
    });
  }
};
