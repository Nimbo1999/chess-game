import { renderWithProvider, screen } from 'utils/test.utils';
import Timer from './Timer';
import styles from './Timer.module.scss';

describe('Timer component test cases', () => {
    it('Should Render the Timer', () => {
        renderWithProvider(<Timer timer={200} isActive={false} />);
        const mins0 = screen.getByTestId('min0');
        const mins1 = screen.getByTestId('min1');
        const colon = screen.getByTestId('colon');
        const sec0 = screen.getByTestId('sec0');
        const sec1 = screen.getByTestId('sec1');

        expect(mins0).toBeInTheDocument();
        expect(mins1).toBeInTheDocument();
        expect(colon).toBeInTheDocument();
        expect(sec0).toBeInTheDocument();
        expect(sec1).toBeInTheDocument();
    });

    it('Should Render the correct time value', () => {
        renderWithProvider(<Timer timer={200} isActive={false} />);
        const mins0 = screen.getByTestId('min0');
        const mins1 = screen.getByTestId('min1');
        const colon = screen.getByTestId('colon');
        const sec0 = screen.getByTestId('sec0');
        const sec1 = screen.getByTestId('sec1');

        expect(mins0).toHaveTextContent('0');
        expect(mins1).toHaveTextContent('3');
        expect(colon).toHaveTextContent(':');
        expect(sec0).toHaveTextContent('2');
        expect(sec1).toHaveTextContent('0');
    });

    it('Should apply correct className when active', () => {
        renderWithProvider(<Timer timer={200} isActive={true} />);
        const timer = screen.getByTestId('timer');

        expect(timer).toHaveClass(
            [styles['timer'], styles['active']].join(' ')
        );
    });
});
