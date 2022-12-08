import { useRef, useEffect } from 'react';

import { LevelHeader, LevelObject } from '../../../components';
import { useDragNDrop, useLevel } from '../../../hooks';
import { EDragNDropStatus } from '../../../hooks/useDragNDrop';


import styles from './pathLevel.module.sass';

export const PathLevel = (levelData) => {
    const canRef = useRef();
    const { dragNDropRef, state } = useDragNDrop();
    const {
        rating,
        remaining,
        timerData,
        drawingData,
        updateData,
        updateRatio,
        Modal,
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

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
            {timerData && drawingData && <LevelObject
                id={`level_object_${remaining}`}
                drawingData={{ ...drawingData, dragNDropRef }}
                timerData={{ ...timerData, onEnding: updateData, onTick: updateRatio }}
            />}
            <div className={styles.can__background}></div>
            <div className={styles.can__foreground} ref={canRef}></div>
            {Modal}
        </div >
    )
}
