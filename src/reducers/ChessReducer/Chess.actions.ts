import { Square } from 'chess.js';
import { HistoryMove, Timer } from './Chess.reducer';

export type MovePieceAction = {
    type: 'MOVE_PIECE';
    payload: {
        fen: string;
        lastHistoryObject: HistoryMove;
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
    lastHistoryObject: HistoryMove;
};

export type SquareClickPayloadWithoutHistory = {
    square: Square;
};

export type SquareClickAction = {
    type: 'SQUARE_CLICK';
    payload: SquareClickPayloadWithHistory | SquareClickPayloadWithoutHistory;
};

export type ApplyTimerConfigurationAction = {
    type: 'APPLY_TIMER_CONFIGURATION_ACTION';
    payload: {
        timer: number;
    };
};

export type ChangeTimerAction = {
    type: 'DECREASE_TIMER_ACTION';
    payload: {
        color: 'w' | 'b';
    };
};

export type RollbackAction = {
    type: 'ROLLBACK_ACTION';
    payload: {
        fen: string;
        history: HistoryMove[];
        timer: Timer;
    };
};

export type ChessActions =
    | MovePieceAction
    | HighlightSquareAction
    | RemoveHighlightSquareAction
    | SquareClickAction
    | ApplyTimerConfigurationAction
    | ChangeTimerAction
    | RollbackAction;
