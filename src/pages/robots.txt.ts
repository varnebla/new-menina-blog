import { SITE_URL } from '../utils/seo';

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    '',
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    `Sitemap: ${SITE_URL}/rss.xml`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}