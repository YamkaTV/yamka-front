interface SeoConfig {
    title: string;
    description: string;
    noindex?: boolean;
}

interface SeoPages {
    [key: string]: SeoConfig;
}

export const seoPages: SeoPages = {
    anime: {
        title: "Смотреть аниме: {animeTitle} онлайн бесплатно",
        description: "Смотрите аниме {animeTitle} онлайн бесплатно. Все серии в хорошем качестве, русская озвучка и субтитры. Описание, жанры, рейтинг и многое другое."
    },
    history: {
        title: "История просмотров - YamkaTV",
        description: "Просматривайте историю своих просмотров аниме на YamkaTV. Легко находите то, что вы уже смотрели.",
        noindex: true 
    },
    home: {
        title: "YamkaTV - Смотреть аниме онлайн бесплатно",
        description: "Смотрите любимое аниме онлайн бесплатно в высоком качестве на YamkaTV. Большая коллекция аниме сериалов и фильмов с русской озвучкой и субтитрами."
    },
    notFound: {
        title: "Страница не найдена - YamkaTV",
        description: "Извините, запрашиваемая страница не найдена. Пожалуйста, проверьте URL или вернитесь на главную страницу.",
        noindex: true 
    },
    privacy: {
        title: "Политика конфиденциальности - YamkaTV",
        description: "Ознакомьтесь с политикой конфиденциальности YamkaTV. Узнайте, как мы собираем, используем и защищаем ваши данные."
    },
    search: {
        title: "Поиск аниме: {query} - YamkaTV",
        description: "Результаты поиска аниме по запросу «{query}» на YamkaTV. Найдите свое любимое аниме.",
        noindex: true 
    },
    terms: {
        title: "Условия использования - YamkaTV",
        description: "Ознакомьтесь с условиями использования сервиса YamkaTV. Правила и положения для пользователей."
    },

};