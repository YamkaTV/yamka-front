(async function() {
    try {
        console.log("Запрос данных аниме для ID:", anime_id);

        const response = await fetch(`https://api.yamka.tv/anime/data/${anime_id}`);
        if (!response.ok) {
            throw new Error("Ошибка при получении данных аниме: HTTP " + response.status);
        }
        const anime_data = await response.json();
        console.log("Данные аниме загружены:", anime_data);

        const linkEl = document.getElementById("animeLink");
        if (linkEl && anime_data.title) {
            linkEl.textContent = anime_data.title;
        } else {
            console.warn("Элемент #animeLink не найден или title отсутствует");
        }

        const ratingEl = document.getElementById("animeRating");
        if (ratingEl) {
            const rating = anime_data.rating;
            const rounded = (rating || rating === 0)
                ? (Math.round(rating * 10) / 10).toFixed(1)
                : "Нет оценки";
            ratingEl.textContent = rounded;
        } else {
            console.warn("Элемент #animeRating не найден");
        }

        const posterImg = document.getElementById("animePoster");
        if (posterImg) {
            const posterUrl = anime_data.poster_url;
            if (posterUrl) {
                posterImg.src = posterUrl;
            } else {
                posterImg.alt = "Постер недоступен";
                posterImg.src = "../static/images/poster.png";
                console.warn("poster_url отсутствует в данных");
            }
        } else {
            console.warn("Элемент #animePoster не найден");
        }

        const event = new CustomEvent("animeDataLoaded", { detail: anime_data });
        window.dispatchEvent(event);

    } catch (error) {
        console.error("Ошибка загрузки данных аниме:", error);
    }
})();
