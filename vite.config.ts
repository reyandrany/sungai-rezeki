import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { PAGES, pageUrl } from './src/content/seoPages.ts'

function escapeAttr(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
}

function applyPageSeo(html: string, page: (typeof PAGES)[number]) {
  const url = pageUrl(page.path)
  const title = escapeAttr(page.title)
  const description = escapeAttr(page.description)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link\s+rel="alternate"[^>]*href=")[^"]*(")/g, `$1${url}$2`)
    .replace(
      /("@type": "WebPage"[\s\S]*?"@id": ")[^"]*("[\s\S]*?"url": ")[^"]*("[\s\S]*?"name": ")[^"]*("[\s\S]*?"description": ")[^"]*(")/,
      `$1${url}#webpage$2${url}$3${title}$4${description}$5`,
    )
}

function seoPages(): Plugin {
  return {
    name: 'seo-pages',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist')
      const homeFile = path.join(dist, 'index.html')
      if (!fs.existsSync(homeFile)) return
      const homeHtml = fs.readFileSync(homeFile, 'utf8')
      for (const page of PAGES) {
        if (page.path === '/') continue
        const html = applyPageSeo(homeHtml, page)
        const directory = path.join(dist, page.path.slice(1))
        fs.mkdirSync(directory, { recursive: true })
        fs.writeFileSync(path.join(directory, 'index.html'), html)
        fs.writeFileSync(path.join(dist, `${page.path.slice(1)}.html`), html)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
})
