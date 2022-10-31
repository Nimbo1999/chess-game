import { createContext, useContext, useRef } from 'react';
import { Props } from 'chessboardjsx';
import { Chess, Square } from 'chess.js';

import { useChessReducer, ChessState } from 'reducers';
import { isValidMove } from 'utils/chess.utils';

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
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            /** @todo Verify if there is a ease way of multichoice for user. */
            promotion: 'q',
        });

        console.log({ game });

        if (isValidMove(move)) {
            movePiece({
                fen: game.fen(),
                history: game.history({ verbose: true }),
            });
        }
    };

    const onMouseOverSquare = (square: Square) => {
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

    const onMouseOutSquare = removeHighlightSquare;

    const onSquareClick = (square: Square) => {
        squareClick({ square });

        const move = game.move({
            from: state.pieceSquare,
            to: square,
            promotion: 'q',
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
