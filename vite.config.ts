import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import * as sass from 'sass'
import { Plugin, defineConfig } from 'vite'

import { PAGES } from './src/routes/pages.ts'

const SITE_ORIGIN = 'https://gregweisbrod.com'

const NO_SCRIPT_SCSS = fileURLToPath(
  new URL('./src/NoScript.scss', import.meta.url),
)

// The href in index.html, and the path the dev middleware answers.
const NO_SCRIPT_DEV_HREF = '/no-script.css'

function renderNoScriptCss(): string {
  return sass.compile(NO_SCRIPT_SCSS, { style: 'compressed' }).css
}

// Content-hashed and placed under assets/ so it inherits the immutable
// cache rule in firebase.json, exactly like Vite's own output.
function noScriptFileName(css: string): string {
  const hash = createHash('sha256').update(css).digest('hex').slice(0, 8)
  return `assets/no-script-${hash}.css`
}

// no-script.css cannot go through the app's CSS pipeline, since that only
// reaches the page via JS. Compiling it here lets it share src/_common.scss.
function noScriptCss(): Plugin {
  return {
    name: 'no-script-css',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url !== NO_SCRIPT_DEV_HREF) {
          next()
          return
        }
        res.setHeader('Content-Type', 'text/css')
        res.end(renderNoScriptCss())
      })
    },
    generateBundle() {
      const css = renderNoScriptCss()
      this.emitFile({
        type: 'asset',
        fileName: noScriptFileName(css),
        source: css,
      })
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Dev is served unhashed by the middleware above; only the build
        // needs the href repointed at the fingerprinted file.
        if (ctx.server) {
          return html
        }
        const css = renderNoScriptCss()
        return html.replace(NO_SCRIPT_DEV_HREF, `/${noScriptFileName(css)}`)
      },
    },
  }
}

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
  plugins: [
    react(),
    sitemap(),
    noScriptCss(),
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
    open: false,
  },
  build: {
    outDir: 'build',
  },
})
