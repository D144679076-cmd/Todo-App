import $api from "@/plugins/axios" ;
import {Projects, Tasks} from "@/composables/lib/respone";
import {AxiosResponse} from "axios";
import {useQuery} from "@tanstack/vue-query";
import {QueryParams} from "@/composables/lib/type";

const useAPI = () => {
    const queryTasks = (query?: QueryParams<Tasks>): Promise<AxiosResponse<Tasks, any>> => {
        return $api.get<Tasks>('/taks', {
            params: query,
        })
    }
    const queryProjects = (query?: QueryParams<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.get<Projects>('/projects', {
            params: query,
        })
    }
    const querySchedules = (query?: QueryParams<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.get<Projects>('/schedules', {
            params: query,
        })
    }
    const createTask = (data: Partial<Tasks>): Promise<AxiosResponse<Tasks>> => {
        return $api.post<Tasks>('/tasks', data)
    }
    const createProject = (data: Partial<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.post<Projects>('/projects', data)
    }
    const createSchedule = (data: Partial<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.post<Projects>('/schedules', data)
    }
    const updateTask = (id: number, data: Partial<Tasks>): Promise<AxiosResponse<Tasks>> => {
        return $api.put<Tasks>(`/tasks/${id}`, data)
    }
    const updateProject = (id: number, data: Partial<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.put<Projects>(`/projects/${id}`, data)
    }
    const updateSchedule = (id: number, data: Partial<Projects>): Promise<AxiosResponse<Projects>> => {
        return $api.put<Projects>(`/schedules/${id}`, data)
    }
    const queryTaskById = (id: number) => {
        return $api.get<Tasks>(`/tasks/${id}`)
    }
    const queryProjectById = (id: number) => {
        return $api.get<Projects>(`/projects/${id}`)
    }
    const queryScheduleById = (id: number) => {
        return $api.get<Projects>(`/schedules/${id}`)
    }
    const deleteTask = (id: number) => {
        return $api.delete<Tasks>(`/tasks/${id}`)
    }
    const deleteProject = (id: number) => {
        return $api.delete<Projects>(`/projects/${id}`)
    }
    const deleteSchedule = (id: number) => {
        return $api.delete<Projects>(`/schedules/${id}`)
    }
    return {
        queryTasks,
        queryProjects,
        querySchedules,
        createTask,
        createProject,
        createSchedule,
        updateTask,
        updateProject,
        updateSchedule,
        queryTaskById,
        queryProjectById,
        queryScheduleById,
        deleteTask,
        deleteProject,
        deleteSchedule,
    }
}
export default useAPI