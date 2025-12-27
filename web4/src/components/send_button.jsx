import React from 'react';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {send_point} from "../services/send_point";

export const SendButton = ({text}) => {
    const dispatch = useDispatch();
    const { X, Y, R, success } = useSelector(state => state.params);

    const yNum = Number(Y);

    if (X==null || Y==null || Y==="" || isNaN(yNum) || yNum < -5 || yNum > 5) {
        return <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
            }}>Некорректный формат введённых данных</div>;
    }

    return(
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }}>
        <Button
        onClick={() => send_point(dispatch, X, Y, R)}
        >{text}</Button>
        </div>
    )
}