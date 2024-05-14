import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // 这里，配置对象指定了baseUrl为http://localhost:3500，表示所有API请求的基础URL是http://localhost:3500。
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    // 这个属性定义了API使用的标签类型。在这个例子中，标签类型是Note和User。标签类型可以用于定义缓存策略和其他行为。
    tagTypes: ['User'],
    // 这个属性定义了API的端点。在这个例子中，没有定义具体的端点，因此传入一个空对象。端点是API暴露给应用程序使用的不同资源或操作的方法。可以通过builder参数来定义端点。                                                                                      
    endpoints: builder => ({})
})