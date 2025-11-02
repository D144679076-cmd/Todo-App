import $prisma from "../../database/init.ts";
import type {Request, Response} from "express";
import {
    passwordEncrypt,
    passwordDecrypt,
    tokenGenerator,
    refreshTokenGenerator,
    sessionCreate,
} from "./auth.service.ts";
import type {
    AuthBody,
    registeBody,
    logoutBody,
} from "../libs/reqBody.type.ts";
import {getUser} from "../user/user.service.ts";
import {env} from "node:process";

export const loginByEmail = async (req: Request, res: Response) => {
    await $prisma.$connect();
    const authRequest: AuthBody = req.body as AuthBody;
    console.log("authRequest:", authRequest);
    if (!authRequest || !authRequest.email || !authRequest.password) {
        return res.status(400).json({
            error: "Invalid request",
            message: "Vui loại đăng ký tài khoảng và mật khách hãng",
            code: 400,
        });
    }
    const userInDb = await getUser(authRequest.email)
    console.log("userInDb:", userInDb);
    if (!userInDb || userInDb.length === 0) {
        return res.status(404).json({
            error: "User not found",
            message: "Tài khoản không tồn tại, vui lòng đăng ký tài khoảng",
            code: 404,
        });
    }
    if (passwordDecrypt(userInDb[0].password) === authRequest.password) {
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
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            expiresTime: Number(env.TOKEN_LIFE_TIME!) * 60 * 1000,
        });
        const refreshToken = await refreshTokenGenerator({
            user: userInDb[0].id,
            // biome-ignore lint/style/noNonNullAssertion: <explanation>
            expiresTime: Number(env.REFRESH_LIFE_TIME!) * 60 * 1000,
        });
        const newSession = await sessionCreate(
            userInDb[0].id,
            req.headers.host ?? "localhost",
            req.headers.origin ?? "localhost",
            token,
            refreshToken
        );
        return res.status(200).json({
            user_id: userInDb[0].id,
            token: token,
            refreshToken: refreshToken,
            lifeTime: Number(env.TOKEN_LIFE_TIME) * 60 * 1000,
        });
    }
    return res.status(403).json({
        error: "Wrong password",
        message: "Mật khẩu nhập sai, vui lý kiểm tra lại",
        code: 403,
    });
};
export const registerByEmail = async (req: Request, res: Response) => {
    try {
        await $prisma.$connect();
        const registeBody: registeBody = req.body as registeBody;
        console.log("registeBody:", registeBody);
        if (!registeBody || !registeBody.email || !registeBody.password) {
            return res.status(400).json({
                error: "Invalid request",
                message: "Vui lòng  đăng điền email và mật khẩu",
                code: 400,
            });
        }
        if (!registeBody.email.includes("@")) {
            return res.status(400).json({
                error: "Invalid request",
                message: "Vui lòng điền email",
                code: 400,
            });
        }
        if (registeBody.password.length < 6) {
            return res.status(400).json({
                error: "Invalid request",
                message: "Mật không đủ 6 kí tự",
                code: 400,
            });
        }
        const passwordInDB = passwordEncrypt(registeBody.password);
        const role = await $prisma.roles.findMany({
            where: {
                name: "NORMAL_USER",
            },
            select: {
                name: true,
                id: true,
            },
        });
        const userID = await $prisma.users.create({
            data: {
                email: registeBody.email,
                password: passwordInDB,
                name: registeBody.fullName,
                role: role[0]?.id ?? "",
            },
        });
        return res.status(200).json({
            user_id: userID.id,
            message: "Success",
        });
    } catch (err) {
        console.log("node: auth.service.ts:line 131 : error: ", err);
        return res.status(500).json({
            error: "Internal server error",
            message: "Lỗi khi tạo tài khoản",
            code: 500,
        });
    }
};

export const logoutByEmail = async (req: Request, res: Response) => {
    await $prisma.$connect();
    const logoutBody: logoutBody = req.body as logoutBody;
    const user = await getUser(logoutBody.email);
    if (!user || user.length === 0) {
        return res.status(401).json({
            error: "User not found",
            message: "Tài khoản không tồn tại, vui này đăng ký tài khoảng",
            code: 401,
        });
    }
    await $prisma.sessions.deleteMany({
        where: {
            user_id: user[0].id,
        },
    });
    return res.status(200).json({
        message: "Logout success",
    });
};
export const refreshLogin = async (req: Request, res: Response) => {
};

export const changePasswordByEmail = async (req: Request, res: Response) => {
};

export const resetPasswordByEmail = async (req: Request, res: Response) => {
};
