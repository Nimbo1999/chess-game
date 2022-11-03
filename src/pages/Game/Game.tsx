import { ChessProvider } from 'contexts';
import { ChessBoard, GameHistory, CurrentRoundInfo } from 'components';

import styles from './Game.module.scss';

const Game: React.FC = () => (
    <div className={styles['container']}>
        <div className={styles['container__row']}>
            <GameHistory />
            <ChessBoard />
            <CurrentRoundInfo />
        </div>
    </div>
);

export default Game;
