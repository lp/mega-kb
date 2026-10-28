import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

export default defineConfig({
  plugins: [
    svelte({
      extensions: ['.svelte', '.svx'],
      preprocess: [
        vitePreprocess(),
        mdsvex({
          extensions: ['.svx'],
          layout: {
            runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)),
          },
        }),
      ],
      // SSR includes compiled component styles in render().head. The client
      // compiler injects the same CSS, without requiring external stylesheets.
      emitCss: false,
      compilerOptions: { css: 'injected' },
    }),
  ],
  resolve: {
    alias: {
      '#lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
  server: { port: 5173, strictPort: true },
});
