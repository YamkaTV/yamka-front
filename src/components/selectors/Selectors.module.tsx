// src/components/CustomSelect.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './selectors.module.scss';

interface CustomSelectProps {
    options: string[];
    placeholder?: string;
    value?: string;
    label: string;
    onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder = 'Выбрать...', value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.customSelect}>
            <div className={styles.selectWrapper} ref={wrapperRef}>
                <div className={styles.selectSelected} onClick={() => setIsOpen(!isOpen)}>
                    <span className={styles.selectPlaceholder}>
                        {value || placeholder}
                    </span>
                    <span>▾</span>
                </div>

                {isOpen && (
                    <div className={styles.selectItems}>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`${styles.selectItem}${option === value ? ` ${styles.selected}` : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;