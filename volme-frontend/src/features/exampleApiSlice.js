import {apiSlice} from "../app/api/apiSlice";

export const exampleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: () => '/users',
            providesTags: ['User'],
        }),
        invalidatesTags: ['User'],
    })
})

export const {useGetAllUsersQuery } = exampleApiSlice