import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FaLock, FaCheckCircle } from 'react-icons/fa';


import styles from './menuLink.module.sass';

const EStatusIconMap = {
    lock: <FaLock className={styles.icon} />,
    complete: <FaCheckCircle className={styles.icon} />,
}

export const MenuLink = ({ to, text, className, status, ...props }) => {
    const icon = EStatusIconMap[status];
    const statusClassName = styles[status] || '';

    return (
        <li {...props} className={classNames(className, statusClassName, styles.container)}>
            <Link to={to} className={styles.link}>{text}</Link>
            {icon}
        </li>
    );
}
