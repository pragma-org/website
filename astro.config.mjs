import { defineConfig } from 'astro/config';
import { defineCollection } from 'astro/content/runtime';
import { z } from 'astro/zod';
import markdownIntegration from '@astropub/md';
import { bundledLanguages } from 'shiki';
import aikenLang from './src/grammars/aiken.tmLanguage.json' assert { type: 'json' };
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://pragma.builders',
  integrations: [markdownIntegration()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'night-owl',
      langs: [
        ...Object.keys(bundledLanguages),
        {
          id: 'aiken',
          scopeName: 'source.aiken',
          ...aikenLang,
        },
      ],
    },
  },
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
