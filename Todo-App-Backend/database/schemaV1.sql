-- Create a new database called 'DatabaseName'
CREATE DATABASE postgres 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id uuid PRIMARY KEY uuid_generate_v4(),
    name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    static_token varchar(1000)
)
CREATE SEQUENCE roles_id_seq
CREATE TABLE roles(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('roles_id_seq'),
    table varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    create boolean NOT NULL,
    read boolean NOT NULL,
    update boolean NOT NULL,
    delete boolean NOT NULL
)
CREATE SEQUENCE sessions_id_seq
CREATE TABLE "sessions"(
    id integer NOT NULL PRIMARY KEY DEAFAULT nextval('sessions_id_seq'),
    user_id uuid NOT NULL,
    access_tokens varchar(1000) NOT NULL
    refresh_tokens varchar(1000) NOT NULL
    expires timestamp NOT NULL
    ip varchar(255) NOT NULL
    origin varchar(255) NOT NULL
)