import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

interface AnimeData {
    anime_url: string;
    title: string;
    description: string;
    rating: number;
    other_titles?: string[];
    poster_url: string;
    status: string;
    viewing_order: any[];
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

interface AnimeDataLoaderProps {
    children: (data: {
        animeData: AnimeData | null;
        videoData: AnimeVideos | null;
        loading: boolean;
        error: string | null;
        cleanString: (str: string) => string;
        selectedVoice: string;
        selectedPlayer: string;
        selectedEpisode: string;
        selectedIframeUrl: string;
        handleVoiceChange: (voice: string) => void;
        handlePlayerChange: (player: string) => void;
        handleEpisodeChange: (episode: string) => void;
        voices: string[];
        players: string[];
        episodes: string[];
    }) => React.ReactNode;
}

const cleanString = (str: string) => {
    return str.replace(/Озвучка|Плеер/g, '').trim();
};

const AnimeDataLoader: React.FC<AnimeDataLoaderProps> = ({ children }) => {
    const { animeUrl } = useParams<{ animeUrl: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [animeData, setAnimeData] = useState<AnimeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('');
    const [selectedEpisode, setSelectedEpisode] = useState('');
    const [videoData, setVideoData] = useState<AnimeVideos | null>(null);
    const [selectedIframeUrl, setSelectedIframeUrl] = useState('');

    const prevAnimeUrlRef = useRef<string | null>(null);

    const handleVoiceChange = (voice: string) => {
        setSelectedVoice(voice);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('voice', cleanString(voice));

        const firstPlayer = Object.keys(videoData?.[voice] || {})[0] || '';
        newSearchParams.set('player', cleanString(firstPlayer));

        const episodes = videoData?.[voice]?.[firstPlayer] || [];
        const firstEpisode = episodes[0]?.episode || '';
        newSearchParams.set('episode', firstEpisode);

        setSearchParams(newSearchParams);
    };

    const handlePlayerChange = (player: string) => {
        setSelectedPlayer(player);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('player', cleanString(player));

        const episodes = videoData?.[selectedVoice]?.[player] || [];
        const firstEpisode = episodes[0]?.episode || '';
        newSearchParams.set('episode', firstEpisode);

        setSearchParams(newSearchParams);
    };

    const handleEpisodeChange = (episode: string) => {
        setSelectedEpisode(episode);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('episode', episode);
        setSearchParams(newSearchParams);
    };

    useEffect(() => {
        if (!animeUrl) {
            setError("Неверный URL аниме.");
            setLoading(false);
            return;
        }

        const currentAnimeUrl = animeUrl;
        if (prevAnimeUrlRef.current !== currentAnimeUrl) {
            prevAnimeUrlRef.current = currentAnimeUrl;

            const fetchData = async () => {
                try {
                    const isNumericId = /^\d+$/.test(currentAnimeUrl);
                    const response = await fetch(`https://api.yamka.tv/update/anime/data/${currentAnimeUrl}`);
                    if (!response.ok) throw new Error("HTTP error: " + response.status);

                    const result: AnimeApiResponse = await response.json();
                    const data = result.anime_data;
                    const videos = result.anime_videos;

                    if (isNumericId && data.anime_url && data.anime_url !== currentAnimeUrl) {
                        navigate(`/anime/${data.anime_url}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`, { replace: true });
                        return;
                    }

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
                        const urlVoice = searchParams.get('voice');
                        const urlPlayer = searchParams.get('player');
                        const urlEpisode = searchParams.get('episode');

                        let defaultVoice = Object.keys(videos)[0] || '';
                        let defaultPlayer = '';
                        let defaultEpisode = '';
                        let defaultIframeUrl = '';

                        // Поиск озвучки
                        if (urlVoice) {
                            const foundVoice = Object.keys(videos).find(v => cleanString(v) === urlVoice);
                            if (foundVoice) {
                                defaultVoice = foundVoice;
                            }
                        }

                        // Поиск плеера
                        const playersForVoice = videos[defaultVoice] ? Object.keys(videos[defaultVoice]) : [];
                        if (urlPlayer) {
                            const foundPlayer = playersForVoice.find(p => cleanString(p) === urlPlayer);
                            if (foundPlayer) {
                                defaultPlayer = foundPlayer;
                            } else {
                                defaultPlayer = playersForVoice[0] || '';
                            }
                        } else {
                            defaultPlayer = playersForVoice[0] || '';
                        }

                        // Поиск эпизода
                        const episodesForPlayer = videos[defaultVoice]?.[defaultPlayer] || [];
                        const episodeExists = episodesForPlayer.some(ep => ep.episode === urlEpisode);

                        if (urlEpisode && episodeExists) {
                            defaultEpisode = urlEpisode;
                        } else {
                            defaultEpisode = episodesForPlayer[0]?.episode || '';
                        }

                        const finalEpisode = episodesForPlayer.find(ep => ep.episode === defaultEpisode);
                        defaultIframeUrl = finalEpisode?.iframe_url?.startsWith('http')
                            ? finalEpisode.iframe_url
                            : 'https:' + finalEpisode?.iframe_url;


                        setSelectedVoice(defaultVoice);
                        setSelectedPlayer(defaultPlayer);
                        setSelectedEpisode(defaultEpisode);
                        setSelectedIframeUrl(defaultIframeUrl || '');

                        // Обновляем URL, если параметры не соответствуют текущим выбранным
                        const currentVoiceParam = searchParams.get('voice');
                        const currentPlayerParam = searchParams.get('player');
                        const currentEpisodeParam = searchParams.get('episode');

                        if (cleanString(defaultVoice) !== currentVoiceParam || cleanString(defaultPlayer) !== currentPlayerParam || defaultEpisode !== currentEpisodeParam) {
                            const newSearchParams = new URLSearchParams();
                            newSearchParams.set('voice', cleanString(defaultVoice));
                            newSearchParams.set('player', cleanString(defaultPlayer));
                            newSearchParams.set('episode', defaultEpisode);
                            navigate(`?${newSearchParams.toString()}`, { replace: true });
                        }

                    } else {
                         setVideoData(null);
                    }


                } catch {
                    setError("Не удалось загрузить данные.");
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [animeUrl, searchParams, navigate]);

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

    return children({
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
    });
};

export default AnimeDataLoader;