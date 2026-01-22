import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const scrollToElement = () => {
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo(0, 0);
            }
        };

        // Attempt immediate scroll
        scrollToElement();

        // Retry after a short delay to ensure elements are rendered (useful for page transitions)
        const timer = setTimeout(scrollToElement, 100);

        return () => clearTimeout(timer);
    }, [pathname, hash]);

    return null;
};

export default ScrollToHash;
