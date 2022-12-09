import { useRef, useEffect, useState } from 'react';

import { Drawing, LevelHeader, LevelObject } from '../../../components';
import { useDragNDrop, useLevel } from '../../../hooks';
import { EDragNDropStatus } from '../../../hooks/useDragNDrop';
import { DrawerService } from '../../../services';


import styles from './pathLevel.module.sass';

export const PathLevel = (levelData) => {
    const canRef = useRef();

    const { dragNDropRef, handleDrop, node, state } = useDragNDrop();
    const [points, setPoints] = useState();
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
        const canPos = canRef.current?.getBoundingClientRect();

        const objectCoordinates = drawingData && {
            x: (drawingData.start.x + drawingData.size.x / 2),
            y: (drawingData.start.y - drawingData.size.y / 2),
        }
        const canCoordinates = canPos && {
            x: (canPos.left + canPos.right) / 2,
            y: canPos.top - 100,
        };
        if (!objectCoordinates || !canCoordinates) return;

        const newPoints = DrawerService.getBezierCurve(objectCoordinates, canCoordinates);
        setPoints(newPoints);
    }, [drawingData])

    useEffect(() => {
        if (state === EDragNDropStatus.INACTIVE) {
            figureInCan() && updateData({ addRating: true });
        } else {
            const interval = setInterval(() => {
                if (!figureOnPath()) {
                    updateData();
                    handleDrop();
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [state]);

    const figureInCan = () => {
        const canPos = canRef.current?.getBoundingClientRect();
        const objectPos = node?.getBoundingClientRect();
        if (!canPos || !objectPos) return false;

        return (
            objectPos.left > canPos.left &&
            objectPos.right < canPos.right &&
            objectPos.bottom > canPos.top + 50
        );
    }

    const figureOnPath = () => {
        const objectPos = node?.getBoundingClientRect();
        if (!objectPos) return false;
        const res = points.some(point => (
            Math.max(objectPos.right, objectPos.left) > point.x &&
            Math.min(objectPos.right, objectPos.left) < point.x &&
            Math.max(objectPos.top, objectPos.bottom) > point.y + drawingData.size.y / 2 &&
            Math.min(objectPos.top, objectPos.bottom) < point.y + drawingData.size.y / 2
        ));
        return res;
    }

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
            {points && <Drawing
                className={styles.path}
                id={`level_path_${points[0].x}_${points[0].y}`}
                size={{ x: window.innerWidth, y: window.innerHeight }}
                type='curve'
                data={{ points }}
            />}
            {timerData && drawingData && <LevelObject
                id={`level_object_${remaining}`}
                drawingData={{ ...drawingData, dragNDropRef }}
                timerData={{ ...timerData, remaining, onEnding: updateData, onTick: updateRatio }}
            />}
            <div className={styles.can__background}></div>
            <div className={styles.can__foreground} ref={canRef}></div>
            {Modal}
        </div >
    )
}
