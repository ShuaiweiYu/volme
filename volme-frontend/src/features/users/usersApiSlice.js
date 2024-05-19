import {createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                // 在方法中，首先判断了 result?.ids 是否存在。这个 ids 字段通常表示返回的数据中包含了哪些实体的 ID。
                if (result?.ids) {
                    // 如果存在 ids 字段，则说明请求成功并且返回了一组数据。此时，会生成一个包含了所有实体的缓存标签数组。每个标签对象的类型为 User，ID 为实体的 ID。
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                // 如果不存在 ids 字段，则说明请求失败或者返回的数据为空。此时，会生成一个仅包含一个标签对象的数组，该标签对象的类型为 User，ID 为 LIST。
                } else return [{type: 'User', id: 'LIST'}]
            }
        }),
        getUserByEmailAddress: builder.query({
            query: (emailAddress) => `/users/${emailAddress}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            providesTags: (result, error, emailAddress) => [{ type: 'User', id: emailAddress }]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByEmailAddressQuery
} = usersApiSlice