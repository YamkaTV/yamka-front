import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AnimePage from '../pages/AnimePage';
import HistoryPage from '../pages/HistoryPage';
import HomePage from '../pages/HomePage';
import PrivacyPage from "../pages/PrivacyPage";
import SearchPage from "../pages/SearchPage";
import TermsPage from "../pages/TermsPage";
import HeaderModule from '@components/header/Header.module.tsx';
import FooterModule from '@components/footer/Footer.module.tsx';
import YandexMetrika from '@components/yandex-metrika/YandexMetrika.tsx';

const App: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.ym) {
            window.ym(101420919, 'hit', { page: location.pathname });
        }
    }, [location]);

    return (
        <>
            <div className="container">
                <HeaderModule />
                <Routes>
                    <Route path="/anime" element={<AnimePage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                </Routes>
            </div>
            <FooterModule />
            <YandexMetrika />
        </>
    );
};

export default App;
