import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";

// 用于处理用户数据的规范化和 CRUD 操作。
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
            // 在 providesTags 方法中，主要是为了提供缓存标签（cache tags），用于管理缓存数据的过期和更新。
            // 这个方法在每次查询请求完成后都会被调用，它的作用是根据请求的结果来生成相应的缓存标签数组。
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
        getUserByUsername: builder.query({
            query: (username) => `/users/${username}`,
            providesTags: (result, error, username) => {
                // 如果请求成功且返回了有效的结果
                if (result) {
                    // 返回一个包含特定用户名的缓存标签数组
                    return [{ type: 'User', id: username }];
                } else {
                    // 如果请求失败或者返回的结果为空，则返回一个空的缓存标签数组
                    return [];
                }
            }
        })
    })
})

// useGetUsersQuery 是通过 apiSlice.injectEndpoints 创建的 API Slice 中的一个 hook。它的作用是在组件中方便地发起获取用户数据的请求。
export const {
    useGetUsersQuery,
    useGetUserByUsernameQuery
} = usersApiSlice

// 这段代码是在定义一个名为 selectUsersResult 的 selector，用于选择用户数据查询的结果对象。
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// createSelector 是 Redux Toolkit 提供的一个函数，用于创建 memoized selector。
// Memoized selector 是一种在输入不变时返回缓存值的 selector，可以提高性能，避免不必要的重复计算。
const selectUsersData = createSelector(
    selectUsersResult,
    // usersResult => usersResult.data 是一个回调函数，它接收 selectUsersResult 返回的结果对象作为参数，并从中选择出 data 字段。
    // 这个 data 字段通常包含了规范化的用户数据，即通过 ID 和实体对象组成的数据结构。
    usersResult => usersResult.data // normalized state object with ids & entities
)

// usersAdapter.getSelectors() 是从用户适配器 (usersAdapter) 中获取一组预定义的选择器，这些选择器用于选择用户数据的不同部分。
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)

//todo: reading -> https://www.redux.org.cn/tutorials/essentials/part-7-rtk-query-basics.html