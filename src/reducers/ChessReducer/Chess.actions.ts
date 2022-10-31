import { Move, Square } from 'chess.js';

export type MovePieceAction = {
    type: 'MOVE_PIECE';
    payload: {
        fen: string;
        history: (string | Move)[];
    };
};

export type HighlightSquareAction = {
    type: 'HIGH_LIGHT_SQUARE';
    payload: {
        sourceSquare: string;
        squaresToHighLight: string[];
    };
};

export type RemoveHighlightSquareAction = {
    type: 'REMOVE_HIGH_LIGHT_SQUARE';
};

export type SquareClickPayloadWithHistory = {
    fen: string;
    history: (string | Move)[];
};

export type SquareClickPayloadWithoutHistory = {
    square: Square;
};

export type SquareClickAction = {
    type: 'SQUARE_CLICK';
    payload: SquareClickPayloadWithHistory | SquareClickPayloadWithoutHistory;
};

export type ChessActions =
    | MovePieceAction
    | HighlightSquareAction
    | RemoveHighlightSquareAction
    | SquareClickAction;
