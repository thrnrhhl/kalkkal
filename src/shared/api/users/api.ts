import { api } from "../api";

export const usersApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: payload => ({
                url: `/users/login`,
                method: "POST",
                body: payload,
            }),
        }),
        getMe: builder.query({
            query: () => `/users/me`
        })
    }),
    overrideExisting: true,
});