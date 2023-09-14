import { api } from "../api";
import { IGetMeals } from "./model";
import {IApiResponse} from '../model';

export const mealsApi = api.injectEndpoints({
    endpoints: builder => ({
        addMeal: builder.mutation({
            query: payload => ({
                url: `/meals/add-meal`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ['Meals']
        }),
        updateMeal: builder.mutation({
            query: payload => ({
                url: `/meals/add-meal`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ['Meals']
        }),
        getMeals: builder.query<IApiResponse<IGetMeals[]>, null>({
            query: () => `/meals/get-meals`,
            providesTags: (result) => {
                return result?.data ? ['Meals'] : ['Meals']
            }
        }),
        getMealsGraph: builder.query({
            query: () => `/meals/get-meals-graph`,
            providesTags: (result) => {
                return result.data ? ['Meals'] : ['Meals']
            }
        }),
        getInfoMealUser: builder.query({
            query: () => `/meals/get-info-meal-user`,
            providesTags: (result) => {
                return result.data ? ['Meals'] : ['Meals']
            }
        }),
    }),
    overrideExisting: true,
});