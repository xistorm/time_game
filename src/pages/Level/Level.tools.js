import { randomRange } from '../../utils';



export const OBJECTS_AMOUNT = 5;

export const MIN_FIGURE_SIZE = 100;
export const MAX_FIGURE_SIZE = 200;

export const MIN_VERTEXES = 3;
export const MAX_VERTEXES = 6;

export const MIN_TIMER_START_TIME = 3;
export const MAX_TIMER_START_TIME = 8;

export const generateTimerData = () => {
    const newTimerData = {
        startTime: randomRange(MIN_TIMER_START_TIME, MAX_TIMER_START_TIME),
        delay: 1000
    };

    return newTimerData;
}

export const generateDrawingData = () => {
    const newDrawingData = {
        x: randomRange(MIN_FIGURE_SIZE, window.innerWidth - MIN_FIGURE_SIZE),
        y: randomRange(MIN_FIGURE_SIZE, window.innerHeight - MIN_FIGURE_SIZE),
        size: randomRange(MIN_FIGURE_SIZE, MIN_FIGURE_SIZE),
        vertexesAmount: randomRange(MIN_VERTEXES, MAX_VERTEXES),
    };

    return newDrawingData;
}
