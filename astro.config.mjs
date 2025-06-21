import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkPlugins } from './src/utils/remark-config.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://lameninaperdida.art',
  integrations: [
    tailwind(), 
    mdx({
      remarkPlugins,
    }), 
    sitemap()
  ]
});