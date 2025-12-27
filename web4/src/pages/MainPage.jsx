import React from 'react';
import {RadioButton} from "../components/radio.jsx";
import {InputText} from "../components/input_text";
import {CoordinateSystem} from "../components/coord_sys.jsx";
import {SContainer} from "../components/container.jsx";
import {Area} from "../components/area.jsx";
import {SendButton} from "../components/send_button";
import Box from "@mui/material/Box";
import {BasicTable} from "../components/table";
import {BackButton} from "../components/back_button";

export function MainPage() {
    const username = localStorage.getItem("username");
    return (
        <Box sx={{ display: "flex",
            flexDirection: {sm: "column", md: "column", lg: "column"},
            gap: 5
        }}>
            {username}
            <RadioButton name='X' data={['-3', '-2', '-1', '0', '1', '2', '3', '4', '5']} />

            <InputText name="Y" min={-5} max={5} />

            <RadioButton name='R' data={['-3', '-2', '-1', '0', '1', '2', '3', '4', '5']} />

            <Box sx={{ display: "flex",
                flexDirection: {sm: "column", md: "column", lg: "row"},
                gap: 5
            }}>
                <SContainer width={400} height={50}>
                    <SendButton text="Отправить" />
                </SContainer>

                <SContainer width={400} height={50}>
                    <BackButton pass="/lab4"/>
                </SContainer>
            </Box>

            <Box sx={{ display: "flex",
                flexDirection: {sm: "column", md: "column", lg: "row"},
                gap: 5
            }}>
                <SContainer>
                    <CoordinateSystem />
                    <Area />
                </SContainer>

                <BasicTable></BasicTable>
            </Box>
        </Box>
    );
}

