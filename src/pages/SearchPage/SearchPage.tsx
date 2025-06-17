import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import Catalog from '@components/catalog/Catalog';
import Styles from './SearchPage.module.scss';

interface AnimeItem {
    anime_title: string;
    poster_url: string;
    anime_id: number;
    anime_url: string;
}

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('text') || '';

    const [results, setResults] = useState<AnimeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
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

                const data = await response.json();
                if (Array.isArray(data.anime_list)) {
                    setResults(data.anime_list);
                } else {
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

    const catalogItems = results.map(item => ({
        id: item.anime_url,
        title: item.anime_title,
        poster: item.poster_url,
        link: `/anime/${item.anime_url}`
    }));

    return (
        <main>
            <SeoHead
                title={currentSeo.title}
                description={currentSeo.description}
                noindex={currentSeo.noindex}
            />
            <h1 className={Styles.text}>Результаты поиска по запросу: «{query}»</h1>

            {loading && <p className={Styles.text}>Загрузка...</p>}

            {localError && (
                <p className={Styles.error}>
                    {localError}
                </p>
            )}

            {!loading && !localError && results.length === 0 && (
                <p className={Styles.text}>Ничего не найдено.</p>
            )}

            {!loading && !localError && results.length > 0 && (
                <Catalog items={catalogItems} />
            )}
        </main>
    );
};

export default SearchPage;
