import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vicontech.group'

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
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
