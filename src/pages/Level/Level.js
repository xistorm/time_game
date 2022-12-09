import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks";
import { GameService } from "../../services";
import { AppearingLevel } from "./AppearingLevel/AppearingLevel";
import { MovingLevel } from "./MovingLevel/MovingLevel";
import { PathLevel } from "./PathLevel/PathLevel";


const levelNameToLevelMap = {
    moving: MovingLevel,
    appearing: AppearingLevel,
    path: PathLevel,
}

export const Level = ({ name }) => {
    const ExactLevel = levelNameToLevelMap[name];
    const levelData = GameService.getLevelData(name);

    const navigate = useNavigate();

    const handleStartModalClose = () => {
        setStarted(true);
    }

    const handlePauseModalClose = () => {
        setPause(false);
    }

    const handleGoToMenu = () => {
        navigate('/level');
    }

    const [pause, setPause] = useState(false);
    const [started, setStarted] = useState(false);
    const startModal = useModal({
        title: `Уровень ${levelData.title}`,
        description: levelData.description,
        closeText: 'Начать',
        opened: true,
        onClose: handleStartModalClose,
    });
    const pauseModal = useModal({
        title: `Пауза`,
        description: 'Вы можете продолжить или начать заново',
        closeText: 'Продолжить',
        additionalAction: {
            text: 'Меню',
            onClick: handleGoToMenu,
        },
        onClose: handlePauseModalClose,
    });

    const handlePause = useCallback((e) => {
        if (e.key !== 'Escape' || !started) return;

        setPause(true);
        pauseModal.openModal();
        document.removeEventListener('keydown', handlePause);
    }, [pauseModal, started]);

    useEffect(() => {
        document.addEventListener('keydown', handlePause);
        return () => document.removeEventListener('keydown', handlePause);
    }, [pause, handlePause])

    return (
        <>
            <ExactLevel pause={pause} started={started} {...levelData} />
            {startModal.Modal}
            {pauseModal.Modal}
        </>
    )
}