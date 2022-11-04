import userEvent from '@testing-library/user-event';

import { renderWithProvider, screen } from 'utils/test.utils';
import { useChess } from 'contexts';
import GameHistory from './GameHistory';

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

describe('HameHistory component test cases', () => {
    it('Should Start with 1 history object. The Start point', () => {
        renderWithProvider(<GameHistory />);

        const heading = screen.getByRole('heading', { name: /history/i });
        expect(heading).toBeInTheDocument();

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems).toHaveLength(1);
    });

    it('Should add a movement to the history panel', async () => {
        renderWithProvider(
            <>
                <TestComponent />
                <GameHistory />
            </>
        );

        const button = screen.getByRole('button', { name: /Move/ });
        await userEvent.click(button);

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });
});
