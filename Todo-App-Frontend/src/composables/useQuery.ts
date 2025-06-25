import $api from "@/plugins/axios";
import type {
  Permission,
  TaskComment,
  Tasks,
  Project,
  ProjectUser,
  Role,
  Schedule,
  Session,
  User,
} from "./lib/respone";
import { OptionsParams, QueryParams, QueryResponse } from "./lib/type";

export const useQuery = (
  _query: QueryParams,
  _route: string,
  _options?: OptionsParams,
  _data?: () => any[] | Promise<any[]>
): QueryResponse<
  | Tasks
  | Permission
  | TaskComment
  | Project
  | ProjectUser
  | Role
  | Schedule
  | Session
  | User
> => {
  const _preData = $api.get(_route, {
    params: _query,
  });
  return {
    data: [],
    isError: false,
    isLoading: true,
    error: null,
    refetch: async () => {
      // Logic to refetch data based on the query and route
      return [];
    },
  };
};
