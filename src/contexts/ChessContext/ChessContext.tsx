import { createContext, useContext, useRef } from 'react';
import { Props } from 'chessboardjsx';
import { Chess, Move } from 'chess.js';

import { useChessReducer, ChessState } from 'reducers';
import { isValidMove, isAPromotionMovement } from 'utils/chess.utils';

interface ChessContextProperties {
    onDrop: Props['onDrop'];
    onMouseOverSquare: Props['onMouseOverSquare'];
    onMouseOutSquare: Props['onMouseOutSquare'];
    onSquareClick: Props['onSquareClick'];
    position: ChessState['fen'];
    squareStyles: ChessState['squareStyles'];
    history: ChessState['history'];
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
        { movePiece, highlightSquare, removeHighlightSquare, squareClick },
    ] = useChessReducer();

    const onDrop: Props['onDrop'] = ({ sourceSquare, targetSquare }) => {
        const [movement] = (
            game.moves({
                square: sourceSquare,
                verbose: true,
            }) as Move[]
        ).filter((move: Move) => move.to === targetSquare);

        if (!isValidMove(movement)) return;
        if (isAPromotionMovement(movement)) {
            game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
        } else {
            game.move({ from: sourceSquare, to: targetSquare });
        }

        movePiece({
            fen: game.fen(),
            history: game.history({ verbose: true }),
        });
    };

    const onMouseOverSquare: Props['onMouseOverSquare'] = (square) => {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) return;
        const squaresToHighLight = moves.map((move) =>
            typeof move !== 'string' ? move.to : ''
        );
        highlightSquare({ sourceSquare: square, squaresToHighLight });
    };

    const onMouseOutSquare: Props['onMouseOutSquare'] = removeHighlightSquare;

    const onSquareClick: Props['onSquareClick'] = (square) => {
        squareClick({ square });

        const move = game.move({
            from: state.pieceSquare,
            to: square,
            // promotion: 'q',
        });

        if (isValidMove(move)) {
            squareClick({
                fen: game.fen(),
                history: game.history({ verbose: true }),
            });
        }
    };

    return (
        <ChessContext.Provider
            value={{
                onDrop,
                onMouseOverSquare,
                onMouseOutSquare,
                onSquareClick,
                position: state.fen,
                history: state.history,
                squareStyles: state.squareStyles,
            }}
        >
            {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);
