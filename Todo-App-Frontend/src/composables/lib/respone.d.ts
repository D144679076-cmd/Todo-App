export type Permission = {
    id: number;
    table: string;
    role: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    // roles?: Role; // Uncomment if you want nested relation
};

export type Roles = {
    id: string;
    name: string;
    permissions?: Permission[];
    users?: User[];
};

export type Session = {
    id: number;
    user_id: string;
    access_tokens: string;
    refresh_tokens: string;
    expires: Date;
    ip: string;
    origin: string;
    // users?: User;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    static_token?: string | null;
    projects_users?: ProjectUser[];
    schedules?: Schedule[];
    sessions?: Session[];
    task_comments?: TaskComment[];
    tasks?: Tasks[];
    // roles?: Role;
};

export type Projects = {
    id: number;
    name: string;
    description?: string | null;
    status: string;
    start_date: Date;
    end_date?: Date | null;
    user_id: string;
    current_progress: number;
    created_at: Date;
    updated_at: Date;
    projects_users?: ProjectUser[];
    tasks?: Tasks[];
};

export type ProjectUser = {
    id: number;
    project_id: number;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    projects?: Projects;
    users?: User;
};

export type Schedule = {
    id: number;
    user_id: string;
    title: string;
    description?: string | null;
    date: Date;
    time: Date;
    created_at: Date;
    updated_at: Date;
    type: string;
    // users?: User;
};

export type TaskComment = {
    id: number;
    task_id: number;
    user_id: string;
    comment: string;
    created_at: Date;
    updated_at: Date;
    // tasks?: Task;
    // users?: User;
};

export type Tasks = {
    id: number;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    deadline?: Date | null;
    user_id: string;
    project_id: number;
    created_at: Date;
    updated_at: Date;
    task_comments?: TaskComment[];
    // projects?: Project;
    // users?: User;
};
