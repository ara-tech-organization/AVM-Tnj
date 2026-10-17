// Writes dist/thanjavur/<slug>/index.html for each service page with that page's own
// <title>, description, keywords, canonical and social tags, so crawlers that do not run
// JavaScript see the correct meta data instead of the homepage's.
import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const pages = JSON.parse(fs.readFileSync('src/content/services.json', 'utf8'))
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const setTag = (html, re, replacement) => {
  if (!re.test(html)) throw new Error(`prerender: tag not found for ${re}`)
  return html.replace(re, replacement)
}

for (const p of Object.values(pages)) {
  const url = `https://avmsmilesdental.com/thanjavur/${p.slug}`
  let h = template
  h = setTag(h, /<title>.*?<\/title>/s, `<title>${esc(p.metaTitle)}</title>`)
  h = setTag(h, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(p.metaDescription)}"`)
  h = setTag(h, /<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${esc(p.metaKeywords)}"`)
  h = setTag(h, /<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
  h = setTag(h, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(p.metaTitle)}"`)
  h = setTag(h, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(p.metaDescription)}"`)
  h = setTag(h, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(p.metaTitle)}"`)
  const dir = path.join(dist, 'thanjavur', p.slug)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), h)
}

// thank-you page: own title, kept out of search results
let ty = template.replace(/<title>.*?<\/title>/s, '<title>Thank You | AVM Smiles Thanjavur</title>')
ty = ty.replace('<meta name="robots" content="index, follow" />', '<meta name="robots" content="noindex, nofollow" />')
fs.mkdirSync(path.join(dist, 'thankyou'), { recursive: true })
fs.writeFileSync(path.join(dist, 'thankyou', 'index.html'), ty)

// the landing page (and its section URLs) keep the homepage meta data from index.html
for (const dir of ['', 'about', 'services', 'gallery', 'contact']) {
  fs.mkdirSync(path.join(dist, 'thanjavur', dir), { recursive: true })
  fs.writeFileSync(path.join(dist, 'thanjavur', dir, 'index.html'), template)
}
console.log(`prerender: ${Object.keys(pages).length} service pages + landing`)
