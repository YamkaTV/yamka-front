import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import poster from '../assets/poster.png';

interface AnimeData {
    title: string;
    rating: number;
    poster_url: string;
    description: string;
    link?: string;
    other_titles?: string[]
    anime_url: string;
    status: string;
}

const AnimePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [animeData, setAnimeData] = useState<AnimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isTitlesExpanded, setIsTitlesExpanded] = useState(false);

    const prevIdRef = useRef<string | null>(null);
    const infoElRef = useRef<HTMLDivElement>(null);
    const posterElRef = useRef<HTMLImageElement>(null);
    const descElRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleLinkRef = useRef<HTMLAnchorElement>(null);
    const titleH1Ref = useRef<HTMLHeadingElement>(null);

    // Загрузка данных
    useEffect(() => {
        setIsTitlesExpanded(false);
        const currentId = id ?? null;
        if (prevIdRef.current !== currentId) {
            prevIdRef.current = currentId;

            const fetchAnimeData = async () => {
                try {
                    const response = await fetch(`https://api.yamka.tv/anime/data/${id}`);
                    if (!response.ok) throw new Error("HTTP error: " + response.status);

                    const data = await response.json();
                    setAnimeData(data);
                } catch {
                    setError("Не удалось загрузить данные.");
                } finally {
                    setLoading(false);
                }
            };

            fetchAnimeData();
        }
    }, [id]);

    // Обновление document.title
    useEffect(() => {
        if (animeData?.title) {
            document.title = `${animeData.title} смотреть онлайн бесплатно на Yamka TV`;
        }
    }, [animeData]);

    // Управление rounded классами
    useEffect(() => {
        const infoEl = infoElRef.current;
        const posterEl = posterElRef.current;

        if (infoEl && posterEl) {
            if (infoEl.offsetHeight > 230) {
                posterEl.classList.add('rounded2');
            } else {
                posterEl.classList.remove('rounded2');
                posterEl.classList.remove('rounded');
            }
        }
    }, [animeData]);

    // Управление кнопкой описания
    useEffect(() => {
        const descEl = descElRef.current;
        const container = containerRef.current;

        if (!descEl || !container) return;

        const existingBtn = container.querySelector(".toggle-btn");
        if (existingBtn) existingBtn.remove();

        const DEFAULT_HEIGHT = 65;
        if (descEl.scrollHeight > DEFAULT_HEIGHT + 5) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = "Развернуть";
            btn.classList.add("toggle-btn");
            container.appendChild(btn);

            descEl.style.height = `${DEFAULT_HEIGHT}px`;
            descEl.style.overflow = "hidden";
            descEl.style.transition = "height 0.3s ease";

            let expanded = false;

            btn.addEventListener("click", () => {
                if (!expanded) {
                    descEl.style.height = `${descEl.scrollHeight}px`;
                    btn.textContent = "Свернуть";

                    if (posterElRef.current && infoElRef.current && infoElRef.current.offsetHeight > 200) {
                        posterElRef.current.classList.add("rounded");
                    }

                    setTimeout(() => {
                        descEl.style.height = "auto";
                    }, 300);
                } else {
                    const currentHeight = descEl.scrollHeight;
                    descEl.style.height = `${currentHeight}px`;
                    void descEl.offsetHeight;

                    descEl.style.height = `${DEFAULT_HEIGHT}px`;
                    btn.textContent = "Развернуть";

                    if (posterElRef.current) {
                        posterElRef.current.classList.remove("rounded");
                    }
                }

                expanded = !expanded;
            });
        }
    }, [animeData]);


    if (loading) return <div className="block loading"><h2>Загрузка…</h2></div>;
    if (error || !animeData) return <div className="block loading">{error || "Нет данных."}</div>;

    return (
        <main className="main">
            <div className="block animeBlock">
                <img
                    src={animeData.poster_url || poster}
                    className="poster"
                    ref={posterElRef}
                    alt="Постер аниме"
                />
                <div className="info" ref={infoElRef}>
                    <h1 ref={titleH1Ref}>
                        <a
                            ref={titleLinkRef}
                            href={animeData.link || `http://yani.tv/catalog/item/${animeData.anime_url}`}
                            className="title"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {animeData.title || "Название не найдено"}
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
                        <div className="status">{animeData.status}</div>
                        {animeData.other_titles?.length ? (
                            <div
                                className={`other-titles ${isTitlesExpanded ? 'expanded' : ''}`}
                                onClick={() => setIsTitlesExpanded(!isTitlesExpanded)}
                            >

                                {animeData.other_titles.join(" | ")}
                            </div>
                        ) : null}
                    </div>
                    <div className="description" ref={descElRef}>
                        {animeData.description || "Описание не найдено"}
                    </div>
                    <div ref={containerRef} className="toggle-container"></div>
                </div>
            </div>

            <div className="block">
                <div className="player">
                    {/* Плеер будет здесь */}
                </div>
            </div>
        </main>
    );
};

export default AnimePage;