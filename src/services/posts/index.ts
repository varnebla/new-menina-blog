import { getCollection } from 'astro:content';

export async function getPostsOrderedByDate() {
  const posts = (await getCollection('posts')).sort(
  (a, b) => new Date(b.data.fecha).valueOf() - new Date(a.data.fecha).valueOf());
  return posts;
}