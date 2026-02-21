import { MetadataRoute } from 'next'
import { sitemapUrl } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    '/admin/',
    '/api/',
    '/dashboard/',
    '/login/',
    '/checkout/',
  ]

  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'Meta-ExternalAgent',
    'Bytespider',
    'CCBot',
    'cohere-ai',
    'Amazonbot',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: disallowedPaths,
      })),
    ],
    sitemap: sitemapUrl,
  }
}
