import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://a3-book-library-management.vercel.app/api" }),
    tagTypes: ["book", "borrow"],  /// tagTypes handle the cache data.
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: ({page, limit}) => `/books?page=${page}&limit=${limit}`,
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
            invalidatesTags: ["book", "borrow"]
        }),
            getBorrow: builder.query({
            query: () => "/borrow",
            providesTags: ["borrow"]
        }),
    })
})

export const { useGetBooksQuery, useGetSingleBookQuery, useCreateBookMutation, useDeleteSingleBookMutation, useUpdateBookMutation, useCreateBorrowMutation, useGetBorrowQuery } = baseApi