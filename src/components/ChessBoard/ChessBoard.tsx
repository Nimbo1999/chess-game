import Chessboard from 'chessboardjsx';
import { useChess } from 'contexts';

const ChessBoard: React.FC = () => {
    const { onDrop } = useChess();

    return (
        <Chessboard
            id="chestboard"
            position="start"
            boardStyle={{
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)',
            }}
            onDrop={onDrop}
        />
    );
};

export default ChessBoard;
