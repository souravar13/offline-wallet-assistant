import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Offline Wallet Assistant',
        short_name: 'WalletAssist',
        description: 'An offline assistant to make USSD UPI payments and store contacts offline',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
