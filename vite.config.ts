import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Isso expõe a variável de ambiente do servidor para o cliente de forma segura durante o build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
