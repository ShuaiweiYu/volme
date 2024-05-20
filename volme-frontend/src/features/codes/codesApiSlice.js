import {createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

const codesAdapter = createEntityAdapter({})
const initialState = codesAdapter.getInitialState()

export const codesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCodeById: builder.query({
            query: (id) => `/codes/${id}`,
            transformResponse: responseData => {
                const code = responseData
                code.id = code._id
                return codesAdapter.upsertOne(initialState, code)
            },
            providesTags: (result, error, id) => [{type: 'Code', id: id}]
        }),
        addNewCode: builder.mutation({
            query: (newCode) => ({
                url: '/codes',
                method: 'POST',
                body: newCode
            }),
            invalidatesTags: [{ type: 'Code', id: 'LIST' }]
        }),
        checkCodeValidity: builder.query({
            query: ({ id, emailAddress, inputValue }) => ({
                url: `/codes/check/${id}`,
                method: 'POST',
                body: { emailAddress, inputValue }
            })
        }),
    })
})

export const {
    useGetCodeByIdQuery,
    useAddNewCodeMutation,
    useCheckCodeValidityQuery
} = codesApiSlice