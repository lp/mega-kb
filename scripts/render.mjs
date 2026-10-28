import { mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, routes } from '../.render-build/entry-server.js';

const output = new URL('../rendered/', import.meta.url);
const routeFiles = new Map(routes.map((route) => [route, `${route.slice(1)}/index.html`]));

function portableLinks(html, file) {
  return html.replace(/href=(["'])(\/kb(?:\/[^"'?#\s]*)?)([?#][^"']*)?\1/g, (attribute, quote, route, suffix = '') => {
    const target = routeFiles.get(route.replace(/\/+$/, ''));
    if (!target) return attribute;
    const relative = posix.relative(posix.dirname(file), target);
    return `href=${quote}${relative}${suffix}${quote}`;
  });
}

async function writePage(route, file) {
  const { head, body } = renderPage(route);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${head}
</head>
<body>${body}</body>
</html>
`;
  const destination = new URL(file, output);
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  await writeFile(destination, portableLinks(html, file));
  console.log(`Rendered ${route} → rendered/${file}`);
}

await rm(output, { recursive: true, force: true });
for (const [route, file] of routeFiles) await writePage(route, file);
await writePage('/kb', 'index.html');
