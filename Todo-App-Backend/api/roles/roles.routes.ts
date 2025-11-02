import express from "express";
import {
  useGetRoleByID,
  useUpdateRole,
  useDeleteRole,
  useGetRoleByQuery,
  useUpdateRoles,
  useDeleteRoles,
  useCreateRoles,
} from "./roles.controller";
const rolesRouter = express.Router();
rolesRouter
  .route("/:id")
  .get((req, res) => {
    useGetRoleByID(req, res);
  })
  .put((req, res) => {
    useUpdateRole(req, res);
  })
  .delete((req, res) => {
    useDeleteRole(req, res);
  })
  .patch((req, res) => {
    useUpdateRole(req, res);
  });
rolesRouter
  .route("/")
  .get((req, res) => {
    useGetRoleByQuery(req, res);
  })
  .post((req, res) => {
    useCreateRoles(req, res);
  })
  .put((req, res) => {
    useUpdateRoles(req, res);
  })
  .delete((req, res) => {
    useDeleteRoles(req, res);
  })
  .patch((req, res) => {
    useUpdateRoles(req, res);
  });
export default rolesRouter;
