import { OptionsParams, QueryParams, QueryResponse } from "./lib/type";

export const useQuery = (
  _query: QueryParams,
  _route: string,
  _options?: OptionsParams,
  _data?: () => any[] | Promise<any[]>
): QueryResponse<> => {
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
