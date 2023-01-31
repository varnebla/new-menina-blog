import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway'
        },
        media_folder: '/public/images',
        collections: [
          {
            name: 'posts',
            label: 'Posts',
            folder: 'src/pages/posts',
            create: true,
            extension: 'md',
            format: 'frontmatter',
            fields: [
              {
                name: 'title',
                label: 'Título',
                required: true,
                widget: 'string'
              },
              {
                name: 'description',
                label: 'Descripción',
                required: true,
                widget: 'text'
              },
              {
                name: 'layout',
                label: 'Layout',
                widget: 'hidden',
                default: '../../layouts/PostLayout.astro'
              },
              {
                name: 'releaseDate',
                label: 'Fecha de publicación',
                required: true,
                widget: 'date'
              },
              {
                name: 'thumbnail',
                label: 'Imagen',
                required: true,
                widget: 'image'
              },
              {
                name: 'topic',
                label: 'Temática',
                required: true,
                widget: 'select',
                options: [
                  {
                    value: 'arte',
                    label: 'Arte'
                  },
                  {
                    value: 'disney',
                    label: 'Disney'
                  },
                  {
                    value: 'viajes',
                    label: 'Viajes'
                  }
                ],
                default: ['art']
              },
              {
                label: 'Tags',
                name: 'tags',
                widget: 'list',
                field: {
                  label: 'Tag',
                  name: 'title',
                  widget: 'string',
                  default: ''
                }
              },
              {
                name: 'body',
                label: 'Contenido',
                required: true,
                widget: 'markdown'
              }
            ]
          }
        ]
      }
    })
  ]
});
