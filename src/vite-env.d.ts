/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_BASE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}