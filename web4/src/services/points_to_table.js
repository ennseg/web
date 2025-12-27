import {setTableRows} from "../store/table_slice";

export async function points_to_table(dispatch) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:8080/lab4/api/points", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    const rows = data.rows.map(row => ({
        id: row.id,
        r: row.r,
        x: row.x,
        y: row.y,
        success: row.success
    }));

    dispatch(setTableRows(rows));
}
