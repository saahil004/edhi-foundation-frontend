import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Recompresses every image that goes through the build (src/assets,
    // not public/) at the same dimensions — no import paths change. Doesn't
    // resize oversized source photos, just strips the easy fat.
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 78, mozjpeg: true },
      jpg: { quality: 78, mozjpeg: true },
      webp: { quality: 80 },
    }),
  ],
})
