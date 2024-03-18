import { defineConfig } from 'astro/config';
import { defineCollection } from 'astro/content/runtime';
import { z } from 'astro/zod';

// https://astro.build/config
export default defineConfig({
  site: 'https://pragma.builders',
});

// https://docs.astro.build/en/guides/content-collections
export const collections = {
  questions: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
    }),
  }),
};
