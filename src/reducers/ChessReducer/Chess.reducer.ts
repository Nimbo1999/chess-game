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
} from './Chess.actions';

type Timer = {
    w: number;
    b: number;
};

export interface ChessState {
    fen: string;
    square: string;
    pieceSquare: string;
    history: (string | Move)[];
    squareStyles: Props['squareStyles'];
    timer: Timer;
}

const initialState: ChessState = {
    fen: 'start',
    square: '',
    pieceSquare: '',
    history: [],
    squareStyles: {},
    timer: {
        w: 0,
        b: 0,
    },
};

const reducer: Reducer<ChessState, ChessActions> = (state, action) => {
    switch (action.type) {
        case 'MOVE_PIECE': {
            return {
                ...state,
                fen: action.payload.fen,
                history: action.payload.history,
                squareStyles: squareStyling(state.pieceSquare, state.history),
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
                history: payload.history,
                pieceSquare: '',
            };
        }
        case 'APPLY_TIMER_CONFIGURATION_ACTION': {
            return {
                ...state,
                timer: {
                    b: action.payload.timer,
                    w: action.payload.timer,
                },
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

    return [
        state,
        {
            movePiece,
            highlightSquare,
            removeHighlightSquare,
            squareClick,
            configTimer,
        },
    ];
};
