import type { Component } from 'svelte';

const modules = import.meta.glob<{ default: Component }>('/src/routes/kb/**/+page.svx', { eager: true });

export const pages = Object.fromEntries(
  Object.entries(modules).map(([file, page]) => [
    file.replace('/src/routes', '').replace('/+page.svx', ''),
    page.default,
  ]),
);

export function normalizePath(path: string): string {
  return path.replace(/\/+$/, '') || '/kb';
}
