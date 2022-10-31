import { Move } from 'chess.js';

export const squareStyling = (
    pieceSquare: string,
    history: (string | Move)[],
    backgroundColor = 'rgba(255, 255, 0, 0.4)'
) => {
    const lastElement = history.at(-1);

    if (!lastElement || typeof lastElement === 'string') {
        return {
            [pieceSquare]: { backgroundColor },
        };
    }

    return {
        [pieceSquare]: { backgroundColor },
        [lastElement.from]: { backgroundColor },
        [lastElement.to]: { backgroundColor },
    };
};

export const isValidMove = (move: Move | null) => move !== null;
