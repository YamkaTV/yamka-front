import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <h1>История просмотренных аниме</h1>

            {history.length === 0 && <p>История пуста. На странице должны отображаться недавно открытые аниме</p>}

            {history.length > 0 && (
                <ul className="catalogResults">
                    {history.map((item, index) => (
                        <li key={index} className="resultItem">
                            <Link to={`/anime/${item.anime_url}`} className="result-link">
                                <img
                                    src={item.poster_url}
                                    alt={item.title}
                                    className="result-poster"
                                    width={80}
                                    height={120}
                                />
                                <div className="result-title-wrapper">
                                    <span className="result-title">{item.title}</span>
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
