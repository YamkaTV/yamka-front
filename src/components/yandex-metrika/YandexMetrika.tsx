import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Определим типы для аргументов функции ym
interface YmFunction {
    (metrikaId: number, method: string, params: object): void;
    a?: unknown[]; // Мы не знаем точно, что здесь будет, но не используем any
    l?: number;
}

declare global {
    interface Window {
        ym?: YmFunction; // Тип для window.ym
    }
}

const YandexMetrika: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const ym = window.ym;

        // Если ym не существует, выходим
        if (!ym) return;

        // Отправляем событие о переходе на новую страницу
        ym(101420919, 'hit', {
            page: location.pathname,
        });
    }, [location]);

    return null;
};

export default YandexMetrika;
