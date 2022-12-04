import { useNavigate } from 'react-router-dom';

import { Button } from '../../Button/Button';


import styles from './levelHeader.module.sass';

export const LevelHeader = ({ rating, remaining }) => {
    return (
        <div className={styles.header}>
            <div className={styles.data}>
                <p>Набранные очки: {rating}</p>
                <p>Осталось элементов: {remaining}</p>
            </div>
        </div>
    )
}
