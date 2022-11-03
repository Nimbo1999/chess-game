import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { GroupInput, Button } from 'components';
import { ROUTE_CONSTANTS } from 'constants/Route';

import styles from './Home.module.scss';
import { useChess } from 'contexts';

type FormValues = { minutes: string; seconds: string };

const Home: React.FC = () => {
    const { onSetupTimer } = useChess();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onFormValid = (data: FormValues) => {
        const total = +data.minutes * 60 + +data.seconds;
        onSetupTimer(total);
        navigate(ROUTE_CONSTANTS.GAME_PAGE);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onFormValid)}>
                <h3 className={styles['form__title']}>Start game</h3>
                <p className={styles['form__description']}>
                    Please, inform a maximum time that each player should have.
                    A player lose a game if it&apos;s time reach 0.
                </p>

                <GroupInput
                    label="Minutes"
                    type="number"
                    id="minutes"
                    {...register('minutes', {
                        min: {
                            message: 'Number must be greater than 0',
                            value: 0,
                        },
                        max: {
                            message: 'Number must be smaller than 59',
                            value: 59,
                        },
                        required:
                            'You must specify a minute greater then 0 and lower then 59',
                    })}
                    errorMessage={
                        errors && errors.minutes && !!errors.minutes.message
                            ? (errors.minutes.message as string)
                            : undefined
                    }
                    defaultValue="10"
                />

                <GroupInput
                    label="Seconds"
                    type="number"
                    id="seconds"
                    {...register('seconds', {
                        min: {
                            message: 'Number must be greater than 0',
                            value: 0,
                        },
                        max: {
                            message: 'Number must be smaller than 59',
                            value: 59,
                        },
                        required:
                            'You must specify a second greater then 0 and lower then 59',
                    })}
                    errorMessage={
                        errors && errors.seconds && !!errors.seconds.message
                            ? (errors.seconds.message as string)
                            : undefined
                    }
                    defaultValue="0"
                />

                <Button type="submit" btnType="success">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Home;
