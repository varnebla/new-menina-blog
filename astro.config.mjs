import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import mdx from "@astrojs/mdx";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://lameninaperdida.art',
  integrations: [tailwind(), mdx(), sitemap()]
});