import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { seoPages } from '../seoConfig';
import SeoHead from '@components/SeoHead'; // Импортировал SeoHead

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

    return (
        <main className="containerCatalog">
            <SeoHead
                title={seoPages.history.title}
                description={seoPages.history.description}
                noindex={seoPages.history.noindex}
            />
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
