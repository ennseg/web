import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector, useDispatch} from "react-redux";
import {points_to_table} from "../services/points_to_table.js";
import {setSuccess} from "../store/point_slice";

export function BasicTable() {
    const dispatch = useDispatch();
    const rows = useSelector(state => state.table.rows);
    const success = useSelector(state => state.params.success);

    useEffect(() => {
        points_to_table(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (success !== null) {
            dispatch(setSuccess(null));
        }
    }, [success, dispatch]);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="points table">
                <TableHead>
                    <TableRow>
                        <TableCell>Success</TableCell>
                        <TableCell align="right">R</TableCell>
                        <TableCell align="right">X</TableCell>
                        <TableCell align="right">Y</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.success ? 'Попадание' : 'Промах'}</TableCell>
                            <TableCell align="right">{row.r}</TableCell>
                            <TableCell align="right">{row.x}</TableCell>
                            <TableCell align="right">{row.y}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
