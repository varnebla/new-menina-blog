// Import utilities from 'astro:content'
import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    abstract: z.string(),
    imagen: z.string(),
    topic: z.string(),
    tags:z.array(z.string()),
    fecha: z.date(),
  })
})

export const collections = {
  posts: postCollection
}