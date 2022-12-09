import composeRefs from '@seznam/compose-react-refs';
import { Timer, Drawing } from '..';


import styles from './levelObject.module.sass';

export const LevelObject = ({ objectRef, id, drawingData, timerData, color, style, ...props }) => {
    return (
        <div
            key={id}
            className={styles.object}
            ref={composeRefs(drawingData.dragNDropRef, objectRef)}
            style={{
                width: `${drawingData.size}px`,
                height: `${drawingData.size}px`,
                top: `${drawingData.start.y}px`,
                left: `${drawingData.start.x}px`,
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
                type='nAngle'
                size={drawingData.size}
                data={{
                    angles: drawingData.vertexesAmount,
                    len: drawingData.size.x / 2,
                    color,
                }}
            />
        </div>
    );
}
