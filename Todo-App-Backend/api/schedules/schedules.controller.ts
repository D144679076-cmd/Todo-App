import {Request, Response} from 'express';
import {createManySchedules, deleteSchedules, getSchedules, updateSchedules} from "./schedules.service.ts";

export const useGetSchedule = async (req: Request, res: Response) => {
    const id = req.params.id;
    const project = await getSchedules({id: Number.parseInt(id)});
    if (project) {
        res.status(200).json(project);
    } else {
        res.status(404).json({message: 'Schedule not found'});
    }
};

export const useGetSchedulesByQuery = async (req: Request, res: Response) => {
    const query = req.query;
    const schedules = await getSchedules(query);
    if (!schedules) {
        return res.status(404).json({message: 'No schedules found'});
    } else {
        res.status(200).json(schedules);
    }
}

export const useCreateSchedules = async (req: Request, res: Response) => {
    const data = req.body;
    const schedules = await createManySchedules(data);
    if (!schedules) {
        return res.status(500).json({message: 'Failed to create schedules'});
    } else {
        res.status(201).json(schedules);
    }
}

export const useUpdateSchedule = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const schedule = await updateSchedules({id: Number.parseInt(id)}, data);
    if (!schedule) {
        return res.status(500).json({message: 'Failed to update schedule'});
    } else {
        res.status(200).json(schedule);
    }
}

export const useUpdateSchedulesByQuery = async (req: Request, res: Response) => {
    const query = req.query;
    const data = req.body;
    const schedules = await updateSchedules(query, data);
    if (!schedules) {
        return res.status(500).json({message: 'Failed to update schedules'});
    } else {
        res.status(200).json(schedules);
    }
}

export const useDeleteSchedulesByQuery = async (req: Request, res: Response) => {
    const query = req.query;
    const schedules = await deleteSchedules(query);
    if (!schedules) {
        return res.status(500).json({message: 'Failed to delete schedules'});
    } else {
        res.status(200).json(schedules);
    }
    res.status(501).json({message: 'Delete schedules by query not implemented yet'});
}

export const useDeleteSchedule = async (req: Request, res: Response) => {
    const id = req.params.id;
    const schedule = await deleteSchedules({id: Number.parseInt(id)});
    if (!schedule) {
        return res.status(500).json({message: 'Failed to delete schedule'});
    } else {
        res.status(200).json(schedule);
    }
    res.status(501).json({message: 'Delete schedule not implemented yet'});
}