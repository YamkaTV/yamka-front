import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'YamkaTV',
        short_name: 'YamkaTV',
        start_url: '/',
        display: 'standalone',
        background_color: '#181818',
        theme_color: '#181818',
        icons: [
          {
            src: '/favicon/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicon/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnwidget\.simplejsmenu\.com\/.*/i,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'external-ads',
              expiration: { maxEntries: 0 },
            },
          },
          {
            urlPattern: /^https:\/\/cdn7\.ufouxbwn\.com\/.*/i,
            handler: 'NetworkOnly',
            options: {
              cacheName: 'external-ads',
              expiration: { maxEntries: 0 },
            },
          },
        ],
      },
    }),
  ],
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@images': '/public/images',
    },
  },
})
