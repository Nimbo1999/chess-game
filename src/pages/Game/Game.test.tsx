import userEvent from '@testing-library/user-event';
import { renderWithProvider, screen } from 'utils/test.utils';
import GamePage from './Game';

describe('', () => {
    it('Should Render the GameHistory, ChessBoard and CurrentRoundInfo components', () => {
        renderWithProvider(<GamePage />);
        const gameHistory = screen.getByRole('heading', { name: /history/i });
        const CurrentRoundInfo = screen.getByRole('heading', {
            name: /round 0/i,
        });
        const ChessBoard = screen.getAllByTestId('white-square');

        expect(gameHistory).toBeInTheDocument();
        expect(CurrentRoundInfo).toBeInTheDocument();
        expect(ChessBoard).toHaveLength(32);
    });

    it('Should move wP-a2 to wP-a4', async () => {
        const { container } = renderWithProvider(<GamePage />);
        const sourceSquare = container.querySelector('div[data-squareid="a2"]');
        const targetSquare = container.querySelector('div[data-squareid="a4"]');
        if (!sourceSquare || !targetSquare)
            throw new Error("Board didn't rendered yet");

        await userEvent.click(sourceSquare);
        await userEvent.click(targetSquare);

        const round = screen.getByRole('heading', {
            name: /round 1/i,
        });
        const blacksTurn = screen.getByText("Black's turn");
        const historyMoves = screen.getByText('Round 0 - (w-a4)');

        expect(round).toBeInTheDocument();
        expect(blacksTurn).toBeInTheDocument();
        expect(historyMoves).toBeInTheDocument();
    });
});
