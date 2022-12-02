import { randomRange } from '../../utils';


export const generateTimerData = (min, max) => {
    const newTimerData = {
        startTime: randomRange(min, max),
        delay: 1000
    };

    return newTimerData;
}

export const generateDrawingData = (minSize, maxSize, minVertexes, maxVertexes) => {
    const newDrawingData = {
        x: randomRange(maxSize, window.innerWidth - maxSize),
        y: randomRange(maxSize, window.innerHeight - maxSize),
        size: randomRange(minSize, maxSize),
        vertexesAmount: randomRange(minVertexes, maxVertexes),
    };

    return newDrawingData;
}
