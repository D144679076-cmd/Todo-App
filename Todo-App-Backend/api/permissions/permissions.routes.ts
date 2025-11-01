import express from "express";
import {
  useCreatePermission,
  useDeletePermission,
  useDeletePermissions,
  useGetPermissionById,
  useGetPermissionsByQuery,
  useUpdatePermission,
  useUpdatePermissions,
} from "./permissions.controller";
const permissionsRouter = express.Router();
permissionsRouter
  .route("/:id")
  .get((req, res) => {
    useGetPermissionById(req, res);
  })
  .delete((req, res) => {
    useDeletePermission(req, res);
  })
  .put((req, res) => {
    useUpdatePermission(req, res);
  })
  .patch((req, res) => {
    useUpdatePermission(req, res);
  });
permissionsRouter
  .route("/")
  .get((req, res) => {
    useGetPermissionsByQuery(req, res);
  })
  .post((req, res) => {
    useCreatePermission(req, res);
  })
  .put((req, res) => {
    useUpdatePermissions(req, res);
  })
  .delete((req, res) => {
    useDeletePermissions(req, res);
  })
  .patch((req, res) => {
    useUpdatePermissions(req, res);
  });
export default permissionsRouter;
