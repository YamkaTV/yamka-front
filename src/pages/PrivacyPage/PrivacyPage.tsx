import React from 'react';
import { seoPages } from '@components/seo/seoConfig';
import SeoHead from '@components/seo/SeoHead';
import JsonLdScript from '@components/seo/JsonLdScript'; // Импорт нового компонента
import Block from '../../components/block/Block';

const PrivacyPage: React.FC = () => {
    const privacySchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": seoPages.privacy.title,
        "description": seoPages.privacy.description,
        "url": "https://yamka.tv/privacy"
    };

    return (
        <main>
            <SeoHead
                title={seoPages.privacy.title}
                description={seoPages.privacy.description}
                noindex={seoPages.privacy.noindex}
            />
            <JsonLdScript data={privacySchema} /> {/* Использование нового компонента */}
            <Block>
                <h2>Политика конфиденциальности</h2>
                <p>Последнее обновление: 25.04.2025</p>
                <p>Настоящая Политика конфиденциальности описывает, какие данные собирает сайт YamkaTV (yamka.tv), и как
                    они используются.</p>
                <br/>

                <h3>1. Сбор данных</h3>
                <p>Мы можем автоматически собирать следующие данные:</p>
                <ul>
                    <li>IP-адреса пользователей;</li>
                    <li>Количество пользователей, находящихся на сайте в текущий момент.</li>
                </ul>
                <p>Также на сайте используется Яндекс.Метрика — аналитический инструмент, который может собирать
                    технические данные о посещении сайта.
                    Используя сайт, вы соглашаетесь с передачей данных в соответствии с политикой конфиденциальности
                    Яндекс.Метрики.</p>

                <h3>2. Использование данных</h3>
                <p>Собранные данные используются исключительно для:</p>
                <ul>
                    <li>Анализа текущей нагрузки на сайт;</li>
                    <li>Обеспечения стабильной работы сервиса.</li>
                </ul>

                <h3>3. Передача данных третьим лицам</h3>
                <p>YamkaTV напрямую не передаёт собранные данные третьим лицам, за исключением случаев, когда этого
                    требует законодательство.
                    Использование Яндекс.Метрики предполагает автоматическую передачу обезличенной информации
                    соответствующему сервису.</p>

                <h3>4. Безопасность</h3>
                <p>Мы прилагаем усилия для защиты данных от несанкционированного доступа, но не можем гарантировать
                    абсолютную безопасность.</p>

                <h3>5. Контакты</h3>
                <p>По вопросам, связанным с конфиденциальностью, вы можете связаться с нами по
                    email: <a href="mailto:support@yamka.tv" className="emailLink" title="Написать в поддержку"
                               aria-label="Написать на support@yamka.tv">support@yamka.tv</a></p>
            </Block>
        </main>
    );
};

export default PrivacyPage;
