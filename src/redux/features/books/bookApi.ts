import { baseApi } from "../../api/baseApi";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: "/books",
                method: "GET",
            }),
        }),
        addBook: builder.mutation({
            query: (data) => ({
                url: "/books",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const { useGetBooksQuery,useAddBookMutation } = bookApi;
