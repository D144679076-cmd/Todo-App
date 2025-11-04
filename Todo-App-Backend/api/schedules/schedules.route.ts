import express from "express";
import {
    useCreateSchedules,
    useDeleteSchedule, useDeleteSchedulesByQuery,
    useGetSchedule,
    useGetSchedulesByQuery,
    useUpdateSchedule, useUpdateSchedulesByQuery
} from "./schedules.controller.ts";

const schedulesRouter = express.Router();

schedulesRouter.route("/:id")
    .get(async (req, res) => {
        await useGetSchedule(req, res)
    })
    .delete(async (req, res) => {
        await useDeleteSchedule(req, res)
    })
    .patch(async (req, res) => {
        await useUpdateSchedule(req, res)
    })

schedulesRouter.route("/")
    .get(async (req, res) => {
        await useGetSchedulesByQuery(req, res)
    })
    .post(async (req, res) => {
        await useCreateSchedules(req, res)
    })
    .patch(async (req, res) => {
        await useUpdateSchedulesByQuery(req, res)
    })
    .delete(async (req, res) => {
        await useDeleteSchedulesByQuery(req, res)
    })

export default schedulesRouter;