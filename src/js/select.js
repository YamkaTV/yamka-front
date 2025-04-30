document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const items = select.querySelector('.select-items');
        const options = select.querySelectorAll('.select-item');
        const nativeSelect = select.querySelector('.select-native');

        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            items.style.display = items.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selected.querySelector('.select-placeholder').textContent = this.textContent;
                nativeSelect.value = this.dataset.value;
                items.style.display = 'none';
                selected.classList.remove('active');

                const event = new Event('change');
                nativeSelect.dispatchEvent(event);
            });
        });
    });

    document.addEventListener('click', closeAllSelect);
});

function closeAllSelect(element) {
    const selects = document.querySelectorAll('.select-items');
    const activeButtons = document.querySelectorAll('.select-selected.active');

    selects.forEach(item => {
        if (element && item.previousElementSibling === element) return;
        item.style.display = 'none';
    });

    activeButtons.forEach(button => {
        if (element && button === element) return;
        button.classList.remove('active');
    });
}