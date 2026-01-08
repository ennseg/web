import React from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import {setY} from '../store/point_slice';

export function InputText({ min, max, name }) {
    const dispatch = useDispatch();
    const value = useSelector(state => state.params.Y);

    const handleChange = (e) => {
        dispatch(setY(e.target.value));
    };

    return (
        <div style={{
            width: 600,
            height: 50
        }}>
            <TextField
                label={name}
                type="number"
                value={value}
                onChange={handleChange}
                inputProps={{ min, max }}
                sx={{ width: 500 }}
            />
        </div>
    );
}
