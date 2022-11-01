import { Chess, Move } from 'chess.js';
import {
    isAPromotionMovement,
    isValidMove,
    squareStyling,
} from './chess.utils';

describe('chess.utils functions unit test', () => {
    it('Should be a invalid Move', () => {
        const game = new Chess();
        const move = game.move({ from: 'b2', to: 'b5' });
        const isValid = isValidMove(move);
        expect(isValid).toBeFalsy();
    });
    it('Should be a valid Move', () => {
        const game = new Chess();
        const move = game.move({ from: 'b2', to: 'b4' });
        const isValid = isValidMove(move);
        expect(isValid).toBeTruthy();
    });

    it('Should be a Promotion Move', () => {
        const game = new Chess();
        game.move({ from: 'b2', to: 'b4' });
        game.move({ from: 'a7', to: 'a5' });
        game.move({ from: 'b4', to: 'a5' });
        game.move({ from: 'c7', to: 'c6' });
        game.move({ from: 'a5', to: 'a6' });
        game.move({ from: 'c6', to: 'c5' });
        game.move({ from: 'a6', to: 'b7' });
        game.move({ from: 'c5', to: 'c4' });
        const [movement] = game.moves({
            square: 'b7',
            verbose: true,
        }) as Move[];
        const isPromotionMove = isAPromotionMovement(movement);
        expect(isPromotionMove).toBeTruthy();
    });

    it('Should Apply styles for b2 square', () => {
        const result = squareStyling('b2', []);
        expect(result).toMatchObject({
            b2: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        });
    });
});
