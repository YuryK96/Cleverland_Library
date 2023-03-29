import { useEffect, useState } from 'react';

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined,
        tablet: false,
        mobile: false,
        width1000: false
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                tablet: window.innerWidth > 768,
                mobile: window.innerWidth < 520,
                width1000: window.innerWidth >= 1000
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

interface Size {
    width: number | undefined;
    height: number | undefined;
    tablet: boolean;
    width1000: boolean;
    mobile: boolean;
}
