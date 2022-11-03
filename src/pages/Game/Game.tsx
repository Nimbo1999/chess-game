import { ChessBoard, GameHistory, CurrentRoundInfo } from 'components';
import { ROUTE_CONSTANTS } from 'constants/Route';
import { useChess } from 'contexts';
import { Navigate } from 'react-router-dom';

import styles from './Game.module.scss';

const Game: React.FC = () => {
    const { blacksTimer, whitesTimer } = useChess();

    if (blacksTimer === 0 && whitesTimer === 0)
        return <Navigate to={ROUTE_CONSTANTS.HOME_PAGE} />;

    return (
        <div className={styles['container']}>
            <div className={styles['container__row']}>
                <GameHistory />
                <ChessBoard />
                <CurrentRoundInfo />
            </div>
        </div>
    );
};

export default Game;
