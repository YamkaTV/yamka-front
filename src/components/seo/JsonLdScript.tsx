import React, { useEffect } from 'react';

interface JsonLdScriptProps {
    data: object;
}

const JsonLdScript: React.FC<JsonLdScriptProps> = ({ data }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(data);
        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, [data]);

    return null;
};

export default JsonLdScript;