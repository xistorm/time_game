import classNames from 'classnames';


import styles from './rating.module.sass';

export const TableRow = ({ className, name, level, rating }) => {
    return (
        <li key={name} className={classNames(styles.row, className)}>
            <div className={classNames(styles.item)}>
                <p className={classNames(styles.left, styles.field)}>{name}</p>
                <p className={classNames(styles.middle, styles.field)}>{level}</p>
                <p className={classNames(styles.right, styles.field)}>{rating}</p>
            </div>
        </li>
    )
}
