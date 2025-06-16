import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import AnimePage from '../pages/AnimePage';
import HistoryPage from '../pages/HistoryPage';
import HomePage from '../pages/HomePage';
import PrivacyPage from "../pages/PrivacyPage";
import SearchPage from "../pages/SearchPage";
import TermsPage from "../pages/TermsPage";
import NotFoundPage from '../pages/NotFoundPage';
import HeaderModule from '@components/header/Header.module';
import FooterModule from '@components/footer/Footer.module';
import TopProgressBar from '@components/ui/ProgressBar';


const App: React.FC = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <>
            <TopProgressBar />
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
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            )}
            <FooterModule />
        </>
    );
};

export default App;
