import { LevelHeader, LevelObject } from '../../../components';
import { useLevel } from '../../../hooks';


import styles from './appearingLevel.module.sass';


const ALLOWEDED_FIGURE_TYPES = [
    'nAngle',
];

export const AppearingLevel = (levelData) => {
    const {
        ratio,
        rating,
        remaining,
        timerData,
        drawingData,
        updateData,
        updateRatio,
        Modal
    } = useLevel(levelData);

    const handleClick = () => {
        const allowedType = ALLOWEDED_FIGURE_TYPES.includes(drawingData.type);
        updateData({ addRating: allowedType, addIndex: allowedType });
    }

    const handleTimerEnd = () => {
        const allowedType = ALLOWEDED_FIGURE_TYPES.includes(drawingData.type);
        updateData({ addIndex: allowedType });
    }

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
            {timerData && drawingData && <LevelObject
                id={`level_object_${drawingData.start.x}_${drawingData.start.y}`}
                style={{ opacity: `${ratio}` }}
                onClick={handleClick}
                drawingData={{ ...drawingData }}
                timerData={{ ...timerData, onEnding: handleTimerEnd, onTick: updateRatio }}
            />}
            {Modal}
        </div >
    )
}
