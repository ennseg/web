import React from 'react';
import {Stage, Layer, Line, Text} from "react-konva";

const canvasSize = 800;
const padding = 60;
const drawableSize = canvasSize - 2 * padding;
const pixelsPerUnit = drawableSize / 50;
const originX = padding + drawableSize / 2;
const originY = padding + drawableSize / 2;

const worldMin = -25;
const worldMax = 25;
const tickEvery = 5;
const labelEvery = 5;
const tickLength = 10;

function worldToScreen(x, y) {
    return {
        sx: originX + x * pixelsPerUnit,
        sy: originY - y * pixelsPerUnit
    };
}

function drawArrow(x1, y1, x2, y2, arrowSize = 12) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    const angle1 = angle + Math.PI / 6;
    const angle2 = angle - Math.PI / 6;

    const xA1 = x2 - arrowSize * Math.cos(angle1);
    const yA1 = y2 - arrowSize * Math.sin(angle1);

    const xA2 = x2 - arrowSize * Math.cos(angle2);
    const yA2 = y2 - arrowSize * Math.sin(angle2);

    return [
        <Line key={`arrowMain${x2}${y2}`} points={[x1, y1, x2, y2]} stroke="black" strokeWidth={2} />,
        <Line key={`arrowHead1${x2}${y2}`} points={[x2, y2, xA1, yA1]} stroke="black" strokeWidth={2} />,
        <Line key={`arrowHead2${x2}${y2}`} points={[x2, y2, xA2, yA2]} stroke="black" strokeWidth={2} />,
    ];
}

function drawAxes() {
    const elements = [];

    const { sx: x0, sy: y0 } = worldToScreen(worldMin, 0);
    const { sx: x1 } = worldToScreen(worldMax, 0);
    const yAxisScreen = originY;
    elements.push(
        <Line key="xAxis" points={[x0, originY, x1, originY]} stroke="black" strokeWidth={2} />,
        drawArrow(x0, yAxisScreen, x1, yAxisScreen)
    );

    const { sx: yx, sy: yy0 } = worldToScreen(0, worldMin);
    const { sy: yy1 } = worldToScreen(0, worldMax);
    const xAxisScreen = originX;
    elements.push(
        <Line key="yAxis" points={[originX, yy0, originX, yy1]} stroke="black" strokeWidth={2} />,
        drawArrow(xAxisScreen, yy0, xAxisScreen, yy1)
    );

    for (let x = worldMin; x <= worldMax; x += tickEvery) {
        const { sx, sy } = worldToScreen(x, 0);
        elements.push(
            <Line key={`xTick${x}`} points={[sx, sy - tickLength / 2, sx, sy + tickLength / 2]} stroke="black" />
        );

        if (x % labelEvery === 0) {
            elements.push(
                <Text key={`xLabel${x}`} x={sx - 10} y={sy + 5} text={(x/5).toString()} fontSize={14} />
            );
        }
    }

    for (let y = worldMin; y <= worldMax; y += tickEvery) {
        const { sx, sy } = worldToScreen(0, y);
        elements.push(
            <Line key={`yTick${y}`} points={[sx - tickLength / 2, sy, sx + tickLength / 2, sy]} stroke="black" />
        );

        if (y % labelEvery === 0 && y !== 0) {
            elements.push(
                <Text key={`yLabel${y}`} x={sx + 5} y={sy - 7} text={(y/5).toString()} fontSize={14} />
            );
        }
    }

    elements.push(<Text key="xlabel" x={x1 + 10} y={originY + 5} text="X" fontSize={16} fontStyle="bold" />);
    elements.push(<Text key="ylabel" x={originX + 5} y={yy1 - 20} text="Y" fontSize={16} fontStyle="bold" />);

    return elements;
}

export function CoordinateSystem() {
    return (
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1
        }}>
        <Stage width={canvasSize} height={canvasSize}>
            <Layer>
                {drawAxes()}
            </Layer>
        </Stage>
        </div>
    );
}
