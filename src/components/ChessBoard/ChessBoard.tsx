import Chessboard from 'chessboardjsx';
import { useChess } from 'contexts';

import styles from './ChessBoard.module.scss';

const ChessBoard: React.FC = () => {
    const {
        onDrop,
        onMouseOverSquare,
        onMouseOutSquare,
        onSquareClick,
        position,
        squareStyles,
    } = useChess();

    return (
        <div className={styles.container}>
            <Chessboard
                id="chestboard"
                position={position}
                squareStyles={squareStyles}
                boardStyle={{
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                }}
                onDrop={onDrop}
                onMouseOverSquare={onMouseOverSquare}
                onMouseOutSquare={onMouseOutSquare}
                onSquareClick={onSquareClick}
            />
        </div>
    );
};

export default ChessBoard;
