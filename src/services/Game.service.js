

export class GameService {

    static ELevelStatus = {
        LOCK: 'lock',
        OPEN: 'open',
        COMPLETE: 'complete',
    };

    static emptyLevels = {
        moving: {
            status: this.ELevelStatus.OPEN,
            title: 'Движение'
        },
        appearing: {
            status: this.ELevelStatus.LOCK,
            title: 'Появление'
        },
    }

    static initLevels = (user) => {
        const { levels } = user;
        const fullLevelsInfo = { ...this.emptyLevels, ...levels };

        return fullLevelsInfo;
    }

    static getLevels = (user) => {
        const fullLevelsInfo = this.initLevels(user);
        return fullLevelsInfo;
    }

    static complitedLevelsAmount = (user) => {
        const { levels } = user;
        const complitedLevels = Object.keys(levels).filter(key => levels[key].status === this.ELevelStatus.COMPLITE);
        return complitedLevels.length;
    }

    static compliteLevel = (user, levelName) => {
        user.levels[levelName].status = this.ELevelStatus.COMPLETE;
        return user;
    }

}