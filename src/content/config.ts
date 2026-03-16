// Import utilities from 'astro:content'
import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    abstract: z.string(),
    imagen: z.string(),
    ogImage: z.string().optional(),
    topic: z.enum(['arte', 'disney', 'viajes']),
    tags: z.array(z.string()).default([]),
    fecha: z.date(),
    seoTitle: z.string().max(70).optional(),
    seoDescription: z.string().max(180).optional(),
    canonical: z.string().url().optional(),
  }),
});

export const collections = {
  posts: postCollection,
};