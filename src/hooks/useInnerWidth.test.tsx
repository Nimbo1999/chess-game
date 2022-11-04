import { render, screen } from 'utils/test.utils';
import { useInnerWidth } from './useInnerWidth';

const InnerTest: React.FC = () => {
    const innerWidth = useInnerWidth();
    return <p data-testid="innerwidth">{innerWidth}</p>;
};

describe('useInnerWidth hook test case', () => {
    it('Should display the default innerWidth value 1024', () => {
        render(<InnerTest />);
        const innerwidth = screen.getByTestId('innerwidth');
        expect(innerwidth).toHaveTextContent('1024');
    });
});
