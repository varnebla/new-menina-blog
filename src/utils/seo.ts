export const SITE_NAME = 'La menina perdida';
export const SITE_URL = 'https://lameninaperdida.art';
export const DEFAULT_SITE_DESCRIPTION =
  'Espacio donde descubrimos secretos y curiosidades tras las obras de arte, referencias culturales en Disney y viajes con mirada visual.';
export const DEFAULT_OG_IMAGE =
  'https://opengraph.b-cdn.net/production/images/8330f603-c8b4-4c61-bdf6-b2c4cd5a4704.jpg?token=YDl5emfgT4wpKezqhvlW747glLR2qjQvXUCXxQ1LdG4&height=1449&width=1200&expires=33259224249';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface CollectionPageSchemaInput {
  title: string;
  description: string;
  url: string;
}

interface BlogPostingSchemaInput {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  section?: string;
}

export function buildPageTitle(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
}

export function toAbsoluteUrl(pathOrUrl: string, base = SITE_URL) {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    return new URL(pathOrUrl, base).toString();
  }
}

export function getCanonicalUrl(pathname: string, canonical?: string) {
  return canonical ? toAbsoluteUrl(canonical) : toAbsoluteUrl(pathname);
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [
      'https://instagram.com/lameninaperdida',
      'https://twitter.com/lameninaperdida',
    ],
  };
}

export function buildWebSiteSchema({
  description,
  url,
}: {
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description,
    url,
    inLanguage: 'es-ES',
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  url,
}: CollectionPageSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    inLanguage: 'es-ES',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildBlogPostingSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  keywords,
  section,
}: BlogPostingSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: [image],
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'es-ES',
    articleSection: section,
    keywords,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
  };
}