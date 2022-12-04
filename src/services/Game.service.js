

export class GameService {

    static ELevelStatus = {
        LOCK: 'lock',
        OPEN: 'open',
        COMPLETE: 'complete',
    };

    static emptyLevels = {
        moving: {
            status: this.ELevelStatus.OPEN,
            title: 'Движение',
            rating: 0,
        },
        appearing: {
            status: this.ELevelStatus.LOCK,
            title: 'Появление',
            rating: 0,
        },
    }

    static initLevels = (user) => {
        const { levels } = user;
        const fullLevelsInfo = { ...this.emptyLevels, ...levels };

        return fullLevelsInfo;
    }

    static getRating = (user) => {
        const { levels } = user;
        return Object.keys(user.levels).reduce((prev, key) => {
            return prev += levels[key].rating;
        }, 0);
    }

    static getLevels = (user) => {
        const fullLevelsInfo = this.initLevels(user);
        return fullLevelsInfo;
    }

    static complitedLevelsAmount = (user) => {
        const { levels } = user;
        const complitedLevels = Object.keys(levels).filter(key => levels[key].status === this.ELevelStatus.COMPLETE);
        return complitedLevels.length;
    }

    static compliteLevel = (user, levelName, rating) => {
        user.levels[levelName] = {
            ...this.emptyLevels[levelName],
            status: this.ELevelStatus.COMPLETE,
            rating,
        };
        return user;
    }

    static unlockLevel = (user, levelName) => {
        user.levels[levelName] = {
            ...this.emptyLevels[levelName],
            status: this.ELevelStatus.OPEN,
        }
    }

}