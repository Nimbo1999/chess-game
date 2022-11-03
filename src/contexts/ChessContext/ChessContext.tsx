import {
    createContext,
    useContext,
    useRef,
    useCallback,
    useEffect,
} from 'react';
import { Props } from 'chessboardjsx';
import { Chess, Move, Square } from 'chess.js';

import { useChessReducer, ChessState, HistoryMove } from 'reducers';
import { isValidMove, isAPromotionMovement } from 'utils/chess.utils';
import { Timer } from 'reducers/ChessReducer/Chess.reducer';

export type ChessMetaData = {
    isCheck: boolean;
    isCheckmate: boolean;
    isStalemate: boolean;
    isDraw: boolean;
};

interface ChessContextProperties {
    onDrop: Props['onDrop'];
    onMouseOverSquare: Props['onMouseOverSquare'];
    onMouseOutSquare: Props['onMouseOutSquare'];
    onSquareClick: Props['onSquareClick'];
    getMetaData: () => ChessMetaData;
    onSetupTimer: (timer: number) => void;
    onRollback: (fen: string, timer: Timer, index: number) => void;
    position: ChessState['fen'];
    squareStyles: ChessState['squareStyles'];
    history: ChessState['history'];
    blacksTimer: number;
    whitesTimer: number;
    isRollBack: boolean;
}

const ChessContext = createContext<ChessContextProperties>(
    {} as ChessContextProperties
);

interface ChessProvider {
    children: React.ReactNode;
}

export const ChessProvider: React.FC<ChessProvider> = ({ children }) => {
    const { current: game } = useRef(new Chess());
    const [
        state,
        {
            movePiece,
            highlightSquare,
            removeHighlightSquare,
            squareClick,
            configTimer,
            decreaseTimer,
            rollback,
        },
    ] = useChessReducer();

    const onDrop = useCallback(
        ({
            sourceSquare,
            targetSquare,
        }: {
            sourceSquare: Square;
            targetSquare: Square;
        }) => {
            const [movement] = (
                game.moves({
                    square: sourceSquare,
                    verbose: true,
                }) as Move[]
            ).filter((move: Move) => move.to === targetSquare);

            if (!isValidMove(movement)) return;
            if (isAPromotionMovement(movement)) {
                game.move({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: 'q',
                });
            } else {
                game.move({ from: sourceSquare, to: targetSquare });
            }

            const fen = game.fen();

            movePiece({
                fen,
                lastHistoryObject: {
                    fen,
                    move: game.history({ verbose: true }).at(-1) as Move,
                    timer: state.timer,
                },
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [movePiece]
    );

    const onMouseOverSquare = useCallback(
        (square: Square) => {
            const moves = game.moves({
                square,
                verbose: true,
            });
            if (moves.length === 0) return;
            const squaresToHighLight = moves.map((move) =>
                typeof move !== 'string' ? move.to : ''
            );
            highlightSquare({ sourceSquare: square, squaresToHighLight });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [highlightSquare]
    );

    const onMouseOutSquare: Props['onMouseOutSquare'] = useCallback(
        removeHighlightSquare,
        [removeHighlightSquare]
    );

    const getMetaData = (): ChessMetaData => ({
        isCheck: game.isCheck(),
        isCheckmate: game.isCheckmate(),
        isStalemate: game.isStalemate(),
        isDraw: game.isDraw(),
    });

    const onSquareClick: Props['onSquareClick'] = (square) => {
        squareClick({ square });

        const move = game.move({
            from: state.pieceSquare,
            to: square,
        });

        const fen = game.fen();

        if (isValidMove(move)) {
            squareClick({
                fen,
                lastHistoryObject: {
                    fen,
                    move: game.history({ verbose: true }).at(-1) as Move,
                    timer: state.timer,
                },
            });
        }
    };

    const onSetupTimer = (timer: number) => configTimer({ timer });

    const onRollback = (fen: string, timer: Timer, index: number) => {
        rollback({
            fen,
            history: state.history.slice(0, index + 1),
            timer,
        });
        if (fen === 'start') {
            return game.reset();
        }
        game.load(fen);
    };

    useEffect(() => {
        const wTimeout = setTimeout(() => decreaseTimer({ color: 'w' }), 1000);
        const bTimeout = setTimeout(() => decreaseTimer({ color: 'b' }), 1000);

        const runEffect = () => {
            if (state.timer.b === 0 || state.timer.w === 0) {
                clearTimeout(bTimeout);
                return clearTimeout(wTimeout);
            }

            const lastMove = state.history.at(-1) as HistoryMove;

            if (
                !!lastMove &&
                lastMove.move &&
                (lastMove.move as Move).color === 'w'
            )
                return clearTimeout(wTimeout);

            clearTimeout(bTimeout);
        };
        runEffect();

        return () => {
            clearTimeout(bTimeout);
            clearTimeout(wTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.timer.b, state.timer.w, state.history.length]);

    return (
        <ChessContext.Provider
            value={{
                onDrop,
                onMouseOverSquare,
                onMouseOutSquare,
                onSquareClick,
                getMetaData,
                onSetupTimer,
                onRollback,
                position: state.fen,
                history: state.history,
                squareStyles: state.squareStyles,
                blacksTimer: state.timer.b,
                whitesTimer: state.timer.w,
                /** @todo Remove if not using */
                isRollBack: state.isRollback,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);
