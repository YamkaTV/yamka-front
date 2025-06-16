import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { seoPages } from '../seoConfig'; // Импортировал seoPages

interface HistoryEntry {
    title: string;
    anime_url: string;
    poster_url: string;
}

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    // Загрузка истории из localStorage
    useEffect(() => {
        const storedHistory: HistoryEntry[] = JSON.parse(localStorage.getItem('History') || '[]');
        setHistory(storedHistory);
    }, []);

    // Обновление SEO
    useEffect(() => {
        document.title = seoPages.history.title;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', seoPages.history.description);

        // Добавление мета-тега robots для запрета индексации
        if (seoPages.history.noindex) {
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
        <main className="containerCatalog">
            <h1>История просмотренных аниме</h1>

            {history.length === 0 && <p>История пуста. На странице должны отображаться недавно открытые аниме</p>}

            {history.length > 0 && (
                <ul className="catalogResults">
                    {history.map((item, index) => (
                        <li key={index} className="resultItem">
                            <Link to={`/anime/${item.anime_url}`} className="resultLink">
                                <img
                                    src={item.poster_url}
                                    alt={item.title}
                                    className="resultPoster"
                                    width={80}
                                    height={120}
                                />
                                <div className="resultTitleWrapper">
                                    <span className="resultTitle">{item.title}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default HistoryPage;
