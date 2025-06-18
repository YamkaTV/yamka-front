import React, { useEffect, useRef } from 'react';

const AdBlock: React.FC = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (adRef.current) {
            const insElement = document.createElement('ins');
            insElement.setAttribute('data-pm-b', '728x90');
            adRef.current.appendChild(insElement);

            let attempts = 0;
            const maxAttempts = 10; // Максимальное количество попыток
            const initialDelay = 100; // Начальная задержка в мс

            const tryInit = () => {
                if (window.pm_union_init) {
                    window.pm_union_init();
                } else if (attempts < maxAttempts) {
                    attempts++;
                    const delay = initialDelay * Math.pow(2, attempts - 1); // Экспоненциальная задержка
                    setTimeout(tryInit, delay);
                } else {
                    console.warn('pm_union_init не доступен после нескольких попыток.');
                }
            };

            tryInit(); // Первая попытка

            return () => {
                // Очистка, если необходимо
            };
        }
    }, []);

    return (
        <div ref={adRef}></div>
    );
};

export default AdBlock;