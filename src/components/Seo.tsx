import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildJsonLd, getPage, pageUrl } from '../content/site.ts'

function setMeta(selector: string, value: string) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute('content', value)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = getPage(pathname)
    const url = pageUrl(page.path)
    document.title = page.title
    setMeta('meta[name="description"]', page.description)
    setMeta('meta[property="og:title"]', page.title)
    setMeta('meta[property="og:description"]', page.description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[name="twitter:title"]', page.title)
    setMeta('meta[name="twitter:description"]', page.description)
    document.querySelectorAll('link[rel="canonical"], link[rel="alternate"]').forEach((link) => {
      link.setAttribute('href', url)
    })
    const structuredData = document.head.querySelector('script[type="application/ld+json"]')
    if (structuredData) structuredData.textContent = JSON.stringify(buildJsonLd(page))
  }, [pathname])

  return null
}
