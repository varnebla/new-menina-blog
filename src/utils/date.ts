export function formatDate(postDate: Date): string {
  const dateFormat = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

  return dateFormat.format(postDate);
}