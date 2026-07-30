import React, {useState} from 'react';
import {RegisterLoginForm} from "../components/authentication_form.jsx";
import {ExitButton} from "../components/exit_button";
import {BackButton} from "../components/back_button";
import Box from "@mui/material/Box";

export function AuthorizationPage() {
    const [isAuth, setIsAuth] = useState(
        Boolean(localStorage.getItem("token"))
    );

    const handleLogin = () => {
        setIsAuth(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsAuth(false);
    };

    if (!isAuth) {
        return (
            <>
                <header>Соболев Егор Викторович P3209 Вариант №524</header>
                <RegisterLoginForm onLogin={handleLogin}/>
            </>
        );
    } else {
        return(
            <>
                <header>Вы уже авторизированны!</header>
                <Box sx={{ display: "flex",
                    flexDirection: {sm: "column", md: "column", lg: "row"},
                    gap: 0
                }}>
                    <ExitButton onLogout={handleLogout} />
                    <br />

                    <BackButton pass="/main"/>
                </Box>
            </>
        );
    }
}