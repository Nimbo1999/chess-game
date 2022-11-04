import { ChessState } from 'reducers';

export interface AppStorage {
    hydrateState(): ChessState | null;
    writeState(state: ChessState): void;
    reset(): void;
}
