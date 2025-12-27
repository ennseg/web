import React, {useState} from 'react';
import {Button} from '@mui/material';
import {register_user} from "../services/register_user";
import {useNavigate} from "react-router-dom";

export const RegisterButton = ({username, password, onError, children, onSuccess}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        if (username==="" || password==="") {
            const error = "Нельзя использовать такой логин или пароль";
            onError(error);
            setMessage(error);
        } else {
            setMessage("");
            const result = await register_user(username, password);

            if (!result.success) {
                onError(result.message);
                setMessage(result.message);
            } else {
                navigate("/main");
                setMessage("");
                onSuccess();
            }
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