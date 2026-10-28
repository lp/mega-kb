<script lang="ts">
  import { normalizePath, pages } from './pages';

  let { path }: { path: string } = $props();
  const Page = $derived(pages[normalizePath(path)]);
</script>

<svelte:head>{#if !Page}<title>Page not found · support kb</title>{/if}</svelte:head>

{#if Page}
  <Page />
{:else}
  <main><h1>Page not found</h1><p><a href="/kb">Open the support knowledge base</a>.</p></main>
{/if}
