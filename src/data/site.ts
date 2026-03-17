export const SITE_URL = 'https://svglogo.dev'
export const SITE_NAME = 'SVGLogo.dev'

export const SEO = {
  title: 'SVG Logo Maker - Free SVG Logo Generator',
  description:
    'Free SVG logo maker to create professional icons and brand marks in seconds. Customize icons, colors, and backgrounds. Export high-quality SVG, PNG, and ICO from your browser.',
  keywords:
    'svg logo maker, svg logo generator, free logo maker, logo svg generator, svg logo creator, free svg logo, icon logo maker, logo maker online, svg to png, svg to ico, favicon generator, brand mark creator',
  ogImage: `${SITE_URL}/og/banner.png`,
  ogImageAlt: 'svglogo.dev app preview banner',
  canonical: `${SITE_URL}/`,
} as const

export const JSON_LD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: 'Free SVG logo maker to create professional icons and brand marks in seconds.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${SITE_NAME} - SVG Logo Maker`,
    url: `${SITE_URL}/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: SEO.description,
    image: SEO.ogImage,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Create SVG logos from icons',
      'Customize colors, gradients, and backgrounds',
      'Export to SVG, PNG, and ICO formats',
      'Generate favicons from SVG',
      'Browser-based, no signup required',
      'Share logos with a link',
    ],
  },
])
