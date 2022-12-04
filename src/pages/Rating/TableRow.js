import classNames from 'classnames';
import styles from './rating.module.sass';

export const TableRow = ({ className, left, middle, right }) => {
    return (
        <li className={classNames(styles.row, className)}>
            <div className={classNames(styles.item)}>
                <p className={classNames(styles.left, styles.field)}>{left}</p>
                <p className={classNames(styles.middle, styles.field)}>{middle}</p>
                <p className={classNames(styles.right, styles.field)}>{right}</p>
            </div>
        </li>
    )
}
