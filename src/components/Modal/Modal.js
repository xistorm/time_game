import { Button } from '..';

import { cancelAction } from '../../utils';


import styles from './modal.module.sass';

export const Modal = ({
    title,
    description,
    closeAction,
    additionalAction,
}) => {
    return (
        <div className={styles.wrapper} onClick={closeAction.onClick}>
            <div className={styles.modal} onClick={cancelAction}>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}
                <div className={styles.actions}>
                    <Button className={styles.button} {...closeAction} />
                    {additionalAction && <Button className={styles.button} {...additionalAction} reversed />}
                </div>
            </div>
        </div>
    );
}
