import { Move } from 'chess.js';
import { type Props } from 'chessboardjsx';
import { useReducer, Reducer } from 'react';
import { squareStyling } from 'utils/chess.utils';

import {
    type ChessActions,
    type MovePieceAction,
    type HighlightSquareAction,
    type SquareClickAction,
    type SquareClickPayloadWithoutHistory,
    type SquareClickPayloadWithHistory,
    type ApplyTimerConfigurationAction,
    type ChangeTimerAction,
    type RollbackAction,
} from './Chess.actions';

export type Timer = {
    w: number;
    b: number;
};

export type HistoryMove = {
    fen: string;
    move: string | Move | null;
    timer: Timer;
};

export interface ChessState {
    fen: string;
    square: string;
    pieceSquare: string;
    history: HistoryMove[];
    squareStyles: Props['squareStyles'];
    initialTime: number;
    timer: Timer;
    isRollback: boolean;
}

const initialState: ChessState = {
    fen: 'start',
    square: '',
    pieceSquare: '',
    history: [{ fen: 'start', move: null, timer: { b: 0, w: 0 } }],
    squareStyles: {},
    initialTime: 0,
    timer: {
        w: 0,
        b: 0,
    },
    isRollback: false,
};

const reducer: Reducer<ChessState, ChessActions> = (state, action) => {
    switch (action.type) {
        case 'MOVE_PIECE': {
            if (state.history.length === 1) {
                return {
                    ...state,
                    fen: action.payload.fen,
                    history: [
                        {
                            fen: 'start',
                            move: null,
                            timer: {
                                b: state.initialTime,
                                w: state.initialTime,
                            },
                        },
                        action.payload.lastHistoryObject,
                    ],
                    squareStyles: squareStyling(
                        state.pieceSquare,
                        state.history
                    ),
                    isRollback: false,
                };
            }

            return {
                ...state,
                fen: action.payload.fen,
                history: [...state.history, action.payload.lastHistoryObject],
                squareStyles: squareStyling(state.pieceSquare, state.history),
                isRollback: false,
            };
        }
        case 'HIGH_LIGHT_SQUARE': {
            const { sourceSquare, squaresToHighLight } = action.payload;
            const currentAffectedSquares = [
                sourceSquare,
                ...squaresToHighLight,
            ];
            const squareStyle = squareStyling(state.pieceSquare, state.history);

            for (const square of currentAffectedSquares) {
                if (Object.hasOwn(squareStyle, square)) {
                    delete squareStyle[square];
                }
            }

            const highlightStyles = currentAffectedSquares.reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue]: {
                        background:
                            'radial-gradient(circle, #fffc00 36%, transparent 40%)',
                        borderRadius: '50%',
                        zIndex: '2',
                    },
                    ...squareStyle,
                }),
                {}
            );
            return {
                ...state,
                squareStyles: { ...state.squareStyles, ...highlightStyles },
            };
        }
        case 'REMOVE_HIGH_LIGHT_SQUARE': {
            return {
                ...state,
                squareStyles: squareStyling(state.pieceSquare, state.history),
            };
        }
        case 'SQUARE_CLICK': {
            if (Object.hasOwn(action.payload, 'square')) {
                const payload =
                    action.payload as SquareClickPayloadWithoutHistory;
                return {
                    ...state,
                    squareStyles: squareStyling(payload.square, state.history),
                    pieceSquare: payload.square,
                };
            }

            const payload = action.payload as SquareClickPayloadWithHistory;
            return {
                ...state,
                fen: payload.fen,
                history: [...state.history, payload.lastHistoryObject],
                pieceSquare: '',
            };
        }
        case 'APPLY_TIMER_CONFIGURATION_ACTION': {
            return {
                ...state,
                initialTime: action.payload.timer,
                timer: {
                    b: action.payload.timer,
                    w: action.payload.timer,
                },
            };
        }
        case 'DECREASE_TIMER_ACTION': {
            return {
                ...state,
                timer: {
                    ...state.timer,
                    [action.payload.color]:
                        state.timer[action.payload.color] - 1,
                },
            };
        }
        case 'ROLLBACK_ACTION': {
            return {
                ...state,
                fen: action.payload.fen,
                history: action.payload.history,
                timer: action.payload.timer,
                squareStyles: squareStyling(
                    state.pieceSquare,
                    action.payload.history
                ),
                isRollback: true,
            };
        }
        default: {
            return state;
        }
    }
};

type ChessReducerHook = [
    ChessState,
    {
        movePiece: (payload: MovePieceAction['payload']) => void;
        highlightSquare: (payload: HighlightSquareAction['payload']) => void;
        removeHighlightSquare: () => void;
        squareClick: (payload: SquareClickAction['payload']) => void;
        configTimer: (
            payload: ApplyTimerConfigurationAction['payload']
        ) => void;
        decreaseTimer: (payload: ChangeTimerAction['payload']) => void;
        rollback: (payload: RollbackAction['payload']) => void;
    }
];

export const useChessReducer = (): ChessReducerHook => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const movePiece = (payload: MovePieceAction['payload']) =>
        dispatch({ type: 'MOVE_PIECE', payload });

    const highlightSquare = (payload: HighlightSquareAction['payload']) =>
        dispatch({ type: 'HIGH_LIGHT_SQUARE', payload });

    const removeHighlightSquare = () =>
        dispatch({ type: 'REMOVE_HIGH_LIGHT_SQUARE' });

    const squareClick = (payload: SquareClickAction['payload']) =>
        dispatch({ type: 'SQUARE_CLICK', payload });

    const configTimer = (payload: ApplyTimerConfigurationAction['payload']) =>
        dispatch({ type: 'APPLY_TIMER_CONFIGURATION_ACTION', payload });

    const decreaseTimer = (payload: ChangeTimerAction['payload']) =>
        dispatch({ type: 'DECREASE_TIMER_ACTION', payload });

    const rollback = (payload: RollbackAction['payload']) =>
        dispatch({ type: 'ROLLBACK_ACTION', payload });

    return [
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
    ];
};
