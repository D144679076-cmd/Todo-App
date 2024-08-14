import { AuthBody } from "../libs/reqBody.type.js";
import type { Request, Response } from "express";
import { getUser } from "./auth.service.js";
import { error } from "console";

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
  } else if (userInDb[0].password === authRequest.password) {
    console.log("login success:", userInDb[0].email);
    res.status(200).json();
  } else {
    res.status(403).json({
      error: "Wrong password",
      message: "Mật khẩu nhập sai, vui lý kiểm tra lại",
      code: 403,
    });
  }
};
