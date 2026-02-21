import { MetadataRoute } from 'next'
import { publicSitemapRoutes } from '@/lib/seo/public-routes'
import { toAbsoluteUrl } from '@/lib/seo/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return publicSitemapRoutes.map((route) => ({
    url: toAbsoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
