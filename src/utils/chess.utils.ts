import { Move } from 'chess.js';
import { type HistoryMove } from 'reducers';

export const squareStyling = (
    pieceSquare: string,
    history: HistoryMove[],
    backgroundColor = 'rgba(255, 255, 0, 0.4)'
) => {
    const lastMove = history.at(-1);
    if (!lastMove) return { [pieceSquare]: { backgroundColor } };
    if (!lastMove.move) return { [pieceSquare]: { backgroundColor } };

    if (typeof lastMove.move === 'string')
        return { [pieceSquare]: { backgroundColor } };

    return {
        [pieceSquare]: { backgroundColor },
        [lastMove.move.from]: { backgroundColor },
        [lastMove.move.to]: { backgroundColor },
    };
};

export const isValidMove = (move?: Move | null): boolean =>
    move !== null && move !== undefined;

export const isAPromotionMovement = (move?: Move): boolean =>
    move !== undefined && !!move.promotion;
