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
        getSingleBook: builder.query({
          query: (id) => `/books/${id}`,
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: builder.mutation({
            query: ({id, ...bookData}) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: bookData
            }),
            invalidatesTags: ["book"]
        }),
        deleteSingleBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["book"]
        }),
        createBorrow: builder.mutation({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
        }),
    })
})

export const { useGetBooksQuery, useGetSingleBookQuery, useCreateBookMutation, useDeleteSingleBookMutation, useUpdateBookMutation, useCreateBorrowMutation } = baseApi