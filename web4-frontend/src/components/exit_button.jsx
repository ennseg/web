import React from 'react';
import {Button} from '@mui/material';

export const ExitButton = ({onLogout}) => {

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
                onClick={onLogout}
            >Выйти</Button>
        </div>
    );
}