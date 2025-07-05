import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ["book"]
        }),
        createTask: builder.mutation({
            query: (taskData) => ({
                url: '/tasks',
                method: "POST",
                body: taskData
            }),
            invalidatesTags: ["book"]
        })
    })
})

export const { useGetBooksQuery, useCreateTaskMutation } = baseApi