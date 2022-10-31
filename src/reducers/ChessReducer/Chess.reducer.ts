import { Move } from 'chess.js';
import { useReducer, Reducer } from 'react';

export interface ChessState {
    fen: string;
    square: string;
    pieceSquare: string;
    history: Move[];
}

interface DummyAction {
    type: 'ADD';
    payload: {
        count: number;
    };
}

const initialState: ChessState = {
    fen: 'start',
    square: '',
    pieceSquare: '',
    history: [],
};

const reducer: Reducer<ChessState, DummyAction> = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                fen: '',
            };
        default:
            return state;
    }
};

type ChessReducerHook = [
    ChessState,
    { movePiece: (payload: DummyAction['payload']) => void }
];

export const useChessReducer = (): ChessReducerHook => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const movePiece = (payload: DummyAction['payload']) =>
        dispatch({ type: 'ADD', payload });

    return [state, { movePiece }];
};
