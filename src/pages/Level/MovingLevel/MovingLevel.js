import { useRef, useEffect } from 'react';

import { Drawing, LevelHeader, Timer } from '../../../components';
import { useDragNDrop, useLevel } from '../../../hooks';
import { EDragNDropStatus } from '../../../hooks/useDragNDrop';


import styles from './movingLevel.module.sass';

export const MovingLevel = (levelData) => {
    const canRef = useRef();
    const { dragNDropRef, state } = useDragNDrop();
    const {
        rating,
        remaining,
        timerData,
        drawingData,
        updateData,
        updateRatio,
    } = useLevel(levelData);

    useEffect(() => {
        if (state === EDragNDropStatus.INACTIVE && figureInCan()) {
            updateData(true);
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

    if (!timerData || !drawingData) return;

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
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
                    id={`timer_${remaining}`}
                    className={styles.timer}
                    {...timerData}
                    onEnding={updateData}
                    onTick={updateRatio}
                />
                <Drawing
                    id={`drawing_${remaining}`}
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
