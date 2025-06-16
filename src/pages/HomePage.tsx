import React, { useEffect } from 'react';
import BigLogo from '../assets/BigLogo.svg';
import RandomButton from '@components//ui/RandomButton';
import SearchInput from '@components//ui/SearchInput';
import {Link} from "react-router-dom";
import { seoPages } from '../seoConfig';

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = seoPages.home.title;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', seoPages.home.description);
    }, []);

    return (
        <>
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
