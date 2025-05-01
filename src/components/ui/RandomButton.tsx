import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomButton: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await fetch('https://api.yamka.tv/anime/data/random');
            if (!response.ok) throw new Error('Ошибка получения случайного аниме');

            const data = await response.json();

            // Переход на страницу с передачей данных в state
            navigate(`/anime/${data.anime_id}`, { state: { animeData: data } });
        } catch (err) {
            console.error('Ошибка при переходе на случайное аниме:', err);
        } finally {
            setTimeout(() => setIsLoading(false), 500); // Имитация задержки
        }
    };

    return (
        <button onClick={handleClick} className="random-button" disabled={isLoading}>
            Случайное
        </button>
    );
};

export default RandomButton;
