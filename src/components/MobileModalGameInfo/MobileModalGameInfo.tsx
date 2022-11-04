import { Move } from 'chess.js';
import { ChessMetaData, useChess } from 'contexts';
import { useEffect, useMemo, useState } from 'react';
import ReactDom from 'react-dom';
import { chessMetadataText } from 'utils/text.utils';
import { Button, ArrowLeft, ArrowRight, Timer } from 'components';

import styles from './MobileModalGameInfo.module.scss';

type ChessMetaDataKey = keyof ChessMetaData;

const MobileModalGameInfo: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [metaData, setMetaData] = useState<ChessMetaData>({
        isCheck: false,
        isCheckmate: false,
        isDraw: false,
        isStalemate: false,
        isGameOver: false,
    });

    const {
        inspectRound,
        history,
        whitesTimer,
        blacksTimer,
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

    const classNames = useMemo(() => {
        const classes = [styles['modal']];
        if (expanded) classes.push(styles['active']);
        return classes.join(' ');
    }, [expanded]);

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

    return ReactDom.createPortal(
        <div className={classNames}>
            <h3 className={styles['modal__title']}>
                Round {history.length} -{' '}
                {isActive('w') ? "White's turn" : "Black's turn"}
            </h3>

            <div className={styles['modal__content']}>
                <section className={styles['modal__panel']}>
                    <h3>White&apos;s</h3>

                    <Timer
                        timer={
                            inspectRound !== null
                                ? history.at(inspectRound)!.timer.w
                                : whitesTimer
                        }
                        isActive={isActive('w')}
                    />

                    {whitesTimer === 0 && (
                        <p>{chessMetadataText['isOutOfTime']}</p>
                    )}
                    {isActive('w') && renderMetaData}
                </section>

                <section className={styles['modal__panel']}>
                    <h3>Black&apos;s</h3>

                    <Timer
                        timer={
                            inspectRound !== null
                                ? history.at(inspectRound)!.timer.b
                                : blacksTimer
                        }
                        isActive={isActive('b')}
                    />

                    {blacksTimer === 0 && (
                        <p>{chessMetadataText['isOutOfTime']}</p>
                    )}
                    {isActive('b') && renderMetaData}
                </section>
            </div>

            <footer className={styles['modal__panel-footer']}>
                <Button
                    btnType="primary"
                    className={styles['modal__panel-button']}
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
                    className={styles['modal__panel-button']}
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
                    className={styles['modal__panel-button']}
                    onClick={onClickNewGame}
                >
                    New Game
                </Button>
            </footer>

            <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                className={styles['modal__expand-button']}
            >
                Expand Info
            </button>
        </div>,
        document.body
    );
};

export default MobileModalGameInfo;
