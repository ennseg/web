import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    rows: []
};

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableRows: (state, action) => { state.rows = action.payload },
        addTableRow: (state, action) => { state.rows.unshift(action.payload) }
    }
});

export const {setTableRows, addTableRow} = tableSlice.actions;
export default tableSlice.reducer;