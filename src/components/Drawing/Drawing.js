import { useEffect } from 'react';

import { useCanvas, } from '../../hooks';
import { DrawerService } from '../../services';


import styles from './drawing.module.sass';

export const Drawing = ({ size, id, vertexesAmount, ...props }) => {
    const { canvasRef, canvasCtx } = useCanvas();

    useEffect(() => {
        if (!canvasCtx) return;

        DrawerService.fillNAngleFigure(canvasCtx, vertexesAmount, size / 2);
        return () => {
            DrawerService.clearCanvas(canvasCtx, size);
        }
    }, [canvasCtx, id])

    return (
        <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={`${size}px`}
            height={`${size}px`}
            {...props}
        ></canvas>
    );
}
