import {
    ChessBoard,
    GameHistory,
    CurrentRoundInfo,
    MobileModalGameInfo,
} from 'components';
import { ROUTE_CONSTANTS } from 'constants/Route';
import { useChess } from 'contexts';
import { useInnerWidth } from 'hooks/useInnerWidth';
import { Navigate } from 'react-router-dom';

import styles from './Game.module.scss';

const Game: React.FC = () => {
    const innerWidth = useInnerWidth();
    const { blacksTimer, whitesTimer } = useChess();

    if (blacksTimer === 0 && whitesTimer === 0)
        return <Navigate to={ROUTE_CONSTANTS.HOME_PAGE} />;

    return (
        <div className={styles['container']}>
            {innerWidth < 1445 && <MobileModalGameInfo />}

            <div className={styles['container__row']}>
                {innerWidth > 1444 && <GameHistory />}
                <ChessBoard />
                {innerWidth > 1444 && <CurrentRoundInfo />}
            </div>
        </div>
    );
};

export default Game;
