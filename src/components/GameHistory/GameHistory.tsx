import { Move } from 'chess.js';
import { useChess } from 'contexts';
import styles from './GameHistory.module.scss';

const GameHistory: React.FC = () => {
    const { history } = useChess();

    return (
        <div className={styles.container}>
            <h3>History</h3>

            <ul>
                {history.map((move, i) => {
                    const movement: Move = move as Move;
                    return (
                        <li key={movement.color + movement.san}>
                            Round {i} - ({movement.color + '-' + movement.san})
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GameHistory;
