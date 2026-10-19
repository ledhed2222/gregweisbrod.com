import react from '@vitejs/plugin-react'
import { Plugin, defineConfig } from 'vite'

import { PAGES } from './src/routes/pages.ts'

const SITE_ORIGIN = 'https://gregweisbrod.com'

function renderSitemap(): string {
  const urls = PAGES.map(
    ({ path }) => `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n  </url>`,
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function sitemap(): Plugin {
  return {
    name: 'sitemap',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url !== '/sitemap.xml') {
          next()
          return
        }
        res.setHeader('Content-Type', 'application/xml')
        res.end(renderSitemap())
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: renderSitemap(),
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
})
