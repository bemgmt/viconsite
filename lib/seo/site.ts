export const siteUrl = 'https://vicontech.group'

export const siteUrlObject = new URL(siteUrl)

export function toAbsoluteUrl(path: string): string {
  if (path === '/') {
    return siteUrl
  }

  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export const sitemapUrl = toAbsoluteUrl('/sitemap.xml')
