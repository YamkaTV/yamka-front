import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomButton: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await fetch('https://api.yamka.tv/update/anime/random');
            if (!response.ok) throw new Error('Ошибка получения случайного аниме');

            const data = await response.json();

            navigate(`/anime/${data.anime_url}`, { state: { animeData: data } });
        } catch (err) {
            console.error('Ошибка при переходе на случайное аниме:', err);
        } finally {
            setTimeout(() => setIsLoading(false), 200);
        }
    };

    return (
        <button onClick={handleClick} disabled={isLoading}>
            Случайное
        </button>
    );
};

export default RandomButton;
