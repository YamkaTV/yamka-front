import React, { useState, useRef } from 'react';
import styles from './SearchInput.module.scss';

const SearchInput: React.FC = () => {
    const [showButton, setShowButton] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { search, searchButton } = styles;

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={search}>
            <input
                type="text"
                ref={inputRef}
                placeholder="Поиск..."
                aria-label="Поиск"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {showButton && (
                <button
                    className={searchButton}
                    onMouseDown={handleSearch}
                    aria-label="Поиск"
                >
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path d="M21.8 20.7c.26.21.26.46 0 .72l-.37.38c-.27.27-.5.27-.73 0l-5.54-5.5a.55.55 0 0 1-.17-.38v-.42a8.27 8.27 0 0 1-2.75 1.75 9 9 0 0 1-3.3.6c-1.2.01-2.4-.22-3.49-.67a8.16 8.16 0 0 1-2.83-1.94A8.6 8.6 0 0 1 0 8.94a8.6 8.6 0 0 1 2.62-6.32A8.16 8.16 0 0 1 5.45.68 8.97 8.97 0 0 1 8.94 0c2.44 0 4.56.88 6.3 2.62a8.6 8.6 0 0 1 2.62 6.31c0 2.31-.78 4.34-2.36 6.05h.43c.15 0 .27.06.39.18l5.5 5.53h-.01ZM3.6 14.26l1.1 1.1c.73.75 2.15 1.1 4.24 1.1 2.07 0 3.86-.73 5.34-2.2a7.27 7.27 0 0 0 2.2-5.34 7.27 7.27 0 0 0-2.2-5.34 6.9 6.9 0 0 0-2.4-1.65 7.58 7.58 0 0 0-2.96-.56c-2.09 0-3.87.73-5.35 2.2a7.27 7.27 0 0 0-2.2 5.35 7.27 7.27 0 0 0 2.2 5.34h.03Z" fill="#FFECD3"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h22v22H0z"/></clipPath></defs></svg>
                </button>
            )}
        </div>
    );
};

export default SearchInput;
