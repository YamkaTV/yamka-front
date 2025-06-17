import React, { useState, useEffect } from 'react';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import Catalog from '@components/catalog/Catalog';
import Styles from './HistoryPage.module.scss';

interface HistoryEntry {
    title: string;
    anime_url: string;
    poster_url: string;
}

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        const storedHistory: HistoryEntry[] = JSON.parse(localStorage.getItem('History') || '[]');
        setHistory(storedHistory);
    }, []);

    const catalogItems = history.map(item => ({
        id: item.anime_url,
        title: item.title,
        poster: item.poster_url,
        link: `/anime/${item.anime_url}`
    }));

    return (
        <main>
            <SeoHead
                title={seoPages.history.title}
                description={seoPages.history.description}
                noindex={seoPages.history.noindex}
            />
            <h1 className={Styles.text}>История просмотренных аниме</h1>

            {history.length === 0 && <p className={Styles.text}>История пуста. На странице должны отображаться недавно открытые аниме</p>}

            {history.length > 0 && (
                <Catalog items={catalogItems} />
            )}
        </main>
    );
};

export default HistoryPage;
