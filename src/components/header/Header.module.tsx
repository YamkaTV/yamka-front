import React from 'react';

import styles from './Header.module.scss';
import ColorLogo from '../../assets/ColorLogo.svg';
import LogoMini from '../../assets/logoMini.svg';
import RandomButton from '@components/ui/RandomButton';
import SearchInput from "@components/search/SearchInput";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoBig}>
                <Link to="/">
                    <img src={ColorLogo} alt="Логотип" width="278" height="75" />
                </Link>
            </div>

            <div className={styles.logoMini}>
                <Link to="/">
                    <img src={LogoMini} alt="Логотип" width="75" height="75" />
                </Link>
            </div>

            <SearchInput />

            <nav>
                <RandomButton />
                <Link to="/history">
                    <button>История</button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
