import React from 'react';
import BigLogo from '../assets/BigLogo.svg';
import RandomButton from '@components//ui/RandomButton.tsx';
import SearchInput from '@components//ui/SearchInput.tsx';

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
                    <button onClick={() => window.location.href = '/history'}>История</button>
                </nav>
            </main>
        </>
    );
};

export default HomePage;
