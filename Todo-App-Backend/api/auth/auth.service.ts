import CryptoJS from "crypto-js";
import { createDecoder, createSigner } from "fast-jwt";
import $prisma from "../../database/init.ts";

// Type definition for permissions
type PermissionObjects = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// Create a session in the database
export const sessionCreate = async (
  userID: string,
  ip: string,
  origin: string,
  accessToken: string,
  refreshToken: string
) => {
  try {
    const tokenLifeTime = Number(process.env.TOKEN_LIFE_TIME) || 60; // Default to 60 minutes if not set
    const newSession = await $prisma.sessions.create({
      data: {
        user_id: userID,
        access_tokens: accessToken,
        refresh_tokens: refreshToken,
        expires: new Date(Date.now() + tokenLifeTime * 60 * 1000),
        ip: ip,
        origin: origin,
      },
    });
    return newSession;
  } catch (err: any) {
    console.error("Error creating session:", err);
    return null;
  }
};

// Encrypt a password
export const passwordEncrypt = (password: string) => {
  const hash = CryptoJS.AES.encrypt(password, "login key").toString();
  return hash;
};

// Decrypt a password
export const passwordDecrypt = (passwordInDB: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(passwordInDB, "login key");
  return decryptedPassword.toString(CryptoJS.enc.Utf8);
};

// Compare a password with the stored encrypted password
export const passwordCompare = (passwordInDB: string, password: string) => {
  const decryptedPassword = CryptoJS.AES.decrypt(passwordInDB, "login key");
  return decryptedPassword.toString(CryptoJS.enc.Utf8) === password;
};

// Generate an access token
export const tokenGenerator = (permissionObject: {
  user: string;
  permission: PermissionObjects[];
  expiresTime?: number;
}) => {
  const generator = createSigner({ key: "access_token", algorithm: "HS256" });
  const token = generator(permissionObject);
  return token;
};

// Decode a token
export const tokenDecode = (token: string) => {
  const decoder = createDecoder();
  const decoded = decoder(token);
  return decoded;
};

// Generate a refresh token
export const refreshTokenGenerator = async (refreshObject: {
  user: string;
  expiresTime?: number;
}) => {
  const generator = createSigner({ key: "refresh_token", algorithm: "HS256" });
  const token = generator(refreshObject);
  return token;
};
