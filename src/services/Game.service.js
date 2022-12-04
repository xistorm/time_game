import levelsData from '../data/levels.json';


export class GameService {

    static ELevelStatus = {
        LOCK: 'lock',
        OPEN: 'open',
        COMPLETE: 'complete',
    };

    static getLevelData = (levelName) => {
        const levelData = levelsData[levelName];

        return levelData;
    }

    static getLevelTitle = (levelName) => {
        const levelTitle = levelsData[levelName].title

        return levelTitle;
    }

    static getRating = (user) => {
        const { levels } = user;
        return Object.keys(user.levels).reduce((prev, key) => {
            return prev += levels[key].rating;
        }, 0);
    }

    static complitedLevelsAmount = (user) => {
        const { levels } = user;
        const complitedLevels = Object.keys(levels).filter(key => levels[key].status === this.ELevelStatus.COMPLETE);
        return complitedLevels.length;
    }

    static compliteLevel = (user, levelName, rating) => {
        user.levels[levelName].status = this.ELevelStatus.COMPLETE;
        user.levels[levelName].rating = rating;

        return user;
    }

    static unlockLevel = (user, levelName) => {
        if (user.levels[levelName].status === this.ELevelStatus.LOCK) {
            user.levels[levelName].status = this.ELevelStatus.OPEN;
        }

        return user;
    }

}