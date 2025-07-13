import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/assets/posts",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
          name: 'draft',
          label: 'Draft',
          type: 'boolean',
          required: true,
          description: 'Si este check está marcado, el post no se publicará',
        },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            required: false,
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "datetime",
            name: "fecha",
            label: "Fecha de publicación",
            required: true,
          },
          {
            type: "string",
            name: "topic",
            label: "Tema",
            required: true,
            ui: {
              component: "select",
            },
            options: [
              { label: "Arte", value: "arte" },
              { label: "Disney", value: "disney" },
              { label: "Viajes", value: "viajes" },
            ],
          },
          {
            type: "image",
            name: "imagen",
            label: "Thumbnail",
            required: true,
          },
          {
            type: "string",
            name: "abstract",
            label: "Abstract",
            required: true,
            description: 'Descripción de entre 150 y 250 caracteres',
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
