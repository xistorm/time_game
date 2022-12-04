import classNames from 'classnames';


import styles from './button.module.sass';

export const Button = ({ reversed = false, className, text, ...props }) => {
    return (
        <button {...props} className={classNames(className, styles.button, reversed ? styles.reversed : styles.common)}>
            {text}
        </button>
    )
}
