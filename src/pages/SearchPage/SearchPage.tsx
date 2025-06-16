import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { seoPages } from '@components/seo/seoConfig'; // Обновлен путь
import SeoHead from '@components/seo/SeoHead'; // Обновлен путь
import catalogStyles from '../../components/catalog/Catalog.module.scss';
import searchPageStyles from './SearchPage.module.scss';

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
    const [localError, setLocalError] = useState<string | null>(null); // Переименовал, чтобы избежать конфликта с импортированным 'error'

    useEffect(() => {
        // Если нет запроса — ничего не делаем
        if (!query) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            setLocalError(null);

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
                setLocalError('Не удалось выполнить поиск. Попробуйте ещё раз.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const currentSeo = {
        title: seoPages.search.title.replace('{query}', query),
        description: seoPages.search.description.replace('{query}', query),
        noindex: seoPages.search.noindex
    };

    return (
        <main className={catalogStyles.containerCatalog}>
            <SeoHead
                title={currentSeo.title}
                description={currentSeo.description}
                noindex={currentSeo.noindex}
            />
            <h1>Результаты поиска по запросу: «{query}»</h1>

            {loading && <p>Загрузка...</p>}

            {localError && (
                <p className={searchPageStyles.error}>
                    {localError}
                </p>
            )}

            {!loading && !localError && results.length === 0 && (
                <p>Ничего не найдено.</p>
            )}

            {!loading && !localError && results.length > 0 && (
                <ul className={catalogStyles.catalogResults}>
                    {results.map((item) => (
                        <li key={item.anime_url} className={catalogStyles.resultItem}>
                            <a href={`/anime/${item.anime_url}`} className={catalogStyles.resultLink}>
                                <img
                                    src={item.poster_url}
                                    alt={item.anime_title}
                                    className={catalogStyles.resultPoster}
                                    width={80}
                                    height={120}
                                />
                                <div className={catalogStyles.resultTitleWrapper}>
                                    <span className={catalogStyles.resultTitle}>{item.anime_title}</span>
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
