import React from 'react';
import BigLogo from '../../assets/BigLogo.svg';
import RandomButton from '@components//ui/RandomButton';
import SearchInput from '@components/search/SearchInput';
import {Link} from "react-router-dom";
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import JsonLdScript from '@components/seo/JsonLdScript'; // Импорт нового компонента
import Styles from './HomePage.module.scss';

const HomePage: React.FC = () => {
    const { homeContainer, bigLogo } = Styles;

    const homePageSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "YamkaTV",
        "url": "https://yamka.tv/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://yamka.tv/search?text={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <>
            <SeoHead
                title={seoPages.home.title}
                description={seoPages.home.description}
                noindex={seoPages.home.noindex}
            />
            <JsonLdScript data={homePageSchema} /> {/* Использование нового компонента */}
            <main className={homeContainer}>
                <div className={bigLogo}>
                    <img src={BigLogo} alt="Логотип" width="654" height="536"/>
                </div>

                <SearchInput />

                <nav>
                    <RandomButton />
                    <Link to="/history">
                        <button>История</button>
                    </Link>
                </nav>
            </main>
        </>
    );
};

export default HomePage;
