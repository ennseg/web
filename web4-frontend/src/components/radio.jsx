import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {setR, setX} from '../store/point_slice';

export function RadioButton({data, name}) {
    const value = useSelector(state => state.params[name]);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const actionMap = { X: setX, R: setR };
        dispatch(actionMap[name](e.target.value));


    }
    return(
        <div style={{
            width: 600,
            height: 50
        }}>
        <FormControl>
            <FormLabel id="radio-buttons">{name}</FormLabel>
            <RadioGroup
            row
            aria-labelledby="radio-buttons"
            name={`radio-buttons-group-${name}`}
            value={value}
            onChange={handleChange}
            >
                {data.map((v, i) => (
                    <FormControlLabel
                        key={i}
                        value={v}
                        control={<Radio />}
                        label={v}
                    />
                ))}
            </RadioGroup>
        </FormControl>
        </div>
    );
}