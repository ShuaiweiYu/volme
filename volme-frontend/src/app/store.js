import { configureStore } from '@reduxjs/toolkit';
import exampleCounterReducer from "../features/exampleSlice";

const store = configureStore({
    reducer: {
        exampleCounter: exampleCounterReducer // 这里的 `exampleCounter` 是 app 的 key，你也可以改变这个名字
    }
});

export default store;