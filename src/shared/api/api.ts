import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `/api`,
    prepareHeaders: async (headers, { getState }) => {
        return headers;
    },
});

const baseQueryWithReauth:BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    
    // if (result.error && result.error.originalStatus === 401) {      
    //   return result;
    // }
  return result
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Meals'],
  endpoints: (builder) => ({}),
});