import React, { useEffect } from 'react';

interface SeoHeadProps {
    title: string;
    description: string;
    noindex?: boolean;
    canonicalUrl?: string; // Добавлен опциональный пропс для канонического URL
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, noindex, canonicalUrl }) => {
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
            metaRobots.setAttribute('content', 'index, follow');
        }

        // Добавление/обновление канонического URL
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (canonicalUrl) {
            if (!linkCanonical) {
                linkCanonical = document.createElement('link');
                linkCanonical.setAttribute('rel', 'canonical');
                document.head.appendChild(linkCanonical);
            }
            linkCanonical.setAttribute('href', canonicalUrl);
        } else {
            // Если canonicalUrl не передан, удаляем существующий тег link canonical
            if (linkCanonical) {
                document.head.removeChild(linkCanonical);
            }
        }

    }, [title, description, noindex, canonicalUrl]); // Добавлен canonicalUrl в зависимости

    return null;
};

export default SeoHead;