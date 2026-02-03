import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base: '/magapie-web/',
  base: '/', // 必須是這個，不能是 '/magapie-web/'
  plugins: [react()],
})
