function addToHistory(anime_id, title, poster_url) {
    let history = JSON.parse(localStorage.getItem("anime_history")) || [];

    const existingIndex = history.findIndex(item => item.anime_id === anime_id);

    if (existingIndex !== -1) {
        history[existingIndex].title = title;
        history[existingIndex].poster_url = poster_url;
    } else {
        history.push({
            anime_id: anime_id,
            title: title,
            poster_url: poster_url
        });
        if (history.length > 100) {
            history.shift();
        }
    }
    localStorage.setItem("anime_history", JSON.stringify(history));
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem("anime_history")) || [];

    if (history.length === 0) {
        document.getElementById("history").innerHTML = "<p>История не найдена.</p>";
        return;
    }

    history.reverse();

    let historyHTML = history.map(item => {
        let truncatedTitle = item.title.length > 35 ? item.title.slice(0, 35) + '...' : item.title;

        return `
            <a href="/anime/${item.anime_id}" class="anime-card">
                <img src="${item.poster_url}" alt="${item.title}">
                <div class="anime-title">
                    ${truncatedTitle}
                </div>
            </a>
        `;
    }).join('');

    document.getElementById("history").innerHTML = historyHTML;
}

// displayHistory();