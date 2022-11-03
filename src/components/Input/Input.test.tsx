import Input from './Input';
import styles from './Input.module.scss';

import { render, screen } from 'utils/test.utils';

describe('', () => {
    it('Should render a default input', () => {
        render(<Input name="default" />);
        const input = screen.getByRole('textbox', { name: /default/ });
        expect(input).toBeInTheDocument();
        expect(input.nodeValue).toBe('');
    });

    it('Should apply a className without removing the base className', async () => {
        render(<Input name="classname" className="test" />);
        const input = screen.getByRole('textbox', { name: /classname/ });
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('class', `${styles.input} test`);
    });
});
