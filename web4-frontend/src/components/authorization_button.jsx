import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {authenticate_user} from "../services/authenticate_user";
import {useNavigate} from "react-router-dom";

export const AuthorizationButton = ({username, password, onError, children, onSuccess}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        const result = await authenticate_user(username, password);

        if (!result.success) {
            onError(result.message);
            setMessage(result.message);
        } else {
            navigate("/main");
            setMessage("");
            onSuccess();
        }
    };

    return(
        <div>
            <Button onClick={handleClick}>
                {children}
            </Button>
            <div>{message}</div>
        </div>
    );
};