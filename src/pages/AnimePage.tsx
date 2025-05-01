import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface AnimeData {
    title: string;
    rating: number;
    poster_url: string;
    description: string;
    link?: string;
}

const AnimePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [animeData, setAnimeData] = useState<AnimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                const response = await fetch(`https://api.yamka.tv/anime/data/${id}`);
                if (!response.ok) throw new Error("Ошибка HTTP: " + response.status);

                const data = await response.json();
                setAnimeData(data);
                window.dispatchEvent(new CustomEvent("animeDataLoaded", { detail: data }));
            } catch {
                setError("Не удалось загрузить данные.");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <div className="block">Загрузка…</div>;
    if (error || !animeData) return <div className="block">{error || "Нет данных."}</div>;

    return (
        <main className="main">
            <div className="block animeBlock">
                <img
                    src={animeData.poster_url || '/static/images/poster.png'}
                    className="poster"
                    alt="Постер аниме"
                />
                <div className="info">
                    <h1>
                        <a
                            href={animeData.link || '#'}
                            className="title"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {animeData.title}
                        </a>
                    </h1>
                    <div className="ratingBlock">
                        <svg className="star" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M13.6 5.71 11.3.84A1.45 1.45 0 0 0 10 0c-.27 0-.53.08-.76.23a1.4 1.4 0 0 0-.53.6L6.4 5.73l-5.15.77a1.4 1.4 0 0 0-.73.34 1.54 1.54 0 0 0-.08 2.23l3.74 3.81-.88 5.36A1.49 1.49 0 0 0 4.6 20c.27.02.54-.04.78-.17l4.63-2.53 4.6 2.53c.5.26 1.08.22 1.53-.12a1.52 1.52 0 0 0 .57-1.47l-.88-5.37 3.73-3.8c.4-.4.54-1 .37-1.54a1.45 1.45 0 0 0-1.17-1.03l-5.15-.78v-.01Z"
                                fill="var(--main)"
                            />
                        </svg>
                        <div className="rating">{animeData.rating?.toFixed(1) || "0.0"}</div>
                    </div>
                    <div className="description">{animeData.description || "Описание недоступно."}</div>
                </div>
            </div>

            <div className="block">
                <div className="player">{/* Вставь сюда компонент плеера, если нужен */}</div>
            </div>
        </main>
    );
};

export default AnimePage;
