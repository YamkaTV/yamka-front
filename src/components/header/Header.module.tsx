import React from 'react';
import '../../scss/main.scss';
import styles from './Header.module.scss';
import ColorLogo from '../../assets/ColorLogo.svg';
import LogoMini from '../../assets/LogoMini.svg';
import RandomButton from '@components/ui/RandomButton.tsx';

const Header: React.FC = () => {
    const toggleSearchButton = () => {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        const searchButton = document.getElementById('search-button') as HTMLButtonElement;
        if (searchInput && searchButton) {
            searchButton.disabled = searchInput.value.trim() === '';
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoBig}>
                <a href="/">
                    <img src={ColorLogo} alt="Логотип" width="278" height="75" />
                </a>
            </div>

            <div className={styles.logoMini}>
                <a href="/">
                    <img src={LogoMini} alt="Логотип" width="75" height="75" />
                </a>
            </div>

            <div className={`search ${styles.search}`}>
                <input
                    type="text"
                    aria-label="Поиск по сайту"
                    id="search-input"
                    placeholder="Поиск..."
                    onInput={toggleSearchButton}
                />

            </div>

            <nav>
                <RandomButton />
                <button onClick={() => window.location.href = '/history'}>История</button>
            </nav>
        </header>
    );
};

export default Header;
