import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['polilla.ico', 'polilla-512x512.png'],
      manifest: {
        name: 'Pichanguita',
        short_name: 'Pinchanguita',
        description: 'Keep soccer play records',
        theme_color: '#000000',
        icons: [
          {
            src: 'polilla-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ]
      }
    })
  ],
})
