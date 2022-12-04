import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { AuthContext } from '../../context';
import { AuthService, GameService } from '../../services';
import { objectToArray } from '../../utils';
import { TableRow } from './TableRow';
import { Button } from '../../components';


import styles from './rating.module.sass';

export const Rating = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const userList = AuthService.getUserList();
    const users = objectToArray(userList, 'name');

    const handleBack = () => navigate('/');

    return (
        <div className={styles.wrapper}>
            <div className={styles.rating}>
                <h2 className={styles.title}>Рейтинг <span>игроков</span></h2>
                <ul className={styles.table}>
                    <TableRow className='template' left='Пользователь' middle='Пройденных уровней' right='Рейтинг' />
                    {users.map(userData => {
                        const rowData = {
                            left: userData.name,
                            middle: GameService.complitedLevelsAmount(userData),
                            right: GameService.getRating(userData),
                            className: classNames(userData.name === user.name && styles.current),
                        };
                        return <TableRow key={userData.name} {...rowData} />
                    })}
                </ul>
                <Button text='Назад' className={styles.button} onClick={handleBack} />
            </div>
        </div>
    );
}
