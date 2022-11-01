import { Move } from 'chess.js';
import { useChess } from 'contexts';
import { useEffect, useRef } from 'react';
import styles from './GameHistory.module.scss';

const GameHistory: React.FC = () => {
    const ulref = useRef<HTMLUListElement>(null);
    const { history } = useChess();

    useEffect(() => {
        const runEffect = () => {
            if (!ulref.current) return;
            const ulChildren = ulref.current.children;
            const lastElement = ulChildren.item(ulChildren.length - 1);
            if (lastElement)
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
                {history.map((move, i) => {
                    const movement: Move = move as Move;
                    return (
                        <li key={movement.color + movement.san + i}>
                            Round {i} - ({movement.color + '-' + movement.san})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GameHistory;
