import React from 'react';
import styles from './Block.module.scss';

interface BlockProps {
    children: React.ReactNode;
    className?: string;
}

const Block: React.FC<BlockProps> = ({ children, className }) => {
    const blockClassName = `${styles.block} ${className || ''}`.trim();
    return (
        <div className={blockClassName}>
            {children}
        </div>
    );
};

export default Block;