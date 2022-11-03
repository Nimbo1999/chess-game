import { forwardRef } from 'react';
import { Input, type InputRef } from '..';
import styles from './GroupInput.module.scss';

interface GroupInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
}

const GroupInput = forwardRef<InputRef, GroupInputProps>(
    function GroupInputRender({ id, label, errorMessage, ...props }, ref) {
        return (
            <div className={styles['group-input']}>
                <label htmlFor={id} className={styles['group-input__label']}>
                    {label}
                </label>

                <Input
                    id={id}
                    isValid={!errorMessage}
                    label={label}
                    ref={ref}
                    {...props}
                />
                {!!errorMessage && (
                    <small className={styles['group-input__error-message']}>
                        {errorMessage}
                    </small>
                )}
            </div>
        );
    }
);

export default GroupInput;
