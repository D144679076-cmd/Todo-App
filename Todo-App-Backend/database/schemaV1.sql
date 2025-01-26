-- Create a new database called 'DatabaseName'
CREATE DATABASE postgres 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role uuid NOT NULL,
    static_token varchar(1000),
    CONSTRAINT fk_role FOREIGN KEY(role) REFERENCES roles(id)
)
CREATE SEQUENCE permissions_id_seq
CREATE TABLE permissions(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('permissions_id_seq'),
    "table" varchar(255) NOT NULL,
    "role" uuid NOT NULL,
    "create" boolean NOT NULL,
    "read" boolean NOT NULL,
    "update" boolean NOT NULL,
    "delete" boolean NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY("role") REFERENCES roles(id)
)
CREATE SEQUENCE sessions_id_seq
CREATE TABLE "sessions"(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('sessions_id_seq'),
    user_id uuid NOT NULL,
    access_tokens varchar(1000) NOT NULL,
    refresh_tokens varchar(1000) NOT NULL,
    expires timestamp NOT NULL,
    ip varchar(255) NOT NULL,
    origin varchar(255) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
)
CREATE TABLE "roles"(
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name varchar(255) NOT NULL
)