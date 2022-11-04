import { useEffect, useState } from 'react';
import { Move } from 'chess.js';

import { useChess, type ChessMetaData } from 'contexts';
import { Timer, Button, ArrowLeft, ArrowRight } from 'components';
import { chessMetadataText } from 'utils/text.utils';

import styles from './CurrentRoundInfo.module.scss';

type ChessMetaDataKey = keyof ChessMetaData;

const CurrentRoundInfo: React.FC = () => {
    const [metaData, setMetaData] = useState<ChessMetaData>({
        isCheck: false,
        isCheckmate: false,
        isDraw: false,
        isStalemate: false,
        isGameOver: false,
    });
    const {
        history,
        blacksTimer,
        whitesTimer,
        inspectRound,
        getMetaData,
        changeInspectValue,
        onClickNewGame,
    } = useChess();

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

    const onPressUndo = () => {
        if (inspectRound === 0) return;
        if (inspectRound !== null && inspectRound > 0) {
            return changeInspectValue(inspectRound - 1);
        }
        if (inspectRound === null) {
            changeInspectValue(history.length - 2);
        }
    };

    const onPressMoveFoward = () => {
        if (inspectRound !== null && inspectRound < history.length - 2) {
            return changeInspectValue(inspectRound + 1);
        }
        changeInspectValue(null);
    };

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

                <Timer
                    timer={
                        inspectRound !== null
                            ? history.at(inspectRound)!.timer.w
                            : whitesTimer
                    }
                    isActive={isActive('w')}
                />

                {whitesTimer === 0 && <p>{chessMetadataText['isOutOfTime']}</p>}
                {isActive('w') && renderMetaData}
            </section>

            <section className={styles['panel']}>
                <h4>Black&apos;s</h4>

                <Timer
                    timer={
                        inspectRound !== null
                            ? history.at(inspectRound)!.timer.b
                            : blacksTimer
                    }
                    isActive={isActive('b')}
                />

                {blacksTimer === 0 && <p>{chessMetadataText['isOutOfTime']}</p>}
                {isActive('b') && renderMetaData}
            </section>

            <section className={styles['panel']}>
                <h4>Match status</h4>

                <footer className={styles['panel__footer']}>
                    <Button
                        btnType="primary"
                        className={styles['panel__button']}
                        title="Undo movement"
                        onClick={onPressUndo}
                        disabled={
                            history.length < 2 ||
                            (inspectRound !== null && inspectRound < 1)
                        }
                    >
                        <ArrowLeft />
                    </Button>

                    <Button
                        btnType="primary"
                        className={styles['panel__button']}
                        title="Foward movement"
                        onClick={onPressMoveFoward}
                        disabled={
                            inspectRound === null ||
                            (inspectRound !== null &&
                                inspectRound === history.length - 1)
                        }
                    >
                        <ArrowRight />
                    </Button>

                    <Button
                        btnType="primary"
                        className={styles['panel__button']}
                        onClick={onClickNewGame}
                    >
                        New Game
                    </Button>
                </footer>
            </section>
        </div>
    );
};

export default CurrentRoundInfo;
