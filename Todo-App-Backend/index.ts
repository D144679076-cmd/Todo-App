import express from "express";
import {configDotenv} from "dotenv";
import {env} from "node:process";
import userRouter from "./api/user/user.routes.ts";
import authRouter from "./api/auth/auth.routes.ts";
import $prisma from "./database/init.ts";
import bodyParser from "body-parser";
import cors from "cors";
import tasksRouter from "./api/tasks/tasks.route.ts";
import rolesRouter from "./api/roles/roles.routes.ts";
import permissionsRouter from "./api/permissions/permissions.routes.ts";
import projectsRouter from "./api/projects/projects.routes.ts";
import schedulesRouter from "./api/schedules/schedules.route.ts";

configDotenv({path: "./.env"});

const app = express();
const origin = env.ORIGIN ?? "http://localhost:5173";
console.log('origin: ', origin);
const whitelist = origin.split(",");
const corsOptions = {
    origin: whitelist,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: "*",
    exposedHeaders: "*",
    maxAge: 3600,
    preflightContinue: false,
} as cors.CorsOptions;
app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.raw());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use('/roles', rolesRouter);
app.use("/permissions", permissionsRouter);
app.use("/projects", projectsRouter)
app.use("schedules", schedulesRouter)
const initApp = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.listen(env.API_PORT ?? 8055, async () => {
        await $prisma.$connect();
        console.log("Database connected");
        console.log(`Server started on port ${env.API_PORT ?? 8055}`);
    });
};

initApp();
