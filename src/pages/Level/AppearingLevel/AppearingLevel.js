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
        const addRating = ALLOWEDED_FIGURE_TYPES.includes(drawingData.type);
        updateData(addRating);
    }

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
            {timerData && drawingData && <LevelObject
                id={`level_object_${remaining}`}
                style={{ opacity: `${ratio}` }}
                onClick={handleClick}
                drawingData={{ ...drawingData }}
                timerData={{ ...timerData, onEnding: updateData, onTick: updateRatio }}
            />}
            {Modal}
        </div >
    )
}
