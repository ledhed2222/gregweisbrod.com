import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'well-known-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/.well-known' || req.url === '/.well-known/') {
            res.writeHead(302, { Location: '/' })
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})
