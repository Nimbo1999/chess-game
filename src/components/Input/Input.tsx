import { useMemo, forwardRef } from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isValid?: boolean;
    label?: string;
}

export type InputRef = HTMLInputElement;

const Input = forwardRef<InputRef, InputProps>(function InputRender(
    { className, isValid = true, label, ...props },
    ref
) {
    const classNames = useMemo(() => {
        const classes = [styles.input];
        if (className) classes.push(className);
        if (!isValid) classes.push(styles['input__invalid']);
        return classes.join(' ');
    }, [className, isValid]);
    return (
        <input ref={ref} className={classNames} aria-label={label} {...props} />
    );
});

export default Input;
