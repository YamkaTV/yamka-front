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
import JsonLdScript from '@components/seo/JsonLdScript'; // Импорт JsonLdScript
import homePageStyles from '../pages/HomePage/HomePage.module.scss';


const App: React.FC = () => {
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    // Генерация данных для BreadcrumbList
    const generateBreadcrumbSchema = () => {
        const pathnames = location.pathname.split('/').filter(x => x);
        const breadcrumbListItems = pathnames.map((name, index) => {
            const url = `https://yamka.tv/${pathnames.slice(0, index + 1).join('/')}`;
            const item = {
                "@type": "ListItem",
                "position": index + 1,
                "name": name.charAt(0).toUpperCase() + name.slice(1), // Простая капитализация
                "item": url
            };
            return item;
        });

        // Добавляем главную страницу как первый элемент
        const homeBreadcrumb = {
            "@type": "ListItem",
            "position": 1,
            "name": "Главная",
            "item": "https://yamka.tv/"
        };

        const finalBreadcrumbList = [homeBreadcrumb, ...breadcrumbListItems];

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": finalBreadcrumbList
        };
    };

    return (
        <>
            <TopProgressBar />
            {!isHomePage && <JsonLdScript data={generateBreadcrumbSchema()} />} {/* Добавляем BreadcrumbList для всех страниц, кроме главной */}
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
