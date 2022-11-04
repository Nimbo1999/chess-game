import { useCallback, useMemo } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
    timer: number;
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ timer, isActive }) => {
    const classNames = useMemo(() => {
        const classes = [styles.timer];
        if (isActive) classes.push(styles.active);
        return classes.join(' ');
    }, [isActive]);

    const formatToTimer = useCallback(
        (value: number) =>
            value < 10 ? `0${value}`.split('') : String(value).split(''),
        []
    );

    const minutes = useMemo(() => {
        const min = Math.floor(timer / 60);
        return formatToTimer(min);
    }, [timer, formatToTimer]);

    const seconds = useMemo(() => {
        const sec = Math.floor(timer % 60);
        return formatToTimer(sec);
    }, [timer, formatToTimer]);

    return (
        <div className={classNames} data-testid="timer">
            <span className={styles['timer__number']} data-testid="min0">
                {minutes[0]}
            </span>
            <span className={styles['timer__number']} data-testid="min1">
                {minutes[1]}
            </span>
            <span className={styles['timer__colon']} data-testid="colon">
                :
            </span>
            <span className={styles['timer__number']} data-testid="sec0">
                {seconds[0]}
            </span>
            <span className={styles['timer__number']} data-testid="sec1">
                {seconds[1]}
            </span>
        </div>
    );
};

export default Timer;
