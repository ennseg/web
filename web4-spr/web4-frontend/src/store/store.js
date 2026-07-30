import {configureStore} from '@reduxjs/toolkit';
import paramReducer from './point_slice';
import tableReducer from './table_slice';

export const store = configureStore({
    reducer: {
        params: paramReducer,
        table: tableReducer
    }
});