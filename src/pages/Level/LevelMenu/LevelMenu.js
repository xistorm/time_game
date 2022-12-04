import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, MenuLink } from '../../../components';
import { AuthContext } from '../../../context';
import { GameService } from '../../../services';
import { MovingLevel } from '../MovingLevel/MovingLevel';
import { AppearingLevel } from '../AppearingLevel/AppearingLevel';


import styles from './levelMenu.module.sass';

export const indexToLevelMap = {
    'moving': <MovingLevel />,
    'appearing': <AppearingLevel />,
}

export const LevelMenu = () => {
    const { user } = useContext(AuthContext);
    const levels = GameService.getLevels(user);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/levels');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <h2 className={styles.title}>Уровни <span>игры</span></h2>
                <ul className={styles.links}>
                    {Object.keys(levels).map((key, index) => {
                        const { status, title } = levels[key];
                        const isActive = status !== GameService.ELevelStatus.LOCK;
                        const className = !isActive ? styles[status] : '';
                        const to = isActive ? `/level/${key}` : ''

                        return <MenuLink
                            key={index}
                            className={className}
                            to={to}
                            status={status}
                            text={title}
                        />;
                    })}
                </ul>
                <Button className={styles.button} text='Назад' onClick={handleGoBack} />
            </div>
        </div>
    )
}
