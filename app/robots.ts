import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/*',
        '/api/*',
        '/login',
        '/login/*',
        '/register',
        '/register/*',
        '/dashboard',
        '/dashboard/*',
        '/business-dashboard',
        '/business-dashboard/*',
        // Internal seed route: public seed URLs stay /business/<slug>
        // (rewritten, so crawlers see only that URL). The direct
        // /seed-business/<slug> URL must never be indexed as a second copy.
        '/seed-business',
        '/seed-business/*',
      ],
    },
    sitemap: 'https://www.localepak.com/sitemap.xml',
  }
}
