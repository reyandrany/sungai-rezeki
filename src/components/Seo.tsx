import { SITE, buildJsonLd } from '../content/site.ts'

export default function Seo({ title = SITE.title }: { title?: string }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={SITE.description} />
      <script type="application/ld+json">{JSON.stringify(buildJsonLd())}</script>
    </>
  )
}
