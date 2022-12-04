

import styles from './appearingLevel.module.sass';

export const AppearingLevel = () => {
    const { user, updateUser } = useContext(AuthContext);

    const canRef = useRef();
    const navigate = useNavigate();
    const { dragNDropRef, state } = useDragNDrop();

    const [rating, setRating] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timerData, setTimerData] = useState();
    const [drawingData, setDrawingData] = useState();

    useEffect(() => {
        updateData();
    }, []);

    useEffect(() => {
        if (state === EDragNDropStatus.INACTIVE && figureInCan()) {
            setRating((prev) => prev += 200);
            updateData();
        }
    }, [state]);

    useEffect(() => {
        if (currentIndex === OBJECTS_AMOUNT) {
            GameService.unlockLevel(user, 'appearing');
            const userWithRating = GameService.compliteLevel(user, 'moving', rating);
            const updatedUser = AuthService.update(userWithRating);
            updateUser(updatedUser);
            navigate('/rating');
        }
    }, [currentIndex]);

    const figureInCan = () => {
        const canPos = canRef.current?.getBoundingClientRect();
        const elPos = dragNDropRef.current?.getBoundingClientRect();

        if (!canPos || !elPos) return false;

        return (
            elPos.left > canPos.left &&
            elPos.right < canPos.right &&
            elPos.bottom > canPos.top + 50
        );
    }

    const updateData = () => {
        const newTimerData = generateTimerData();
        const newDrawingData = generateDrawingData();

        setTimerData({ ...newTimerData });
        setDrawingData({ ...newDrawingData });
        setCurrentIndex((val) => val += 1);
    }

    const handleTimerEnd = (index = 0) => {
        updateData()
    }

    if (!timerData || !drawingData) return;

    return (
        <div className={styles.wrapper}>
            <LevelHeader rating={rating} remaining={OBJECTS_AMOUNT - currentIndex} />
            <div
                className={styles.object}
                ref={dragNDropRef}
                style={{
                    width: `${drawingData.size}px`,
                    height: `${drawingData.size}px`,
                    top: `${drawingData.y}px`,
                    left: `${drawingData.x}px`
                }}
            >
                <Timer
                    id={`timer_${currentIndex}`}
                    className={styles.timer}
                    {...timerData}
                    onEnding={handleTimerEnd}
                />
                <Drawing
                    id={`drawing_${currentIndex}`}
                    className={styles.drawing}
                    size={drawingData.size}
                    vertexesAmount={drawingData.vertexesAmount}
                />
            </div>
            <div className={styles.can__background}></div>
            <div className={styles.can__foreground} ref={canRef}></div>
        </div >
    )
}
