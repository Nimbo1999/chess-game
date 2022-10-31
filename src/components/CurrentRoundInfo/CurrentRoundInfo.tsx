import { Move } from 'chess.js';
import { useChess } from 'contexts';

const CurrentRoundInfo: React.FC = () => {
    const { history } = useChess();

    const lastMovement = history.at(-1);
    const getRoundText = (): string => {
        if (!lastMovement) return "White's turn";
        if ((lastMovement as Move).color === 'w') return "Black's turn";
        return "White's turn";
    };

    return (
        <div>
            <h3>Round 0</h3>
            <p>{getRoundText()}</p>
        </div>
    );
};

export default CurrentRoundInfo;
