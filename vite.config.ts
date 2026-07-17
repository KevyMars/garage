import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const certDir = fileURLToPath(new URL('./certs', import.meta.url))
const keyPath = `${certDir}/key.pem`
const certPath = `${certDir}/cert.pem`
const hasCerts = existsSync(keyPath) && existsSync(certPath)
const wantsHttps = process.env.VITE_HTTPS === '1'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    // Camera access (getUserMedia) requires a secure context. `npm run dev:https`
    // (after generating certs/key.pem + certs/cert.pem with mkcert, see README)
    // serves over HTTPS for LAN/phone testing. Plain `npm run dev` stays HTTP,
    // since browsers won't trust this locally-issued cert without extra setup.
    https: wantsHttps && hasCerts ? { key: readFileSync(keyPath), cert: readFileSync(certPath) } : undefined,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Garage — Auto & Moto Maintenance',
        short_name: 'Garage',
        description: 'Track vehicle maintenance, VIN lookup, and service history.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0a0a0b',
        theme_color: '#0a0a0b',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
