document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("animeDataLoaded", (e) => {
        const anime_data = e.detail;
        console.log("toggle.js получил anime_data:", anime_data);

        const descEl = document.getElementById("animeDescription");
        const container = document.getElementById("animeDescriptionContainer");
        const infoEl = document.querySelector(".info");
        const posterEl = document.getElementById("animePoster");

        if (!descEl || !container) {
            console.error("Не найдены обязательные элементы #animeDescription или #animeDescriptionContainer");
            return;
        }

        if (anime_data.description) {
            descEl.textContent = anime_data.description;
        } else {
            console.warn("Описание аниме отсутствует в данных");
        }

        const DEFAULT_HEIGHT = 65;
        requestAnimationFrame(() => {
            if (descEl.scrollHeight > DEFAULT_HEIGHT + 5) {
                descEl.style.height = DEFAULT_HEIGHT + "px";
                descEl.style.overflow = "hidden";
                descEl.style.transition = "height 0.3s ease";

                const btn = document.createElement("button");
                btn.type = "button";
                btn.textContent = "Развернуть";
                btn.classList.add("toggle-btn");
                container.appendChild(btn);

                let expanded = false;

                btn.addEventListener("click", () => {
                    if (!expanded) {
                        const fullHeight = descEl.scrollHeight;
                        descEl.style.height = fullHeight + "px";
                        btn.textContent = "Свернуть";

                        if (posterEl && infoEl && infoEl.offsetHeight > 200) {
                            posterEl.classList.add("rounded");
                        }

                        setTimeout(() => {
                            descEl.style.height = "auto";
                        }, 300);
                    } else {
                        const currentHeight = descEl.scrollHeight;
                        descEl.style.height = currentHeight + "px";
                        void descEl.offsetHeight;

                        descEl.style.height = DEFAULT_HEIGHT + "px";
                        btn.textContent = "Развернуть";

                        if (posterEl) {
                            posterEl.classList.remove("rounded");
                        }
                    }
                    expanded = !expanded;
                });
            }
        });
    });
});
