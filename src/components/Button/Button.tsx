import { useMemo } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnType?: 'defaut' | 'primary' | 'success';
}

const Button: React.FC<ButtonProps> = ({
    className,
    btnType = 'defaut',
    ...props
}) => {
    const classNames = useMemo(() => {
        const classes = [styles.button, styles[`button__${btnType}`]];
        if (className) classes.push(className);
        return classes.join(' ');
    }, [className, btnType]);

    return <button className={classNames} {...props} />;
};

export default Button;
