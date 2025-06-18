import React, { useEffect, useRef } from 'react';

const AdBlock: React.FC = () => {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (adRef.current) {
            const insElement = document.createElement('ins');
            insElement.setAttribute('data-pm-b', '728x90');
            adRef.current.appendChild(insElement);

            // Проверяем, доступна ли функция pm_union_init и вызываем ее
            if (window.pm_union_init) {
                window.pm_union_init();
            } else {
                // Если функция еще не загружена, можно добавить слушатель события load
                // или использовать setTimeout для повторной попытки
                const script = document.querySelector('script[src="https://cdnwidget.simplejsmenu.com/public/lib.en.min.js"]');
                if (script instanceof HTMLScriptElement) { // Проверяем тип
                    script.onload = () => {
                        if (window.pm_union_init) {
                            window.pm_union_init();
                        }
                    };
                }
            }
        }
    }, []);

    return (
        <div ref={adRef}></div>
    );
};

export default AdBlock;