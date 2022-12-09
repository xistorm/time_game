import { useCallback, useEffect, useRef, useState } from "react"


export const EDragNDropStatus = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
}

export const useDragNDrop = (onDrop, onMove) => {
    const offset = useRef();
    const [node, setNode] = useState();
    const [coordinates, setCoordinates] = useState({});
    const [state, setState] = useState(EDragNDropStatus.INACTIVE);

    useEffect(() => {
        if (!node) return;

        node.addEventListener('mousedown', handleDrag);
        return () => {
            node.removeEventListener('mousedown', handleDrag);
            handleDrop();
        };
    }, [node]);

    useEffect(() => {
        if (!node) return;

        node.style.left = `${coordinates.x}px`;
        node.style.top = `${coordinates.y}px`;
    }, [coordinates.x, coordinates.y]);

    const dragNDropRef = (node) => {
        setNode(node);
    }

    const handleMouseMove = useCallback((e) => {
        onMove && onMove();
        setCoordinates({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    }, [onMove]);

    const handleDrag = (e) => {
        offset.current = {
            x: e.clientX - node.offsetLeft,
            y: e.clientY - node.offsetTop,
        };

        setState(EDragNDropStatus.ACTIVE);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleDrop);
    };

    const handleDrop = () => {
        onDrop && onDrop();
        setState(EDragNDropStatus.INACTIVE);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleDrop);
    };

    return {
        dragNDropRef,
        handleDrop,
        node,
        state,
    }
}