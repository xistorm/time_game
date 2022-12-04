import { useState } from "react"

import { Modal } from '../components';


export const useModal = ({
    title,
    description,
    closeText,
    onClose,
    additionalAction,
    opened = false
}) => {
    const openModal = () => {
        setIsOpened(true);
    }

    const closeModal = () => {
        onClose && onClose();
        setIsOpened(false);
    }

    const closeAction = {
        text: closeText,
        onClick: closeModal,
    }

    const [isOpened, setIsOpened] = useState(opened);
    const ModalComponent = <Modal title={title} description={description} closeAction={closeAction} additionalAction={additionalAction} />

    return {
        Modal: isOpened ? ModalComponent : null,
        openModal,
    };
}