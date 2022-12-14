import Chessboard from 'chessboardjsx';
import { useChess } from 'contexts';
import { useInnerWidth } from 'hooks/useInnerWidth';

import styles from './ChessBoard.module.scss';

const ChessBoard: React.FC = () => {
    const innerWidth = useInnerWidth();

    const {
        onDrop,
        onMouseOverSquare,
        onMouseOutSquare,
        onSquareClick,
        getMetaData,
        position,
        squareStyles,
        inspectRound,
        history,
        whitesTimer,
        blacksTimer,
    } = useChess();

    const isGameOver =
        whitesTimer === 0 || blacksTimer === 0 || getMetaData().isGameOver;

    return (
        <div className={styles.container}>
            <Chessboard
                id="chestboard"
                position={
                    inspectRound !== null
                        ? history.at(inspectRound)?.fen
                        : position
                }
                width={innerWidth > 560 ? 560 : innerWidth - 3 * 16}
                squareStyles={isGameOver ? undefined : squareStyles}
                boardStyle={{
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
                }}
                onDrop={isGameOver ? undefined : onDrop}
                onMouseOverSquare={isGameOver ? undefined : onMouseOverSquare}
                onMouseOutSquare={isGameOver ? undefined : onMouseOutSquare}
                onSquareClick={isGameOver ? undefined : onSquareClick}
            />
        </div>
    );
};

export default ChessBoard;
