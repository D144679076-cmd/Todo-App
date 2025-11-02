-- Create a new database called 'DatabaseName'
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "roles"
(
    id   uuid         NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS "users"
(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role uuid NOT NULL,
    static_token varchar(1000),
    CONSTRAINT fk_role FOREIGN KEY(role) REFERENCES roles(id),
    avatarLinks varchar(1000)
);
CREATE SEQUENCE permissions_id_seq;
CREATE TABLE permissions
(
    id       integer      NOT NULL PRIMARY KEY DEFAULT nextval('permissions_id_seq'),
    "table"  varchar(255) NOT NULL,
    "role"   uuid         NOT NULL,
    "create" boolean      NOT NULL,
    "read"   boolean      NOT NULL,
    "update" boolean      NOT NULL,
    "delete" boolean      NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY ("role") REFERENCES roles (id)
);
CREATE SEQUENCE sessions_id_seq;
CREATE TABLE "sessions"
(
    id             integer       NOT NULL PRIMARY KEY DEFAULT nextval('sessions_id_seq'),
    user_id        uuid          NOT NULL,
    access_tokens  varchar(1000) NOT NULL,
    refresh_tokens varchar(1000) NOT NULL,
    expires        timestamp     NOT NULL,
    ip             varchar(255)  NOT NULL,
    origin         varchar(255)  NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE SEQUENCE projects_id_seq;
CREATE TABLE IF NOT EXISTS "projects"(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('projects_id_seq'),
    "name" varchar(255) NOT NULL,
    "description" text,
    "status" varchar(50) NOT NULL,
    "start_date" timestamp NOT NULL,
    end_date timestamp,
    user_id uuid NOT NULL,
    current_progress integer NOT NULL DEFAULT 0,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
CREATE SEQUENCE projects_users_id_seq;
CREATE TABLE IF NOT EXISTS "projects_users"
(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('projects_users_id_seq'),
    project_id integer NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE SEQUENCE tasks_id_seq;
CREATE TABLE IF NOT EXISTS "tasks"
(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('tasks_id_seq'),
    title varchar(255) NOT NULL,
    project_id integer NOT NULL,
    "description" text,
    "status" varchar(50) NOT NULL,
    "priority" varchar(50) NOT NULL,
    deadline timestamp,
    user_id uuid NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id)
);
CREATE SEQUENCE task_comments_id_seq;
CREATE TABLE IF NOT EXISTS "task_comments"
(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('task_comments_id_seq'),
    task_id integer NOT NULL,
    user_id uuid NOT NULL,
    comment text NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_task FOREIGN KEY(task_id) REFERENCES tasks(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
    );
CREATE SEQUENCE schedules_id_seq;
CREATE TABLE IF NOT EXISTS "schedules"
(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('schedules_id_seq'),
    user_id uuid NOT NULL,
    title varchar(255) NOT NULL,
    "description" text,
    "date" timestamp NOT NULL,
    "time" timestamp NOT NULL,
    type varchar(50) NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);