import { ChessProvider } from 'contexts';
import { ChessBoard, GameHistory, CurrentRoundInfo } from 'components';

import styles from './App.module.scss';

function App() {
    return (
        <div className={styles['container']}>
            <div className={styles['container__row']}>
                <ChessProvider>
                    <GameHistory />
                    <ChessBoard />
                    <CurrentRoundInfo />
                </ChessProvider>
            </div>
        </div>
    );
}

export default App;
