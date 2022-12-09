import classNames from 'classnames';
import { useEffect, useState } from 'react';


import styles from './timer.module.sass';

export const Timer = ({
    startTime,
    id,
    delay,
    onEnding,
    onTick,
    pause,
    className,
    ...props
}) => {
    const [time, setTime] = useState(startTime);
    const [timeoutId, setTimeoutId] = useState();

    useEffect(() => {
        setTime(startTime);
    }, [startTime, id])

    useEffect(() => {
        if (time === 0) {
            onEnding();
            clearTimeout(timeoutId);
            return;
        }
        const newTimeoutId = setTimeout(() => {
            !pause && onTick && onTick();
            !pause && setTime(val => val - 1);
        }, delay);
        setTimeoutId(newTimeoutId);

        return () => {
            clearTimeout(newTimeoutId);
        }
    }, [time, pause]);

    return (
        <p className={classNames(className, styles.time)} {...props}>{time}</p>
    );
}
