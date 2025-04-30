// src/types/global.d.ts
export {};

declare global {
    interface Window {
        ym?: {
            (...args: YmArgs[]): void;
            a?: YmArgs[];
            l?: number;
        };
    }
}

type YmArgs = [number, string, Record<string, boolean>];
