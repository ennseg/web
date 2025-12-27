import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export function SContainer({ children, width = 800, height = 800 }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container sx={{ maxWidth: width, padding: 0 }}>
                <Box
                    sx={{
                        position: "relative",
                        bgcolor: '#d4dee1',
                        width: width,
                        height: height,
                        border: 5,
                        borderColor: '#838383'
                    }}
                >
                    {children}
                </Box>
            </Container>
        </React.Fragment>
    );
}
