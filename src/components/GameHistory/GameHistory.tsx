import { Move } from 'chess.js';
import { useEffect, useRef } from 'react';
import { useChess } from 'contexts';
import styles from './GameHistory.module.scss';

const GameHistory: React.FC = () => {
    const ulref = useRef<HTMLUListElement>(null);
    const { history, onRollback } = useChess();

    useEffect(() => {
        const runEffect = () => {
            if (!ulref.current) return;
            const ulChildren = ulref.current.children;
            const lastElement = ulChildren.item(ulChildren.length - 1);
            if (
                lastElement &&
                !!ulref.current.scrollTo &&
                typeof ulref.current.scrollTo === 'function'
            )
                ulref.current.scrollTo({
                    behavior: 'smooth',
                    top: (lastElement as HTMLElement).offsetTop,
                });
        };
        runEffect();
    }, [history]);

    return (
        <div className={styles.container}>
            <h3>History</h3>

            <ul className={styles['container__ul']} ref={ulref}>
                {history.map((historyMove, i) => {
                    const movement: Move | null =
                        historyMove.move as Move | null;
                    const key = movement
                        ? movement.color + movement.san + i
                        : 'initial-movement';
                    const label = movement
                        ? movement.color + '-' + movement.san
                        : 'Start point';
                    return (
                        <li
                            key={key}
                            className={styles['container__list-item']}
                        >
                            {i} - ({label})
                            {history.length - 1 !== i && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onRollback(
                                            historyMove.fen,
                                            historyMove.timer,
                                            i
                                        );
                                    }}
                                    className={styles['container__rollback']}
                                >
                                    Rollback
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GameHistory;
