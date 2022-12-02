import { useEffect, createRef, useState } from "react"


export const EDragNDropStatus = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
}

export const useDragNDrop = (onDrop,) => {
    const ref = createRef();

    const [coordinates, setCoordinates] = useState({});
    const [state, setState] = useState(EDragNDropStatus.INACTIVE);

    useEffect(() => {
        const { current } = ref;
        if (!current) return;

        current.addEventListener('mousedown', handleDrag);
        return () => {
            current.removeEventListener('mousedown', handleDrag);
        };
    }, [ref]);

    useEffect(() => {
        const { current } = ref;
        if (!current) return;

        ref.current.style.left = `${coordinates.x}px`;
        ref.current.style.top = `${coordinates.y}px`;
    }, [coordinates.x, coordinates.y]);

    const handleMouseMove = (offset) => (e) => {
        setCoordinates({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleDrag = (e) => {
        const { current } = ref;
        const offset = {
            x: e.clientX - current.offsetLeft,
            y: e.clientY - current.offsetTop,
        };
        const handler = handleMouseMove(offset);

        setState(EDragNDropStatus.ACTIVE);
        document.addEventListener('mousemove', handler);
        document.addEventListener('mouseup', () => handleDrop(handler));
    };

    const handleDrop = (handler) => {
        onDrop && onDrop();
        setState(EDragNDropStatus.INACTIVE);
        document.removeEventListener('mousemove', handler);
    };

    return {
        dragNDropRef: ref,
        state,
    }
}