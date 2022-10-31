import { Move } from 'chess.js';

export const squareStyling = (
    pieceSquare: string,
    history: Move[],
    backgroundColor = 'rgba(255, 255, 0, 0.4)'
) => {
    const lastElement = history.at(-1);

    if (!lastElement) {
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
