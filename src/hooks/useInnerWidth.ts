import { useState, useEffect } from 'react';

export const useInnerWidth = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        const listener = () => setInnerWidth(window.innerWidth);

        const runEffect = () => {
            window.addEventListener('resize', listener);
        };
        runEffect();

        return () => {
            window.removeEventListener('resize', listener);
        };
    }, []);

    return innerWidth;
};
