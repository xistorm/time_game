import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, MenuLink } from '../../components';
import { AuthContext } from '../../context';
import { AuthService } from '../../services';


import styles from './menu.module.sass';

const menuLinks = [
    {
        to: '/level',
        text: 'Играть',
    },
    {
        to: '/rating',
        text: 'Рейтинг',
    },
];

export const Menu = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const user = AuthService.logout();
        updateUser(user);
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <h2 className={styles.title}>Игра со <span>временем</span></h2>
                <div className={styles.subtitle}>
                    <p>Пользователь: {user.name}</p>
                    <p>Рейтинг: {user.rating}</p>
                </div>
                <ul className={styles.links}>
                    {menuLinks.map((link, index) => <MenuLink {...link} key={index} />)}
                </ul>
                <Button className={styles.button} text='Выйти' onClick={handleLogout} />
            </div>
        </div>
    );
}
