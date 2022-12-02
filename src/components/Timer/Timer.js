import classNames from 'classnames';
import { useEffect, useState } from 'react';


import styles from './timer.module.sass';

export const Timer = ({ startTime, id, delay, onEnding, className }) => {
    const [time, setTime] = useState(startTime);
    const [timeInterval, setTimeInterval] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(val => val - 1);
        }, delay);
        setTimeInterval(interval);

        return () => {
            clearInterval(interval);
        }
    }, [delay, id]);

    useEffect(() => {
        setTime(startTime);
    }, [startTime, id])

    useEffect(() => {
        if (time === 0) {
            onEnding();
            clearInterval(timeInterval);
        }
    }, [time]);

    return (
        <p className={classNames(className, styles.time)}>{time}</p>
    );
}
