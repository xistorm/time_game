import classNames from 'classnames';
import { GameService } from '../../services';


import styles from './rating.module.sass';

export const TableRow = ({ className, user }) => {
    if (!user) return;

    const rating = GameService.getRating(user);
    const complited = GameService.complitedLevelsAmount(user);

    return (
        <li className={classNames(styles.row, className)}>
            <div className={classNames(styles.item)}>
                <p className={classNames(styles.left, styles.field)}>{user.name}</p>
                <p className={classNames(styles.middle, styles.field)}>{complited}</p>
                <p className={classNames(styles.right, styles.field)}>{rating}</p>
            </div>
        </li>
    )
}
