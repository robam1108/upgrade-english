import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 원본 프로젝트(5173)와 동시에 띄울 수 있게 포트를 나눈다.
  server: { port: 5174 },
})
