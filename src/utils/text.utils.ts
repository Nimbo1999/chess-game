import { type ChessMetaData } from 'contexts';

type ChessMetaDataKey = keyof ChessMetaData;

export const chessMetadataText: Record<
    ChessMetaDataKey | 'isOutOfTime',
    string
> = {
    isCheck: 'You are in check',
    isCheckmate: 'This is a checkmate',
    isDraw: 'This game is draw',
    isStalemate: 'This is a stalemate',
    isGameOver: "The game it's over",
    isOutOfTime: 'You lose because you are out of time',
};
