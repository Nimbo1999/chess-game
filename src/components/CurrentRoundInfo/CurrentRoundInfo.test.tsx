import userEvent from '@testing-library/user-event';

import { useChess } from 'contexts';
import { useEffect } from 'react';
import { renderWithProvider, screen } from 'utils/test.utils';

import CurrentRoundInfo from './CurrentRoundInfo';

const TestComponent: React.FC = () => {
    const { onDrop, onSetupTimer } = useChess();

    useEffect(() => {
        onSetupTimer(200);
    }, []);

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
        const whitesFirstRound = screen.getByRole('heading', {
            name: /White's turn/i,
        });

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

        const heading = screen.getByRole('heading', {
            name: /Round 2 - Black's turn/,
        });

        expect(heading).toBeInTheDocument();
    });
});
