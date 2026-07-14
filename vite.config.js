import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// User site: https://siddharthajith2009.github.io/
// For a project site instead, set BASE_PATH=/your-repo-name/
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
