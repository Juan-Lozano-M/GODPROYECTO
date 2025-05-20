import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.riv'], // 👈 Esto le dice a Vite que los .riv son archivos estáticos
  server: {
    host: "0.0.0.0",  // Aquí habilitas que el servidor escuche en todas las IPs locales
    host: true,
    port: 5173,  // Opcional: define el puerto
  },
})
