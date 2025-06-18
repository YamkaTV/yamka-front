import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import poster from '../../assets/poster.avif';
import CustomSelect from '@components/selectors/Selectors.module';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import JsonLdScript from '@components/seo/JsonLdScript';
import styles from './AnimePage.module.scss';
import Block from '../../components/block/Block';
import AnimeDataLoader from '../../components/AnimeDataLoader/AnimeDataLoader';
import AdBlock from '@components/adblock/AdBlock';

interface AnimeData {
    anime_url: string;
    title: string;
    description: string;
    rating: number;
    other_titles?: string[];
    poster_url: string;
    status: string;
    viewing_order: any[];
    status_block?: number;
}

interface VideoEpisode {
    episode: string;
    iframe_url: string;
}

interface VideoPlayer {
    [playerName: string]: VideoEpisode[];
}

interface AnimeVideos {
    [voiceName: string]: VideoPlayer;
}

const AnimePage: React.FC = () => {
    const [isTitlesExpanded, setIsTitlesExpanded] = useState(false);
    const [showToggleBtn, setShowToggleBtn] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const infoElRef = useRef<HTMLDivElement>(null);
    const posterElRef = useRef<HTMLImageElement>(null);
    const descElRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleLinkRef = useRef<HTMLAnchorElement>(null);
    const titleH1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const infoEl = infoElRef.current;
        const posterEl = posterElRef.current;

        if (infoEl && posterEl) {
            if (infoEl.offsetHeight > 230) {
                posterEl.classList.add(styles.rounded2);
            } else {
                posterEl.classList.remove(styles.rounded2);
                posterEl.classList.remove(styles.rounded);
            }
        }
    }, []); // Зависимость от animeData убрана, так как данные приходят через пропсы

    return (
        <AnimeDataLoader>
            {({
                animeData,
                videoData,
                loading,
                error,
                cleanString,
                selectedVoice,
                selectedPlayer,
                selectedEpisode,
                selectedIframeUrl,
                handleVoiceChange,
                handlePlayerChange,
                handleEpisodeChange,
                voices,
                players,
                episodes,
            }) => {
                useEffect(() => {
                    const descEl = descElRef.current;
                    const DEFAULT_HEIGHT = 65;

                    if (descEl && descEl.scrollHeight > DEFAULT_HEIGHT + 5) {
                        setShowToggleBtn(true);
                    } else {
                        setShowToggleBtn(false);
                    }
                    setIsDescriptionExpanded(false);
                }, [animeData]);

                const generateEpisodeSchema = () => {
                    if (!videoData || !animeData) return [];

                    const episodeList: any[] = [];
                    Object.keys(videoData).forEach(voice => {
                        Object.keys(videoData[voice]).forEach(player => {
                            videoData[voice][player].forEach(episode => {
                                episodeList.push({
                                    "@type": "TVEpisode",
                                    "episodeNumber": episode.episode,
                                    "name": `Эпизод ${episode.episode} (${cleanString(voice)}, ${cleanString(player)})`,
                                    "url": `https://yamka.tv/anime/${animeData.anime_url}?voice=${encodeURIComponent(cleanString(voice))}&player=${encodeURIComponent(cleanString(player))}&episode=${encodeURIComponent(episode.episode)}`
                                });
                            });
                        });
                    });
                    return episodeList;
                };

                const animeSchema = animeData ? {
                    "@context": "https://schema.org",
                    "@type": "TVSeries",
                    "name": animeData.title,
                    "description": animeData.description,
                    "image": animeData.poster_url,
                    "url": `https://yamka.tv/anime/${animeData.anime_url}`,
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": animeData.rating,
                        "bestRating": "10",
                        "worstRating": "0",
                        "ratingCount": "1"
                    },
                    "episode": generateEpisodeSchema()
                } : null;

                if (loading) return (
                    <>
                        <Block className={styles.loading}><h2>Загрузка данных…</h2></Block>
                        <Block className={styles.loading2}><h2>Загрузка данных…</h2></Block>
                    </>
                );

                if (error || !animeData || !videoData) return <Block className={styles.loading}>{error || "Нет данных."}</Block>;

                return (
                    <main>
                        <SeoHead
                            title={animeData?.title ? seoPages.anime.title.replace('{animeTitle}', animeData.title) : seoPages.anime.title}
                            description={animeData?.description ? seoPages.anime.description.replace('{animeTitle}', animeData.title) : seoPages.anime.description}
                            noindex={seoPages.anime.noindex}
                            canonicalUrl={`https://yamka.tv/anime/${animeData.anime_url}`}
                        />
                        {animeSchema && <JsonLdScript data={animeSchema} />}
                        <Block className={styles.animeBlock}>
                            <ins data-pm-b="728x90"></ins>
                            <img
                                src={animeData.poster_url || poster}
                                className={`${styles.poster} ${isDescriptionExpanded && infoElRef.current && infoElRef.current.offsetHeight > 200 ? styles.rounded : ''} ${animeData.status_block === 1 ? styles.blurred : ''}`}
                                ref={posterElRef}
                                alt="Постер аниме"
                            />
                            <div className={styles.info} ref={infoElRef}>
                                <h1 ref={titleH1Ref}>
                                    <a
                                        ref={titleLinkRef}
                                        href={`https://yani.tv/catalog/item/${animeData.anime_url}`}
                                        className={styles.title}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {animeData.title || "Название не найдено"}
                                    </a>
                                </h1>
                                <div className={styles.ratingBlock}>
                                    <svg className={styles.star} viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M13.6 5.71 11.3.84A1.45 1.45 0 0 0 10 0c-.27 0-.53.08-.76.23a1.4 1.4 0 0 0-.53.6L6.4 5.73l-5.15.77a1.4 1.4 0 0 0-.73.34 1.54 1.54 0 0 0-.08 2.23l3.74 3.81-.88 5.36A1.49 1.49 0 0 0 4.6 20c.27.02.54-.04.78-.17l4.63-2.53 4.6 2.53c.5.26 1.08.22 1.53-.12a1.52 1.52 0 0 0 .57-1.47l-.88-5.37 3.73-3.8c.4-.4.54-1 .37-1.54a1.45 1.45 0 0 0-1.17-1.03l-5.15-.78v-.01Z"
                                            fill="var(--main)"
                                        />
                                    </svg>
                                    <div className={styles.rating}>{animeData.rating?.toFixed(1) || "0.0"}</div>
                                    <div className={styles.status}>{animeData.status}</div>
                                    {animeData.other_titles?.length ? (
                                        <div
                                            className={`${styles.otherTitles} ${isTitlesExpanded ? styles.expanded : ''}`}
                                            onClick={() => setIsTitlesExpanded(!isTitlesExpanded)}
                                        >
                                            {animeData.other_titles.join(" | ")}
                                        </div>
                                    ) : null}
                                </div>
                                <div
                                    className={`${styles.description} ${isDescriptionExpanded ? styles.expandedDescription : ''}`}
                                    ref={descElRef}
                                >
                                    {animeData.description || "Описание не найдено"}
                                </div>
                                <div ref={containerRef} className={styles.toggleContainer}>
                                    {showToggleBtn && (
                                        <button
                                            type="button"
                                            className={styles.toggleBtn}
                                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                        >
                                            {isDescriptionExpanded ? "Свернуть" : "Развернуть"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Block>

                        {animeData.status_block === 1 ? (
                            <>
                                <Block className={styles.videoBlock}>
                                    <div className={styles.blockedMessage}>
                                        Данное аниме заблокировано на территории Вашей страны. Страница только для ознакомления, просмотр недоступен!
                                    </div>
                                </Block>
                            </>
                        ) : (
                            <>
                                <AdBlock />
                                <Block className={styles.videoBlock}>
                                    {videoData && (
                                        <div className={styles.selectors}>
                                            <CustomSelect
                                                label="Озвучка"
                                                options={voices}
                                                value={selectedVoice}
                                                onChange={handleVoiceChange}
                                            />
                                            <CustomSelect
                                                label="Плеер"
                                                options={players}
                                                value={selectedPlayer}
                                                onChange={handlePlayerChange}
                                            />
                                            <CustomSelect
                                                label="Серия"
                                                options={episodes}
                                                value={selectedEpisode}
                                                onChange={handleEpisodeChange}
                                                prefix="Серия"
                                            />
                                        </div>
                                    )}

                                    {selectedIframeUrl && (
                                        <div className={styles.player}>
                                            <iframe
                                                src={selectedIframeUrl}
                                                title="Anime Video"
                                                allowFullScreen
                                                style={{ border: 'none' }}
                                            />
                                        </div>
                                    )}
                                </Block>
                                <AdBlock />
                            </>
                        )}
                    </main>
                );
            }}
        </AnimeDataLoader>
    );
};

export default AnimePage;
