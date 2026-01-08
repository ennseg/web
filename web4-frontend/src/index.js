// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import theme from './services/theme';
import { ThemeProvider } from '@mui/material';
import { AuthorizationPage } from './pages/AuthorizationPage.jsx';
import { MainPage } from './pages/MainPage.jsx';
import { ProtectedRoute } from './services/protect_route';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Routes>
                        {/* Публичная страница авторизации */}
                        <Route path="/" element={<AuthorizationPage />} />

                        {/* Защищённые маршруты */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/main" element={<MainPage />} />
                        </Route>

                        {/* Редирект на авторизацию, если путь не найден */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </HashRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
