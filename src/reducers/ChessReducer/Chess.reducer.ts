import { Move } from 'chess.js';
import { type Props } from 'chessboardjsx';
import { useReducer, Reducer } from 'react';
import { squareStyling } from 'utils/chess.utils';

import {
    type ChessActions,
    type MovePieceAction,
    type HighlightSquareAction,
} from './Chess.actions';

export interface ChessState {
    fen: string;
    square: string;
    pieceSquare: string;
    history: (string | Move)[];
    squareStyles: Props['squareStyles'];
}

const initialState: ChessState = {
    fen: 'start',
    square: '',
    pieceSquare: '',
    history: [],
    squareStyles: {},
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
            const highlightStyles = [
                sourceSquare,
                ...squaresToHighLight,
            ].reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue]: {
                        background:
                            'radial-gradient(circle, #fffc00 36%, transparent 40%)',
                        borderRadius: '50%',
                    },
                    ...squareStyling(state.pieceSquare, state.history),
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

    return [state, { movePiece, highlightSquare, removeHighlightSquare }];
};
