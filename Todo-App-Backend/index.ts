import express from "express";
import { configDotenv } from "dotenv";
import { env } from "node:process";
configDotenv({ path: "./.env" });
const app = express();
app.listen(env.PUBLIC_PORT ?? 8055, () => {
  console.log(`Server started on port ${env.PUBLIC_PORT ?? 8055}`);
});
export default app;
