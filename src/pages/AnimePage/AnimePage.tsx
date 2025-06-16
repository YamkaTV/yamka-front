import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import poster from '../../assets/poster.avif';
import CustomSelect from '@components/selectors/Selectors.module';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import styles from './AnimePage.module.scss';
import Block from '../../components/block/Block';

interface AnimeData {
    anime_id: number;
    anime_url: string;
    title: string;
    description: string;
    rating: number;
    other_titles?: string[];
    poster_url: string;
    status: string;
    viewing_order: any[]; // Уточнить тип, если необходимо
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

interface AnimeApiResponse {
    anime_data: AnimeData;
    anime_videos: AnimeVideos;
}

interface HistoryEntry {
    title: string;
    anime_url: string;
    poster_url: string;
}

const AnimePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [animeData, setAnimeData] = useState<AnimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isTitlesExpanded, setIsTitlesExpanded] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('');
    const [selectedEpisode, setSelectedEpisode] = useState('');
    const [videoData, setVideoData] = useState<AnimeVideos | null>(null);
    const [selectedIframeUrl, setSelectedIframeUrl] = useState('');
    const [showToggleBtn, setShowToggleBtn] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);


    const prevIdRef = useRef<string | null>(null);
    const infoElRef = useRef<HTMLDivElement>(null);
    const posterElRef = useRef<HTMLImageElement>(null);
    const descElRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleLinkRef = useRef<HTMLAnchorElement>(null);
    const titleH1Ref = useRef<HTMLHeadingElement>(null);


    const handleVoiceChange = (voice: string) => {
        setSelectedVoice(voice);

        const firstPlayer = Object.keys(videoData?.[voice] || {})[0] || '';
        const episodes = videoData?.[voice]?.[firstPlayer] || [];
        const firstEpisode = episodes[0]?.episode || '';
        const iframe = episodes[0]?.iframe_url?.startsWith('http')
            ? episodes[0]?.iframe_url
            : 'https:' + episodes[0]?.iframe_url;

        setSelectedPlayer(firstPlayer);
        setSelectedEpisode(firstEpisode);
        setSelectedIframeUrl(iframe || '');
    };

    const handlePlayerChange = (player: string) => {
        setSelectedPlayer(player);

        const episodes = videoData?.[selectedVoice]?.[player] || [];
        const firstEpisode = episodes[0]?.episode || '';
        const iframe = episodes[0]?.iframe_url?.startsWith('http')
            ? episodes[0]?.iframe_url
            : 'https:' + episodes[0]?.iframe_url;

        setSelectedEpisode(firstEpisode);
        setSelectedIframeUrl(iframe || '');
    };

    const handleEpisodeChange = (episode: string) => {
        setSelectedEpisode(episode);

        const ep = videoData?.[selectedVoice]?.[selectedPlayer]?.find(e => e.episode === episode);
        const iframe = ep?.iframe_url?.startsWith('http')
            ? ep.iframe_url
            : 'https:' + ep?.iframe_url;

        setSelectedIframeUrl(iframe || '');
    };


    useEffect(() => {
        if (!id) {
            setError("Неверный ID аниме.");
            setLoading(false);
            return;
        }

        const currentId = id;
        if (prevIdRef.current !== currentId) {
            prevIdRef.current = currentId;

            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api.yamka.tv/update/anime/data/${id}`);
                    if (!response.ok) throw new Error("HTTP error: " + response.status);

                    const result: AnimeApiResponse = await response.json();
                    const data = result.anime_data;
                    const videos = result.anime_videos;

                    setAnimeData(data);
                    setVideoData(videos);

                    // Обновление истории
                    if (data) {
                        const history: HistoryEntry[] = JSON.parse(localStorage.getItem('History') || '[]');
                        const existingIndex = history.findIndex((item) => item.anime_url === data.anime_url);

                        if (existingIndex !== -1) {
                            history.splice(existingIndex, 1);
                        }

                        const newEntry: HistoryEntry = {
                            title: data.title,
                            anime_url: data.anime_url,
                            poster_url: data.poster_url,
                        };
                        history.unshift(newEntry);

                        if (history.length > 100) {
                            history.pop();
                        }

                        localStorage.setItem('History', JSON.stringify(history));
                    }

                    // Установка начальных значений для селекторов видео
                    if (videos && Object.keys(videos).length > 0) {
                        const voices = Object.keys(videos);
                        const defaultVoice = voices[0] || '';
                        const players = defaultVoice ? Object.keys(videos[defaultVoice]) : [];
                        const defaultPlayer = players[0] || '';
                        const episodes = defaultVoice && defaultPlayer ? videos[defaultVoice][defaultPlayer] : [];
                        const defaultEpisode = episodes[0]?.episode || '';
                        const defaultIframeUrl = episodes[0]?.iframe_url?.startsWith('http')
                            ? episodes[0]?.iframe_url
                            : 'https:' + episodes[0]?.iframe_url;

                        setSelectedVoice(defaultVoice);
                        setSelectedPlayer(defaultPlayer);
                        setSelectedEpisode(defaultEpisode);
                        setSelectedIframeUrl(defaultIframeUrl || '');
                    } else {
                         setVideoData(null); // Устанавливаем null, если видеоданные отсутствуют или пусты
                    }


                } catch {
                    setError("Не удалось загрузить данные.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (videoData && selectedVoice && selectedPlayer && selectedEpisode) {
            const epList = videoData[selectedVoice]?.[selectedPlayer] || [];
            const ep = epList.find(e => e.episode === selectedEpisode);
            if (ep) {
                setSelectedIframeUrl(ep.iframe_url.startsWith('http') ? ep.iframe_url : 'https:' + ep.iframe_url);
            }
        }
    }, [selectedVoice, selectedPlayer, selectedEpisode, videoData]);


    const voices = videoData ? Object.keys(videoData) : [];
    const players = selectedVoice && videoData ? Object.keys(videoData[selectedVoice] || {}) : [];
    const episodes =
        selectedVoice && selectedPlayer && videoData
            ? videoData[selectedVoice]?.[selectedPlayer]?.map(e => e.episode) || []
            : [];

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
    }, [animeData]);

    useEffect(() => {
        const descEl = descElRef.current;
        const DEFAULT_HEIGHT = 65;

        if (descEl && descEl.scrollHeight > DEFAULT_HEIGHT + 5) {
            setShowToggleBtn(true);
        } else {
            setShowToggleBtn(false);
        }
        setIsDescriptionExpanded(false); // Сбрасываем состояние развернутости при смене аниме
    }, [animeData]);


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
            />
            <Block className={styles.animeBlock}>
                <ins data-pm-b="728x90"></ins>
                <img
                    src={animeData.poster_url || poster}
                    className={`${styles.poster} ${isDescriptionExpanded && infoElRef.current && infoElRef.current.offsetHeight > 200 ? styles.rounded : ''}`}
                    ref={posterElRef}
                    alt="Постер аниме"
                />
                <div className={styles.info} ref={infoElRef}>
                    <h1 ref={titleH1Ref}>
                        <a
                            ref={titleLinkRef}
                            href={ `https://yani.tv/catalog/item/${animeData.anime_url}`}
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
                        style={{ maxHeight: isDescriptionExpanded ? 'none' : '65px' }} // Применяем стиль здесь
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

        </main>
    );
};

export default AnimePage;
