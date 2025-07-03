import { baseApi } from "../../api/baseApi";

export const borrowApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBorrow: builder.query({
            query: () => ({
                url: "/borrow",
                method: "GET",
            }),
            providesTags: ["Book"]
        }),
        addBorrow: builder.mutation({
            query: (data) => ({
                url: "/borrow",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["borrow", "Book"]
        })
    }),
});

export const { useAddBorrowMutation } = borrowApi;
