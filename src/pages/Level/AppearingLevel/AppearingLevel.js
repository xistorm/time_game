import { Drawing, LevelHeader, Timer } from '../../../components';
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
    } = useLevel(levelData);

    const handleClick = () => {
        updateData(true);
    }

    if (!timerData || !drawingData) return;

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={remaining} />
            <div
                className={styles.object}
                onClick={handleClick}
                style={{
                    width: `${drawingData.size}px`,
                    height: `${drawingData.size}px`,
                    top: `${drawingData.y}px`,
                    left: `${drawingData.x}px`,
                    opacity: `${ratio}`,
                }}
            >
                <Timer
                    id={`timer_${remaining}`}
                    className={styles.timer}
                    {...timerData}
                    onTick={updateRatio}
                    onEnding={updateData}
                />
                <Drawing
                    id={`drawing_${remaining}`}
                    className={styles.drawing}
                    size={drawingData.size}
                    vertexesAmount={drawingData.vertexesAmount}
                />
            </div>
        </div >
    )
}
