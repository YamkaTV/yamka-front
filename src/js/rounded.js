document.addEventListener('DOMContentLoaded', () => {
    const infoEl = document.querySelector('.info');
    const posterEl = document.getElementById('animePoster');

    if (infoEl && posterEl && infoEl.offsetHeight > 230) {
        posterEl.classList.add('rounded2');
    }
});
