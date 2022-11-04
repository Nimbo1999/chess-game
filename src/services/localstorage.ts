import { ChessState } from 'reducers';
import { AppStorage } from './storage';

export class LocalStorageService implements AppStorage {
    constructor(private readonly key: string) {}

    hydrateState(): ChessState | null {
        const stringfyState = localStorage.getItem(this.key);
        if (stringfyState === null) return stringfyState;
        return JSON.parse(stringfyState);
    }

    writeState(state: ChessState): void {
        const stringfyState = JSON.stringify(state);
        localStorage.setItem(this.key, stringfyState);
    }

    reset(): void {
        localStorage.removeItem(this.key);
    }
}
