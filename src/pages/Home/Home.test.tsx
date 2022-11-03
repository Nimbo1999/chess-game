import userEvent from '@testing-library/user-event';

import Home from './Home';
import { render, screen } from 'utils/test.utils';

const ResultComponent: React.FC = () => {
    return (
        <div>
            <p>Test1</p>
            <p>Test1</p>
            <p>Test1</p>
        </div>
    );
};

describe('', () => {
    it('Should display the initial form with the initial values', () => {
        render(<Home />);
        const minutesField = screen.getByRole('spinbutton', {
            name: 'Minutes',
        });
        const secondsField = screen.getByRole('spinbutton', {
            name: 'Seconds',
        });
        expect(minutesField).toHaveValue(10);
        expect(secondsField).toHaveValue(0);
    });

    it('Should display the correct information once the user submit the form', async () => {
        render(
            <>
                <ResultComponent />
                <Home />
            </>
        );
        const minutesField = screen.getByRole('textbox', { name: 'minutes' });
        const secondsField = screen.getByRole('textbox', { name: 'seconds' });
        await userEvent.type(minutesField, '10');
        await userEvent.type(secondsField, '0');
        const submitButton = screen.getByRole('button', { name: /submit/ });
        await userEvent.click(submitButton);
        const minutes = screen.getByText('minutes: 10');
        const seconds = screen.getByText('seconds: 0');
        expect(minutes).toBeInTheDocument();
        expect(seconds).toBeInTheDocument();
    });
});
