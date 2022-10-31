import { createContext, useContext } from 'react';
import { Props } from 'chessboardjsx';

import { useChessReducer } from 'reducers';

interface ChessContextProperties {
    onDrop: Props['onDrop'];
}

const ChessContext = createContext<ChessContextProperties>(
    {} as ChessContextProperties
);

interface ChessProvider {
    children: React.ReactNode;
}

export const ChessProvider: React.FC<ChessProvider> = ({ children }) => {
    const [state, { movePiece }] = useChessReducer();

    const onDrop: Props['onDrop'] = ({ sourceSquare, targetSquare, piece }) => {
        console.log({ sourceSquare, targetSquare, piece });
    };

    return (
        <ChessContext.Provider value={{ onDrop }}>
            {children}
        </ChessContext.Provider>
    );
};

export const useChess = () => useContext(ChessContext);
