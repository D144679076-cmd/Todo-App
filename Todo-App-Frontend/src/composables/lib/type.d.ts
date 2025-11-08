export type AuthData = {
    token: string;
    refreshToken: string;
    user_id: string;
    userEmail?: string; // Add userEmail field
    lifetime: number;
};
export type QueryParams<T> = Partial<T>;