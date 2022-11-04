import Input from './Input';
import styles from './Input.module.scss';

import { render, screen } from 'utils/test.utils';

describe('Input component test case', () => {
    it('Should render a default input', () => {
        render(<Input name="default" label="default" />);
        const input = screen.getByRole('textbox', { name: /default/ });
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('Should apply a className without removing the base className', async () => {
        render(<Input name="classname" className="test" label="classname" />);
        const input = screen.getByRole('textbox', { name: /classname/ });
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('class', `${styles.input} test`);
    });
});
