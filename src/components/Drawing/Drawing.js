import { memo, useEffect } from 'react';

import { useCanvas } from '../../hooks';
import { DrawerService } from '../../services';


import styles from './drawing.module.sass';

const drawingTypeToDrawingFunction = {
    nAngle: DrawerService.fillNAngleFigure,
    curve: DrawerService.drawCurve,
    circle: DrawerService.fillCircle,
}

const DrawingComponent = ({ size, id, type, data, ...props }) => {
    const { canvasRef, canvasCtx } = useCanvas();

    useEffect(() => {
        if (!canvasCtx) return;
        const drawingFunction = drawingTypeToDrawingFunction[type];
        drawingFunction(canvasCtx, data);

        return () => {
            DrawerService.clearCanvas(canvasCtx, size);
        }
    }, [canvasCtx, id])

    return (
        <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={`${size.x}px`}
            height={`${size.y}px`}
            {...props}
        ></canvas>
    );
}

export const Drawing = memo(DrawingComponent)
