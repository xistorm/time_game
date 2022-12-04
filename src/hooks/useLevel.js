import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { randomRange } from '../utils';
import { GameService, AuthService } from '../services';
import { AuthContext } from "../context";


const START_RATIO = 0.1;
const RATING_PER_OBJECT = 200;

export const generateTimerData = (timerTime) => {
    const newTimerData = {
        startTime: randomRange(timerTime.min, timerTime.max),
        delay: 1000
    };

    return newTimerData;
}

export const generateDrawingData = (figureSize, vertexesAmount) => {
    const newDrawingData = {
        x: randomRange(figureSize.max, window.innerWidth - figureSize.max),
        y: randomRange(figureSize.max, window.innerHeight - figureSize.max),
        size: randomRange(figureSize.min, figureSize.max),
        vertexesAmount: randomRange(vertexesAmount.min, vertexesAmount.max),
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
}) => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [ratio, setRatio] = useState(START_RATIO);
    const [rating, setRating] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timerData, setTimerData] = useState();
    const [drawingData, setDrawingData] = useState();

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        if (currentIndex === objectsAmount) {
            const userWithUnlockedLevel = unlockingLevelName ?
                GameService.unlockLevel(user, unlockingLevelName) :
                user;
            const userWithRating = GameService.compliteLevel(userWithUnlockedLevel, levelName, rating);
            const updatedUser = AuthService.update(userWithRating);
            updateUser(updatedUser);
            navigate('/rating');
        }
    }, [currentIndex]);

    const updateData = (addRating = false) => {
        const newTimerData = generateTimerData(timerTime);
        const newDrawingData = generateDrawingData(figureSize, vertexesAmount);

        setTimerData({ ...newTimerData });
        setDrawingData({ ...newDrawingData });
        setCurrentIndex((val) => val += 1);
        addRating && setRating((val) => val += Math.floor(ratio * RATING_PER_OBJECT));
        setRatio(START_RATIO);
    }

    const updateRatio = () => {
        const shift = 0.9 / (timerData.startTime - 1);
        setRatio((val) => val += shift);
    }

    return {
        rating,
        remaining: objectsAmount - currentIndex,
        timerData,
        drawingData,
        updateData,
        updateRatio,
    }
}