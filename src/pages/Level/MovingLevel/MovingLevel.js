import { useRef, useEffect, useState } from 'react';

import { Drawing, LevelHeader, Timer } from '../../../components';
import { useDragNDrop } from '../../../hooks';
import { EDragNDropStatus } from '../../../hooks/useDragNDrop';
import { generateTimerData, generateDrawingData } from '../Level.tools';


import styles from './movingLevel.module.sass';

const OBJECTS_AMOUNT = 5;

const MIN_FIGURE_SIZE = 100;
const MAX_FIGURE_SIZE = 200;

const MIN_VERTEXES = 3;
const MAX_VERTEXES = 6;

const MIN_TIMER_START_TIME = 3;
const MAX_TIMER_START_TIME = 5;

export const MovingLevel = () => {
    const canRef = useRef();
    const { dragNDropRef, state } = useDragNDrop();

    const [rating, setRating] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timerData, setTimerData] = useState();
    const [drawingData, setDrawingData] = useState();

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        console.log(figureInCan());
        if (state === EDragNDropStatus.INACTIVE && figureInCan()) {
            setRating((prev) => prev += 200);
            updateData();
        }
    }, [state]);

    const figureInCan = () => {
        const canPos = canRef.current?.getBoundingClientRect();
        const elPos = dragNDropRef.current?.getBoundingClientRect();

        if (!canPos || !elPos) return false;

        return (
            elPos.left > canPos.left &&
            elPos.right < canPos.right &&
            elPos.bottom > canPos.top + 50
        );
    }

    const updateData = () => {
        const newTimerData = generateTimerData(MIN_TIMER_START_TIME, MAX_TIMER_START_TIME);
        const newDrawingData = generateDrawingData(MIN_FIGURE_SIZE, MAX_FIGURE_SIZE, MIN_VERTEXES, MAX_VERTEXES);

        setTimerData({ ...newTimerData });
        setDrawingData({ ...newDrawingData });
        setCurrentIndex((val) => val += 1);
    }

    const handleTimerEnd = (index = 0) => {
        updateData()
    }

    if (!timerData || !drawingData) return;

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={currentIndex} />
            <div
                className={styles.object}
                ref={dragNDropRef}
                style={{
                    width: `${drawingData.size}px`,
                    height: `${drawingData.size}px`,
                    top: `${drawingData.y}px`,
                    left: `${drawingData.x}px`
                }}
            >
                <Timer
                    id={`timer_${currentIndex}`}
                    className={styles.timer}
                    {...timerData}
                    onEnding={handleTimerEnd}
                />
                <Drawing
                    id={`drawing_${currentIndex}`}
                    className={styles.drawing}
                    size={drawingData.size}
                    vertexesAmount={drawingData.vertexesAmount}
                />
            </div>
            <div className={styles.can__background}></div>
            <div className={styles.can__foreground} ref={canRef}></div>
        </div >
    )
}
