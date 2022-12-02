import { useState, useEffect, useRef } from 'react';


export const useCanvas = () => {
    const canvasRef = useRef();
    const [canvasCtx, setCanvasCtx] = useState();

    useEffect(() => {
        const { current } = canvasRef;
        if (!current) return;

        setCanvasCtx(canvasRef.current.getContext('2d'));
    }, [canvasRef]);

    return { canvasRef, canvasCtx };
}