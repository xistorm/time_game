import { LevelHeader, LevelObject } from '../../../components';
import { useLevel } from '../../../hooks';


import styles from './appearingLevel.module.sass';


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
        updateData(true);
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
