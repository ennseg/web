import React from 'react';
import {Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

export const BackButton = ({pass}) => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(pass);
    }

    return(
        <div style={{
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
        }}>
            <Button
            onClick={handleClick}
            >Назад</Button>
        </div>
    );
}