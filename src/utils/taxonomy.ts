export function normalizeTagLabel(tag: string) {
  return tag.trim().replace(/\s+/g, ' ');
}

export function slugifyTerm(value: string) {
  return normalizeTagLabel(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function normalizeTagSlug(tag: string) {
  return slugifyTerm(tag);
}