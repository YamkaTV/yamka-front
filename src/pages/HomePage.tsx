import React from 'react';
import BigLogo from '../assets/BigLogo.svg';

const HomePage: React.FC = () => {
    return (
        <>
            <main className="main">
                <div className="bigLogo">
                    <img src={BigLogo} alt="Логотип" width="654" height="536"/>
                </div>

                <div className="search">
                    <input type="text" id="search-input" placeholder="Поиск..." aria-label="Поиск" onInput="toggleSearchButton()"/>
                </div>

                <nav>
                    <button onClick={() => window.location.href = '/anime'}>Случайное</button>
                    <button onClick={() => window.location.href = '/history'}>История</button>
                </nav>
            </main>
        </>
    );
};

export default HomePage;
