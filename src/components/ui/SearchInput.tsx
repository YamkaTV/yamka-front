import React, { useState, useRef } from 'react';

const SearchInput: React.FC = () => {
    const [showButton, setShowButton] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => setShowButton(true);
    const handleBlur = () => {
        if (inputRef.current?.value.trim() === '') {
            setShowButton(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowButton(e.target.value.trim() !== '');
    };

    const handleSearch = () => {
        const value = inputRef.current?.value.trim();
        if (value) {
            window.location.href = `/search?text=${encodeURIComponent(value)}`;
        }
    };

    return (
        <div className="search">
            <input
                type="text"
                ref={inputRef}
                placeholder="Поиск..."
                aria-label="Поиск"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            {showButton && (
                <button className="search-button" onMouseDown={handleSearch}>
                    Найти
                </button>
            )}
        </div>
    );
};

export default SearchInput;
