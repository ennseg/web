import {setSuccess} from '../store/point_slice';
import {addTableRow} from "../store/table_slice";

export async function send_point(dispatch, x, y, r) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:8080/lab4/api/points/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ x, y, r })
    });

    const response_wasm = await fetch("http://localhost:8081/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ x, y, r })
    });


    const data = await response.json();
    const data_wasm = await response_wasm.json();

    const newRow = {
        id: data.id || Date.now(),
        x: parseFloat(x),
        y: parseFloat(y),
        r: parseFloat(r),
        success: Boolean(data_wasm.result)
    };

    dispatch(addTableRow(newRow));
    dispatch(setSuccess(Boolean(data.success)));
}
