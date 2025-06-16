import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import AnimePage from '../pages/AnimePage/AnimePage';
import HistoryPage from '../pages/HistoryPage/HistoryPage';
import HomePage from '../pages/HomePage/HomePage';
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import TermsPage from "../pages/TermsPage/TermsPage";
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import HeaderModule from '@components/header/Header.module';
import FooterModule from '@components/footer/Footer.module';
import TopProgressBar from '@components/ui/ProgressBar';
import homePageStyles from '../pages/HomePage/HomePage.module.scss';


const App: React.FC = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    return (
        <>
            <TopProgressBar />
            {isHomePage ? (
                <div className={`container ${homePageStyles.homeContainer}`}>
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
