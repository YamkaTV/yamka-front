import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import JsonLdScript from '@components/seo/JsonLdScript'; // Импорт JsonLdScript
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

    // Генерация JSON-LD для ItemList
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage", // Или ItemList
        "name": `Результаты поиска аниме по запросу: «${query}»`,
        "url": `https://yamka.tv/search?text=${encodeURIComponent(query)}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": results.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "TVSeries", // Или Movie, в зависимости от типа контента
                    "name": item.anime_title,
                    "url": `https://yamka.tv/anime/${item.anime_url}`,
                    "image": item.poster_url // Добавляем постер
                }
            }))
        }
    };

    return (
        <main>
            <SeoHead
                title={currentSeo.title}
                description={currentSeo.description}
                noindex={currentSeo.noindex}
                canonicalUrl="https://yamka.tv/search" // Канонический URL для страницы поиска
            />
            {results.length > 0 && <JsonLdScript data={itemListSchema} />} {/* Добавляем разметку, если есть результаты */}
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
