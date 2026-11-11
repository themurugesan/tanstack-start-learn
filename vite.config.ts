import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  // nitro() builds the server in a format hosts like Vercel can run
  plugins: [tailwindcss(), tanstackStart(), nitro(), viteReact()],
})
