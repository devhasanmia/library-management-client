import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-api-lilac.vercel.app/api' }),
    tagTypes: ["Book", "borrow"],
    endpoints: () => ({})
})

export const { } = baseApi