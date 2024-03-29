import classNames from "classnames";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

import { useInput } from '../../hooks';
import { AuthContext } from "../../context";
import { AuthService } from "../../services";

import { Button } from '../../components';

import styles from './login.module.sass';

export const Login = () => {
    const { updateUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const [value, handleChange] = useInput();
    const [error, setError] = useState(false);

    const handleLogin = () => {
        try {
            const user = AuthService.login({ name: value });
            updateUser(user);
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={classNames(styles.half, styles.left)}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>Игра со <span>временем</span></h1>
                        <p className={styles.description}>Это веб-браузерная игра, выполненная для сдачи курсовой работы. Она содержит несколько уровней, каждый из которых связан тем или иным образом с временем. Надеюсь вам понравится!</p>
                        <div className={styles.form}>
                            <input
                                type='text'
                                placeholder='Ваш никнейм'
                                name="login"
                                className={classNames(styles.input, error && styles.incorrect)}
                                value={value}
                                onChange={handleChange}
                            />
                            {error && <p className={classNames(styles.error)}>{error}</p>}
                            <Button reversed onClick={handleLogin} text='Войти' />
                        </div>
                    </div>
                </div>

                <div className={classNames(styles.half, styles.right)}>
                    <div className={styles.image}></div>
                </div>
            </div>
        </div >
    )
}
