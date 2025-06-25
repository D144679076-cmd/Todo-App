export type AuthBody = {
  email: string;
  password: string;
};
export type registeBody = {
  email: string;
  password: string;
  fullName: string;
};
export type logoutBody = {
  email: string;
};
export type queryObject = {
  [key: string]: string | number | boolean | undefined;
};
