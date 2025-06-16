import React, { useEffect } from 'react';

interface SeoHeadProps {
    title: string;
    description: string;
    noindex?: boolean;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, noindex }) => {
    useEffect(() => {
        document.title = title;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
            metaRobots = document.createElement('meta');
            metaRobots.setAttribute('name', 'robots');
            document.head.appendChild(metaRobots);
        }

        if (noindex) {
            metaRobots.setAttribute('content', 'noindex, nofollow');
        } else {
            // Если noindex не установлен или false, убедимся, что тег robots не запрещает индексацию
            // Можно удалить тег или установить content в 'index, follow'
            metaRobots.setAttribute('content', 'index, follow');
        }
    }, [title, description, noindex]);

    return null; // Этот компонент не рендерит ничего в DOM
};

export default SeoHead;