import type {Prisma} from "@prisma/client";
import $prisma from "../../database/init";

export const getSchedules = async (query: Prisma.schedulesWhereInput) => {
    try {
        const schedules = await $prisma.schedules.findMany({
            where: query,
        });
        return schedules;
    } catch (error) {
        throw new Error(`Failed to get schedules: ${error}`);
    }
}

export const createManySchedules = async (data: Prisma.schedulesCreateManyInput) => {
    try {
        const schedules = await $prisma.schedules.createMany({
            data: data,
        });
        return schedules;
    } catch (error) {
        throw new Error(`Failed to create schedules: ${error}`);
    }
}

export const updateSchedules = async (query: Prisma.schedulesWhereInput, data: Prisma.schedulesUpdateInput) => {
    try {
        const schedule = await $prisma.schedules.updateMany({
            where: query,
            data: data,
        });
        return schedule;
    } catch (error) {
        throw new Error(`Failed to update schedule: ${error}`);
    }
}

export const deleteSchedules = async (query: Prisma.schedulesWhereInput) => {
    try {
        const schedule = await $prisma.schedules.deleteMany({
            where: query,
        });
        return schedule;
    } catch (error) {
        throw new Error(`Failed to delete schedule: ${error}`);
    }
}
