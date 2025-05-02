import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Настройка для Vite
export default defineConfig({
  plugins: [react()],
  base: './', // фронт доступен с корня
  publicDir: '../template', // Указываем папку с HTML как public
  build: {
    outDir: '../dist',     // куда будет собираться фронт
    emptyOutDir: true,     // очищать dist перед сборкой
  },
  resolve: {
    alias: {
      // Алиас для компонентов
      '@components': '/src/components',
      // Алиас для изображений, например, для использования в компонентах
      '@images': '/public/images',  // Путь к папке с изображениями
    },
  },
});
