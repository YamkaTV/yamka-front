import React from 'react';
import styles from './Catalog.module.scss';

interface CatalogItem {
    id: string;
    title: string;
    poster: string;
    link: string;
}

interface CatalogProps {
    title?: string;
    description?: string;
    items: CatalogItem[];
}

const Catalog: React.FC<CatalogProps> = ({ title, description, items }) => {
    return (
        <div className={styles.containerCatalog}>
            {title && <h1>{title}</h1>}
            {description && <p>{description}</p>}
            <ul className={styles.catalogResults}>
                {items.map((item) => (
                    <li key={item.id} className={styles.resultItem}>
                        <a href={item.link} className={styles.resultLink}>
                            <img src={item.poster} alt={item.title} className={styles.resultPoster} />
                            <div className={styles.resultTitleWrapper}>
                                <h2 className={styles.resultTitle}>{item.title}</h2>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Catalog;