import { createContext, useContext, useRef, useCallback } from 'react';
import { Props } from 'chessboardjsx';
import { Chess, Move, Square } from 'chess.js';

import { useChessReducer, ChessState } from 'reducers';
import { isValidMove, isAPromotionMovement } from 'utils/chess.utils';

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
    position: ChessState['fen'];
    squareStyles: ChessState['squareStyles'];
    history: ChessState['history'];
    blacksTimer: number;
    whitesTimer: number;
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

            movePiece({
                fen: game.fen(),
                history: game.history({ verbose: true }),
            });
        },
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

        if (isValidMove(move)) {
            squareClick({
                fen: game.fen(),
                history: game.history({ verbose: true }),
            });
        }
    };

    const onSetupTimer = (timer: number) => configTimer({ timer });

    return (
        <ChessContext.Provider
            value={{
                onDrop,
                onMouseOverSquare,
                onMouseOutSquare,
                onSquareClick,
                getMetaData,
                onSetupTimer,
                position: state.fen,
                history: state.history,
                squareStyles: state.squareStyles,
                blacksTimer: state.timer.b,
                whitesTimer: state.timer.w,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);
