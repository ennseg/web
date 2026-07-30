import {createSlice} from '@reduxjs/toolkit';

const initialState = { R: 1, X: 0, Y: 0, success: null };

export const paramSlice = createSlice({
    name: 'params',
    initialState,
    reducers: {
        setR: (state, action) => { state.R = action.payload },
        setX: (state, action) => { state.X = action.payload },
        setY: (state, action) => { state.Y = action.payload },
        setSuccess: (state, action) => { state.success = action.payload }    }
});

export const {setR, setX, setY, setSuccess} = paramSlice.actions;
export default paramSlice.reducer;
