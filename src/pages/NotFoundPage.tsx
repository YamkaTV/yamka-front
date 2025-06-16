import React from 'react';
import '../scss/_notfound.scss';

const NotFoundPage: React.FC = () => {
    return (
        <div className="notFoundContainer">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <a href="/" className="homeLink">Вернуться на главную</a>
        </div>
    );
};

export default NotFoundPage;