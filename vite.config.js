import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project site: https://siddharthajith.github.io/instacloneforpersonal/
const base = process.env.BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/instacloneforpersonal/' : '/')

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
