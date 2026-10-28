import { render } from 'svelte/server';
import App from './App.svelte';
import { normalizePath, pages } from './pages';

export const routes = Object.keys(pages).sort();

export function renderPage(path: string) {
  if (!pages[normalizePath(path)]) throw new Error(`Unknown KB route: ${path}`);
  return render(App, { props: { path } });
}
