import Chessboard from 'chessboardjsx';
import { useChess } from 'contexts';

const ChessBoard: React.FC = () => {
    const { onDrop, onMouseOverSquare, position, squareStyles } = useChess();

    return (
        <Chessboard
            id="chestboard"
            position={position}
            squareStyles={squareStyles}
            boardStyle={{
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
            }}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
        />
    );
};

export default ChessBoard;
