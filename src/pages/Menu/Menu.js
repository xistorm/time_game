import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
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
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const user = AuthService.logout();
        setUser(user);
        navigate('/')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <h2 className={styles.title}>Игра со <span>временем</span></h2>
                <ul className={styles.links}>
                    {menuLinks.map(({ to, text }, index) => (
                        <li key={index}>
                            <Link to={to} className={styles.link}>{text}</Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.logout}>
                    <p className={styles.name}>Пользователь: {user.name}</p>
                    <Button className={styles.button} text='Выйти' onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
}