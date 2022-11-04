import userEvent from '@testing-library/user-event';

import Home from './Home';
import { renderWithProvider, screen, waitFor } from 'utils/test.utils';

describe('', () => {
    it('Should display the initial form with the initial values', () => {
        renderWithProvider(<Home />);
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
        renderWithProvider(<Home />);
        const minutesField = screen.getByRole('spinbutton', {
            name: /Minutes/,
        });
        const secondsField = screen.getByRole('spinbutton', {
            name: /Seconds/,
        });
        await userEvent.type(minutesField, '5');
        await userEvent.type(secondsField, '5');
        waitFor(() => expect(minutesField).toHaveValue(5));
        waitFor(() => expect(secondsField).toHaveValue(5));
    });
});
