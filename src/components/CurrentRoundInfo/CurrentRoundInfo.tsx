import { useEffect, useState } from 'react';
import { Move } from 'chess.js';

import { useChess, type ChessMetaData } from 'contexts';
import { chessMetadataText } from 'utils/text.utils';

type ChessMetaDataKey = keyof ChessMetaData;

const CurrentRoundInfo: React.FC = () => {
    const [metaData, setMetaData] = useState<ChessMetaData>({
        isCheck: false,
        isCheckmate: false,
        isDraw: false,
        isStalemate: false,
    });
    const { history, getMetaData } = useChess();

    const lastMovement = history.at(-1);
    const getRoundText = (): string => {
        if (!lastMovement || (lastMovement as Move).color === 'b')
            return "White's turn";
        return "Black's turn";
    };

    useEffect(() => {
        const runEffect = () => setMetaData(getMetaData());
        runEffect();
    }, [history]);

    return (
        <div>
            <h3>Round {history.length}</h3>
            <p>{getRoundText()}</p>
            {Object.keys(metaData).map((key) =>
                metaData[key as ChessMetaDataKey] ? (
                    <p key={key}>
                        {chessMetadataText[key as ChessMetaDataKey]}
                    </p>
                ) : null
            )}
        </div>
    );
};

export default CurrentRoundInfo;
