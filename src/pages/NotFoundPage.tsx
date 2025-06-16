import React, { useEffect } from 'react';
import '../scss/_notfound.scss';
import { seoPages } from '../seoConfig'; // Импортировал seoPages

const NotFoundPage: React.FC = () => {
    useEffect(() => {
        document.title = seoPages.notFound.title;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', seoPages.notFound.description);

        // Добавление мета-тега robots для запрета индексации
        if (seoPages.notFound.noindex) {
            let metaRobots = document.querySelector('meta[name="robots"]');
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.setAttribute('name', 'robots');
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute('content', 'noindex, nofollow');
        }
    }, []);

    return (
        <div className="notFoundContainer">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <a href="/" className="homeLink">Вернуться на главную</a>
        </div>
    );
};

export default NotFoundPage;