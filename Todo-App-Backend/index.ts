import express from "express";
import { configDotenv } from "dotenv";
import { env } from "node:process";
import userRouter from "./api/user/user.routes.js";
import $prisma from "./database/init.js";
import bodyParser from "body-parser";
configDotenv({ path: "./.env" });

const app = express();

const initApp = () => {
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello World",
    });
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/user", userRouter);
  app.listen(env.API_PORT ?? 8055, async () => {
    await $prisma.$connect();
    console.log("Database connected");
    console.log(`Server started on port ${env.API_PORT ?? 8055}`);
  });
};

initApp();
