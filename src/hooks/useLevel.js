import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { randomArrayItem, randomRange, updateWindow } from '../utils';
import { GameService, AuthService } from '../services';
import { AuthContext } from "../context";
import { useModal } from "./useModal";


const START_RATIO = 0.1;
const RATING_PER_OBJECT = 200;
const TYPES = [
    'nAngle',
    'circle',
]

export const generateTimerData = (timerTime, pause = false) => {
    const newTimerData = {
        startTime: randomRange(timerTime.min, timerTime.max),
        delay: 1000,
        pause,
    };

    return newTimerData;
}

export const generateDrawingData = (figureSize, vertexesAmountRange) => {
    const size = randomRange(figureSize.min, figureSize.max);
    const type = randomArrayItem(TYPES);
    const vertexesAmount = randomRange(vertexesAmountRange.min, vertexesAmountRange.max);

    const data = (() => {
        switch (type) {
            case 'nAngle': return {
                angles: vertexesAmount,
                len: size / 2,
            };
            case 'circle': return {
                radius: size / 2,
            };
            default: return;
        };
    })();

    const newDrawingData = {
        start: {
            x: randomRange(figureSize.max, window.innerWidth - figureSize.max),
            y: randomRange(figureSize.max, window.innerHeight - figureSize.max),
        },
        size: { x: size, y: size },
        vertexesAmount,
        type,
        data,
    };

    return newDrawingData;
}

export const useLevel = ({
    levelName,
    unlockingLevelName,
    objectsAmount,
    figureSize,
    vertexesAmount,
    timerTime,
    started,
    pause,
}) => {
    const handleResults = () => {
        navigate('/level');
    }

    const handleRetry = () => {
        updateWindow();
    }

    const [ratio, setRatio] = useState(START_RATIO);
    const [rating, setRating] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timerData, setTimerData] = useState();
    const [drawingData, setDrawingData] = useState();

    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { Modal, openModal } = useModal({
        title: 'Результаты',
        description: `Вы набрали ${rating} очков! Так держать!`,
        closeText: 'Меню',
        onClose: handleResults,
        additionalAction: {
            text: 'Еще раз',
            onClick: handleRetry,
        }
    });

    useEffect(() => {
        if (!started) return;
        updateData();
    }, [started]);

    useEffect(() => {
        setTimerData(prev => ({ ...prev, pause }));
    }, [pause]);

    useEffect(() => {
        if (currentIndex === objectsAmount) {
            const userWithUnlockedLevel = unlockingLevelName ?
                GameService.unlockLevel(user, unlockingLevelName) :
                user;
            const userWithRating = GameService.compliteLevel(userWithUnlockedLevel, levelName, rating);
            const updatedUser = AuthService.update(userWithRating);
            updateUser(updatedUser);
            openModal();
        }
    }, [currentIndex]);

    const updateData = ({ addRating = false, addIndex = true } = {}) => {
        if (currentIndex === objectsAmount) return;
        const newTimerData = generateTimerData(timerTime, pause);
        const newDrawingData = generateDrawingData(figureSize, vertexesAmount);

        setTimerData({ ...newTimerData });
        setDrawingData({ ...newDrawingData });
        addIndex && setCurrentIndex((val) => val += 1);
        addRating && setRating((val) => val += Math.floor(ratio * RATING_PER_OBJECT));
        setRatio(START_RATIO);
    }

    const updateRatio = () => {
        const shift = 0.9 / (timerData.startTime - 1);
        setRatio((val) => val += shift);
    }

    return {
        ratio,
        rating,
        remaining: objectsAmount - currentIndex,
        timerData,
        drawingData,
        updateData,
        updateRatio,
        Modal,
    }
}