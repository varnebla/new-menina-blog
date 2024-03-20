export function formatDate(postDate: string): string {
  const dateFormat = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

  return dateFormat.format(new Date(postDate));
}