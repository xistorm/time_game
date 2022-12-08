import { Timer, Drawing } from '..';


import styles from './levelObject.module.sass';

export const LevelObject = ({ id, drawingData, timerData, style, ...props }) => {
    return (
        <div
            key={id}
            className={styles.object}
            ref={drawingData.dragNDropRef}
            style={{
                width: `${drawingData.size}px`,
                height: `${drawingData.size}px`,
                top: `${drawingData.y}px`,
                left: `${drawingData.x}px`,
                ...style
            }}
            {...props}
        >
            <Timer
                id={`timer_${timerData.remaining}`}
                className={styles.timer}
                {...timerData}
                onEnding={timerData.onEnding}
                onTick={timerData.onTick}
            />
            <Drawing
                id={`drawing_${timerData.remaining}`}
                className={styles.drawing}
                size={drawingData.size}
                vertexesAmount={drawingData.vertexesAmount}
            />
        </div>
    );
}
