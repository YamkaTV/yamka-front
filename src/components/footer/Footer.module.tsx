import React from 'react';
import styles from './Footer.module.scss';
import GrayLogo from '../../assets/GrayLogo.svg';

const FooterModule: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.links}>
                    <a href="/privacy" className={styles.link}>Политика конфиденциальности</a>
                    <a href="/terms" className={styles.link}>Условия использования</a>
                </div>

                <div className={styles.logo}>
                    <img src={GrayLogo} alt="Логотип" width="278" height="75" />
                </div>

                <div className={styles.contacts}>
                    <div className={styles.text}>Почта для связи: <a href="mailto:support@yamka.tv" className={styles.emailLink}
                                                                     title="Написать в поддержку"
                                                                     aria-label="Написать на support@yamka.tv">support@yamka.tv</a>
                    </div>
                    <a href="https://t.me/yamkaTV" className={styles.link} target="_blank" rel="noopener noreferrer"
                       aria-label="Переход в Telegram канал сайта" title="Telegram канал сайта">Новости сайта в
                        Telegram</a>
                </div>
            </div>

            <div className={styles.copyright}>
                <span className={styles.title}>© 2025 <span className={styles.brand}>YamkaTV</span>. Все права защищены.</span>
            </div>
        </footer>
    );
};

export default FooterModule;
