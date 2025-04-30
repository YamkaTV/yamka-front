window.addEventListener('DOMContentLoaded', () => {
    const titleLink = document.getElementById('animeLink');
    const titleH1 = document.getElementById('animeTitle');
    const lineHeight = parseFloat(getComputedStyle(titleLink).lineHeight);
    const height = titleLink.offsetHeight;

    if (height > lineHeight * 1.5) {
        titleH1.classList.add('long');
    }
});
