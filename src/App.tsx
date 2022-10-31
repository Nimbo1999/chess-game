import { ChessBoard } from 'components';
import { ChessProvider } from 'contexts';

import styles from './App.module.scss';

function App() {
    return (
        <div className={styles['container']}>
            <ChessProvider>
                <ChessBoard />
            </ChessProvider>
        </div>
    );
}

export default App;
