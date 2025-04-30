(function() {
    const metrikaId = 101420919;
    const metrikaUrl = 'https://mc.yandex.ru/metrika/tag.js';
    const ymFunction = 'ym';

    function loadMetrika() {
        if (window[ymFunction]) return;

        window[ymFunction] = function() {
            (window[ymFunction].a = window[ymFunction].a || []).push(arguments);
        };
        window[ymFunction].l = Date.now();

        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = metrikaUrl;
        script.onload = function() {
            window[ymFunction](metrikaId, 'init', {
                clickmap: false,
                trackLinks: true,
                accurateTrackBounce: false,
                webvisor: false
            });
        };
        script.onerror = function() {
            console.warn('Яндекс метрика заблокирована!');
        };

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMetrika);
    } else {
        loadMetrika();
    }
})();
