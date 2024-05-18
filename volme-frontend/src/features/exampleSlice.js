import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    count: 0,
};

const exampleCounterSlice = createSlice({
    name: 'exampleCounter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
    },
});

export const { increment, decrement } = exampleCounterSlice.actions;
export default exampleCounterSlice.reducer;
