import React from 'react';
import {Circle} from 'react-konva';
import {change_color} from "../services/change_color";

export function DrawPoint({x, y, r, success, now_r}) {
    const sx = 400 + x*13.6*5;
    const sy = 400 - y*13.6*5;

    return (
        <Circle
            x={sx}
            y={sy}
            radius={8}
            fill={change_color(now_r, x, y) ? '#4caf50' : '#f44336'}
            stroke="#000"
            strokeWidth={2}
            shadowBlur={10}
            shadowColor={success ? '#4caf50' : '#f44336'}
            opacity={0.9}
        />
    );
}