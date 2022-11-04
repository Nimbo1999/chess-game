import userEvent from '@testing-library/user-event';
import { useChess } from 'contexts';
import { useEffect, useState } from 'react';
import { renderWithProvider, screen } from 'utils/test.utils';
import GamePage from './Game';

const MockPage: React.FC = () => {
    const { onSetupTimer } = useChess();
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        onSetupTimer(200);
        setInitialized(true);
    }, []);
    return initialized ? <GamePage /> : null;
};

describe('Game Page test cases', () => {
    it('Should Render the ChessBoard and MobileModalGameInfo components', () => {
        renderWithProvider(<MockPage />);
        const CurrentRoundInfo = screen.getByRole('heading', {
            name: /round 1 - white's turn/i,
        });
        const ChessBoard = screen.getAllByTestId('white-square');

        expect(CurrentRoundInfo).toBeInTheDocument();
        expect(ChessBoard).toHaveLength(32);
    });

    it('Should move wP-a2 to wP-a4', async () => {
        const { container } = renderWithProvider(<MockPage />);
        const sourceSquare = container.querySelector('div[data-squareid="a2"]');
        const targetSquare = container.querySelector('div[data-squareid="a4"]');
        if (!sourceSquare || !targetSquare)
            throw new Error("Board didn't rendered yet");

        await userEvent.click(sourceSquare);
        await userEvent.click(targetSquare);

        const round = screen.getByRole('heading', {
            name: /round 2 - black's turn/i,
        });

        expect(round).toBeInTheDocument();
    });
});
