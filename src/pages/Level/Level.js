import { useState } from "react";
import { useModal } from "../../hooks";
import { GameService } from "../../services";
import { AppearingLevel } from "./AppearingLevel/AppearingLevel";
import { MovingLevel } from "./MovingLevel/MovingLevel";


const levelNameToLevelMap = {
    moving: MovingLevel,
    appearing: AppearingLevel,
}

export const Level = ({ name }) => {
    const ExactLevel = levelNameToLevelMap[name];
    const levelData = GameService.getLevelData(name);

    const handleModalClose = () => {
        setStarted(true);
    }

    const [started, setStarted] = useState(false)
    const { Modal } = useModal({
        title: `Уровень ${levelData.title}`,
        description: levelData.description,
        closeText: 'Начать',
        opened: true,
        onClose: handleModalClose,
    });

    return (
        <>
            <ExactLevel started={started} {...levelData} />
            {Modal}
        </>
    )
}