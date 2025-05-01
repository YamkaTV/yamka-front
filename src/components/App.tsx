import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import AnimePage from '../pages/AnimePage';
import HistoryPage from '../pages/HistoryPage';
import HomePage from '../pages/HomePage';
import PrivacyPage from "../pages/PrivacyPage";
import SearchPage from "../pages/SearchPage";
import TermsPage from "../pages/TermsPage";
import HeaderModule from '@components/header/Header.module.tsx';
import FooterModule from '@components/footer/Footer.module.tsx';

const App: React.FC = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <>
            {isHomePage ? (
                <div className="container homeContainer">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>
            ) : (
                <div className="container">
                    <HeaderModule />
                    <Routes>
                        <Route path="/anime/:id" element={<AnimePage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                    </Routes>
                </div>
            )}
            <FooterModule />
        </>
    );
};

export default App;
