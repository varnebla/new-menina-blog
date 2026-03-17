import { getCollection, type CollectionEntry } from 'astro:content';

import { normalizeTagLabel, normalizeTagSlug } from '../../utils/taxonomy';
import { TOPIC_DEFINITIONS } from '../../utils/topics';

export type PostEntry = CollectionEntry<'posts'>;

export interface TagSummary {
  label: string;
  slug: string;
  count: number;
}

function sortPostsByDate(posts: PostEntry[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.data.fecha).valueOf() - new Date(a.data.fecha).valueOf()
  );
}

async function getPublishedPosts() {
  return getCollection('posts', ({ data }) => !data.draft);
}

export function getPostSlug(post: Pick<PostEntry, 'slug'>) {
  return post.slug;
}

export function getPostPath(post: Pick<PostEntry, 'slug'>) {
  return `/posts/${getPostSlug(post)}/`;
}

function stripMarkdownExtension(value: string) {
  return value.replace(/\.(md|mdx)$/i, '');
}

export function getLegacyPostSlugs(post: Pick<PostEntry, 'id' | 'slug'>) {
  const legacySlug = stripMarkdownExtension(post.id);

  if (!legacySlug || legacySlug === post.slug) {
    return [];
  }

  return [legacySlug];
}

export async function getPostsOrderedByDate() {
  return sortPostsByDate(await getPublishedPosts());
}

export async function getLatestPosts(limit = 3) {
  return (await getPostsOrderedByDate()).slice(0, limit);
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getPostsOrderedByDate();
  const featuredPosts = posts.filter((post) => post.data.featured);
  const fallbackPosts = posts.filter((post) => !post.data.featured);

  return [...featuredPosts, ...fallbackPosts].slice(0, limit);
}

export async function getPostsByTopic(topic: string) {
  return (await getPostsOrderedByDate()).filter((post) => post.data.topic === topic);
}

export async function getAllTopicsWithCounts() {
  const posts = await getPostsOrderedByDate();

  return TOPIC_DEFINITIONS.map((topic) => {
    const topicPosts = posts.filter((post) => post.data.topic === topic.slug);

    return {
      ...topic,
      count: topicPosts.length,
      latestPost: topicPosts[0] || null,
    };
  });
}

export async function getAllTags() {
  const posts = await getPostsOrderedByDate();
  const tags = new Map<string, TagSummary>();

  posts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      const normalizedLabel = normalizeTagLabel(tag);
      const normalizedSlug = normalizeTagSlug(tag);

      if (!normalizedSlug) {
        return;
      }

      const existingTag = tags.get(normalizedSlug);

      if (existingTag) {
        existingTag.count += 1;
        return;
      }

      tags.set(normalizedSlug, {
        label: normalizedLabel,
        slug: normalizedSlug,
        count: 1,
      });
    });
  });

  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es')
  );
}

export async function getPostsByTag(tagSlug: string) {
  return (await getPostsOrderedByDate()).filter((post) =>
    post.data.tags.some((tag) => normalizeTagSlug(tag) === tagSlug)
  );
}

export async function getRelatedPosts(post: PostEntry, limit = 3) {
  const currentSlug = getPostSlug(post);
  const currentTags = new Set(post.data.tags.map((tag) => normalizeTagSlug(tag)));

  return (await getPostsOrderedByDate())
    .filter((candidate) => getPostSlug(candidate) !== currentSlug)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.reduce((score, tag) => {
        return score + (currentTags.has(normalizeTagSlug(tag)) ? 1 : 0);
      }, 0);

      const topicScore = candidate.data.topic === post.data.topic ? 2 : 0;
      const featuredScore = candidate.data.featured ? 0.5 : 0;

      return {
        candidate,
        score: sharedTags * 2 + topicScore + featuredScore,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.data.fecha).valueOf() -
          new Date(a.candidate.data.fecha).valueOf()
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}