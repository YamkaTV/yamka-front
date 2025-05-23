import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <main className="main">
            <div className="block">
                <h2>Условия использования</h2>
                <p>Последнее обновление: 25.04.2025</p>
                <p>Используя сайт, вы соглашаетесь с данными условиями. Если вы не согласны — пожалуйста, не используйте
                    наш сервис.</p>
                <br/>

                <h3>1. Назначение сайта</h3>
                <p>YamkaTV предоставляет доступ к просмотру и поиску аниме. Все функции доступны бесплатно.</p>

                <h3>2. Пользование сайтом</h3>
                <h5 className="mainAccent">Разрешается:</h5>
                <ul>
                    <li>Искать и смотреть контент, размещённый на сайте.</li>
                </ul>
                <h5 className="mainAccent">Запрещается:</h5>
                <ul>
                    <li>Использовать сайт не по назначению;</li>
                    <li>Пытаться взломать сайт, использовать уязвимости, запускать скрипты для нарушения работы;</li>
                    <li>Проводить DDoS-атаки или другие действия, мешающие нормальной работе ресурса;</li>
                    <li>Использовать сайт в нарушение законов вашей страны.</li>
                </ul>

                <h3>3. Ответственность</h3>
                <p>Сайт предоставляется "как есть", без каких-либо гарантий. Мы не несём ответственности за:</p>
                <ul>
                    <li>Технические сбои;</li>
                    <li>Возможные убытки, возникшие в результате использования сайта;</li>
                    <li>Доступность или точность контента;</li>
                    <li>Любые действия третьих лиц.</li>
                </ul>

                <h3>4. Применимое право</h3>
                <p>Сайт доступен по всему миру. Пользователь сам отвечает за соблюдение законодательства своей страны.
                    Использование сайта на свой страх и риск.</p>

                <h3>5. Контакты</h3>
                <p>По всем юридическим и техническим вопросам вы можете связаться с нами по
                    email: <a href="mailto:support@yamka.tv" className="email-link" title="Написать в поддержку"
                              aria-label="Написать на support@yamka.tv">support@yamka.tv</a></p>
            </div>

        </main>
    );
};

export default TermsPage;
