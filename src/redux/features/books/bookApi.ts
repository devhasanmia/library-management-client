import { baseApi } from "../../api/baseApi";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: "/books",
                method: "GET",
            }),
            providesTags: ["Book"]
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: "/books",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["borrow", "Book"]
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Book", "borrow"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["borrow", "Book"]
        }),
    }),
});

export const { useGetBooksQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation } = bookApi;
