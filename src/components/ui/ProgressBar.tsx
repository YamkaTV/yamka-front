// @components/ui/TopProgressBar.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const TopProgressBar = () => {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();
        const timer = setTimeout(() => {
            NProgress.done();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [location.pathname]);

    return null;
};

export default TopProgressBar;
