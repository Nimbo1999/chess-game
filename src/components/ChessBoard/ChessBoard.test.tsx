import { renderWithProvider, screen } from 'utils/test.utils';
import ChessBoard from './ChessBoard';

describe('ChessBoard component test cases', () => {
    it('Should Render the board', () => {
        renderWithProvider(<ChessBoard />);
        const whiteSquares = screen.getAllByTestId('white-square');
        const blackSquares = screen.getAllByTestId('black-square');

        expect(whiteSquares).toHaveLength(32);
        expect(blackSquares).toHaveLength(32);
    });
});
