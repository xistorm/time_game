import { useState, useEffect, useRef } from 'react';


export const useCanvas = () => {
    const canvasRef = useRef();
    const [canvasCtx, setCanvasCtx] = useState();

    useEffect(() => {
        setCanvasCtx(canvasRef.current.getContext('2d'));
    }, []);

    return { canvasRef, canvasCtx };
}