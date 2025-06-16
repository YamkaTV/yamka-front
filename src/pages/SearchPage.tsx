import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface AnimeItem {
    anime_title: string;
    poster_url: string;
    anime_id: number;
    anime_url: string;
}

const SearchPage: React.FC = () => {
    // Читаем параметр text из URL: /search?text=...
    const [searchParams] = useSearchParams();
    const query = searchParams.get('text') || '';

    // Состояния для результатов, загрузки и ошибок
    const [results, setResults] = useState<AnimeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Если нет запроса — ничего не делаем
        if (!query) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.yamka.tv/anime/search?text=${encodeURIComponent(query)}`
                );
                if (!response.ok) {
                    throw new Error(`Сервер вернул статус ${response.status}`);
                }

                // Пример ответа:
                // { anime_list: [ { anime_title, poster_url, anime_id }, ... ] }
                const data = await response.json();
                if (Array.isArray(data.anime_list)) {
                    setResults(data.anime_list);
                } else {
                    // Вдруг структура другая
                    console.warn('Unexpected API response structure:', data);
                    setResults([]);
                }
            } catch (err) {
                console.error('Ошибка при поиске аниме:', err);
                setError('Не удалось выполнить поиск. Попробуйте ещё раз.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <main className="containerCatalog">
            <h1>Результаты поиска по запросу: «{query}»</h1>

            {loading && <p>Загрузка...</p>}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {!loading && !error && results.length === 0 && (
                <p>Ничего не найдено.</p>
            )}

            {!loading && !error && results.length > 0 && (
                <ul className="catalogResults">
                    {results.map((item) => (
                        <li key={item.anime_url} className="resultItem">
                            <a href={`/anime/${item.anime_url}`} className="resultLink">
                                <img
                                    src={item.poster_url}
                                    alt={item.anime_title}
                                    className="resultPoster"
                                    width={80}
                                    height={120}
                                />
                                <div className="resultTitleWrapper">
                                    <span className="resultTitle">{item.anime_title}</span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default SearchPage;
