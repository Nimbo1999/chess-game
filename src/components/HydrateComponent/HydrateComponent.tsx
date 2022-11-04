import { useChess } from 'contexts';
import { useEffect, useState } from 'react';

interface HydrateComponentProps {
    children: React.ReactElement;
}

const HydrateComponent: React.FC<HydrateComponentProps> = ({ children }) => {
    const [hydrated, setHydrated] = useState(false);
    const { hydrateState } = useChess();

    useEffect(() => {
        const runEffect = () => {
            if (!hydrated) hydrateState(() => setHydrated((value) => !value));
        };
        runEffect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hydrated]);

    return hydrated ? children : <>Loading...</>;
};

export default HydrateComponent;
