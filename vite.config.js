import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // 加入這一行，確保路徑從根目錄開始
  server: {
    historyApiFallback: true
  },
  plugins: [react()],
})
