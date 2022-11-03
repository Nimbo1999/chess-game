import { useEffect, useState } from 'react';
import { Move } from 'chess.js';

import { useChess, type ChessMetaData } from 'contexts';
import { Timer, Button } from 'components';
import { chessMetadataText } from 'utils/text.utils';
import styles from './CurrentRoundInfo.module.scss';

type ChessMetaDataKey = keyof ChessMetaData;

const CurrentRoundInfo: React.FC = () => {
    const [metaData, setMetaData] = useState<ChessMetaData>({
        isCheck: false,
        isCheckmate: false,
        isDraw: false,
        isStalemate: false,
    });
    const { history, getMetaData, blacksTimer, whitesTimer } = useChess();

    const lastMovement = history.at(-1);

    const isActive = (color: 'w' | 'b'): boolean => {
        if (!lastMovement) return color === 'w';
        if (!lastMovement.move) return color === 'w';
        if ((lastMovement.move as Move).color === 'b') return color === 'w';
        return color === 'b';
    };

    const renderMetaData = Object.keys(metaData).map((key) =>
        metaData[key as ChessMetaDataKey] ? (
            <p key={key}>{chessMetadataText[key as ChessMetaDataKey]}</p>
        ) : null
    );

    useEffect(() => {
        const runEffect = () => setMetaData(getMetaData());
        runEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history]);

    return (
        <div className={styles.container}>
            <h3 className={styles['game-title']}>Round {history.length}</h3>

            <section className={styles['panel']}>
                <h4>White&apos;s</h4>

                <Timer timer={whitesTimer} isActive={isActive('w')} />

                {isActive('w') && renderMetaData}
            </section>

            <section className={styles['panel']}>
                <h4>Black&apos;s</h4>

                <Timer timer={blacksTimer} isActive={isActive('b')} />

                {isActive('b') && renderMetaData}
            </section>

            <section className={styles['panel']}>
                <h4>Match status</h4>

                <Button>Undu</Button>
            </section>
        </div>
    );
};

export default CurrentRoundInfo;
