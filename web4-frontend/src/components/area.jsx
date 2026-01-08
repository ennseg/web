import React from 'react';
import {Stage, Layer, Rect, Arc, Line} from "react-konva";
import {useDispatch, useSelector} from "react-redux";
import {validation_r} from "../services/validation_r";
import {DrawPoint} from "./draw_point";
import {point_by_click} from "../services/point_by_click";

export function Area() {
    const dispatch = useDispatch();
    const r = useSelector(state => state.params.R);
    const R = validation_r(r);
    const rows = useSelector(state => state.table.rows);
    return (
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2
        }}>
        <Stage width={800} height={800} style={{ zIndex: 2 }} onClick={(e) => point_by_click(e, dispatch, R)}>
            <Layer>
                <Rect x={400} y={400} width={13.6*5*R/2} height={-13.6*5*R} fill="skyblue" opacity={0.5} listening={false} />
                <Arc x={400} y={400} innerRadius={0} outerRadius={13.6*5*R} angle={90} rotation={0} fill="skyblue" opacity={0.5} listening={false} />
                <Line
                    points={[400-13.6*5*R, 400, 400, 400, 400, 400+13.6*5*R]}
                    closed
                    fill="skyblue"
                    opacity={0.5}
                    listening={false}
                />
                {rows.map(row => (
                    <DrawPoint
                        key={row.id}
                        x={row.x}
                        y={row.y}
                        r={row.r}
                        success={row.success}
                        now_r={R}
                    />
                ))}
            </Layer>
        </Stage>
        </div>
    );
}