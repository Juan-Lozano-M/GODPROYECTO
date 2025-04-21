import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.riv'], // 👈 Esto le dice a Vite que los .riv son archivos estáticos
})
