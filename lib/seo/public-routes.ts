import type { MetadataRoute } from 'next'

export type PublicSitemapRoute = {
  path: `/${string}` | '/'
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

export const publicSitemapRoutes: PublicSitemapRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products/intelligent-sprinkler-system', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/model-2', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/model-3', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/vk-240', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/purily-robotic-pool-cleaner', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/battery', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/agent-pricing', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/the-system', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/wildfire-protection', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/fire-sprinkler-installation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/residential-fire-sprinklers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/learn-more', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
]
