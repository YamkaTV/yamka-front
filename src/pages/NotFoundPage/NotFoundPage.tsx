import React from 'react';
import { seoPages } from '@components/seo/seoConfig'; // Обновлен путь
import SeoHead from '@components/seo/SeoHead'; // Обновлен путь
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
    return (
        <>
            <SeoHead
                title={seoPages.notFound.title}
                description={seoPages.notFound.description}
                noindex={seoPages.notFound.noindex}
            />
            <div className={styles.notFoundContainer}>
                <h1>404</h1>
                <p>Страница не найдена</p>
                <a href="/" className={styles.homeLink}>Вернуться на главную</a>
            </div>
        </>
    );
};

export default NotFoundPage;