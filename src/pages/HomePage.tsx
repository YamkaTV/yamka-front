import React from 'react';
import BigLogo from '../assets/BigLogo.svg';
import RandomButton from '@components//ui/RandomButton.tsx';
import SearchInput from '@components//ui/SearchInput.tsx';
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
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
