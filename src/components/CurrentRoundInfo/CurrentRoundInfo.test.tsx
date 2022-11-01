import userEvent from '@testing-library/user-event';

import { useChess } from 'contexts';
import { renderWithProvider, screen } from 'utils/test.utils';

import CurrentRoundInfo from './CurrentRoundInfo';

const TestComponent: React.FC = () => {
    const { onDrop } = useChess();

    return (
        <button
            onClick={() =>
                !!onDrop &&
                onDrop({ piece: 'wP', sourceSquare: 'f2', targetSquare: 'f4' })
            }
        >
            Move
        </button>
    );
};

describe('CurrentRoundInfo test cases', () => {
    it('Should Start with default values.', () => {
        renderWithProvider(<CurrentRoundInfo />);
        const heading = screen.getByRole('heading', { name: /Round/ });
        const whitesFirstRound = screen.getByText("White's turn");

        expect(heading).toBeInTheDocument();
        expect(whitesFirstRound).toBeInTheDocument();
    });

    it("Should inform that its Black's round.", async () => {
        renderWithProvider(
            <>
                <TestComponent />
                <CurrentRoundInfo />
            </>
        );

        const button = screen.getByRole('button', { name: /Move/ });
        await userEvent.click(button);

        const heading = screen.getByRole('heading', { name: /Round 1/ });
        const blackRound = screen.getByText("Black's turn");

        expect(heading).toBeInTheDocument();
        expect(blackRound).toBeInTheDocument();
    });
});
