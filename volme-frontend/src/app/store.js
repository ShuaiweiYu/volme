import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    // 这个属性指定了Redux存储的根Reducer。在这里，使用了apiSlice.reducerPath作为键来指定Reducer的路径，对应的值是apiSlice.reducer，即之前定义的API的Reducer。
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // getDefaultMiddleware是一个函数，用于获取默认的Redux中间件
    middleware: getDefaultMiddleware =>
        // 使用concat方法将之前定义的API中间件apiSlice.middleware添加到默认中间件的数组中。
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})