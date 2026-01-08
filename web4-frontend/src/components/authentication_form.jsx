import React, {useState} from 'react';
import {TextField} from '@mui/material';
import {AuthorizationButton} from "./authorization_button";
import {RegisterButton} from "./register_button";
import Box from "@mui/material/Box";

export const RegisterLoginForm = ({onLogin}) => {
    const [username, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSuccess = () => {
        onLogin();
    };

    return (
        <div>
            <TextField
                placeholder="Имя пользователя"
                value={username}
                onChange={e => setLogin(e.target.value)}
            />
            <br/>

            <TextField
                placeholder="Пароль"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br/>

            <Box sx={{ display: "flex",
                flexDirection: {sm: "column", md: "column", lg: "row"},
                gap: 0
            }}>
            <AuthorizationButton username={username} password={password} onError={(msg) => setError(msg)} onSuccess={handleSuccess}>
                Авторизоваться
            </AuthorizationButton>
            <br/>

            <RegisterButton username={username} password={password} onError={(msg) => setError(msg)} onSuccess={handleSuccess}>
                Зарегистрироваться
            </RegisterButton>
            </Box>

        </div>
    );
};
