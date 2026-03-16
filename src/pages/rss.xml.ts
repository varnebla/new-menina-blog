import { getPostPath, getPostsOrderedByDate } from '../services/posts';
import { SITE_NAME, SITE_URL } from '../utils/seo';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPostsOrderedByDate();
  const items = posts
    .map((post) => {
      const link = new URL(getPostPath(post), SITE_URL).toString();
      const title = escapeXml(post.data.seoTitle || post.data.title);
      const description = escapeXml(
        post.data.seoDescription || post.data.abstract
      );

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${new Date(post.data.fecha).toUTCString()}</pubDate>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Archivo editorial sobre arte, viajes y cultura visual.</description>
    <language>es-ES</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}