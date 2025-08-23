export type QueryParams = {
  [key: string]: number | string | boolean;
};
export type OptionsParams = {
  [key: string]: number | string | boolean;
};
export type QueryResponse<T> = {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<T[]>;
  error: any;
};
export type AuthData = {
  token: string;
  refreshToken: string;
  user_id: string;
  userEmail?: string; // Add userEmail field
  lifetime: number;
};
