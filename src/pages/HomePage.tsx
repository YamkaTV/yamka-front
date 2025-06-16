import React from 'react';
import BigLogo from '../assets/BigLogo.svg';
import RandomButton from '@components//ui/RandomButton';
import SearchInput from '@components//ui/SearchInput';
import {Link} from "react-router-dom";
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';

const HomePage: React.FC = () => {
    return (
        <>
            <SeoHead
                title={seoPages.home.title}
                description={seoPages.home.description}
                noindex={seoPages.home.noindex}
            />
            <main className="main">
                <div className="bigLogo">
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
