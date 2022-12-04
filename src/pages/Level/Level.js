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

    return (
        <ExactLevel {...levelData} />
    )
}