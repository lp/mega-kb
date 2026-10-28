# mega-kb

S01E03 evidence for the MEGA.dev challenge “what it shows”.

## Start here

- [Signed reassessment source](src/routes/kb/incidents/4471-reassessment/+page.svx)
- [Rendered reassessment](rendered/kb/incidents/4471-reassessment/index.html): download the repository and open this file in a browser to see the desk's page, including computed tables, timeline and desk reference.
- [Parser issue: 379 unique reports](https://github.com/lp/mega-kb/issues/1)
- [Booking-v3 hint issue: 33 unique reports](https://github.com/lp/mega-kb/issues/2)
- [Replacement dedupe proposal](src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx)

## Evidence scope

The supplied KB was exported on 2026-10-04. Its 427 rows represent 412 distinct reports merged into #4471. Counts use the supplied classifier after report-ID deduplication and tenant-directory lookup, not intake tags or subject matches. The desk may have changed since this snapshot.

Five reports describe timing anomalies that the exported classifier files under parser. They remain in that count, with their unresolved symptoms called out explicitly; no common third root cause or production fix is asserted.

Original exported KB pages, components and data remain intact in `src/`. The new reassessment, replacement proposal and `ReviewEvidence.svelte` add the review without rewriting an accepted historical decision.

## Reproduce

Use the repository's Mise configuration and tasks to install local dependencies, build the rendered pages, or serve the interactive KB. Static HTML captures the initial component state; use the development server to change the dedupe explorer's inputs.

```sh
mise trust
mise install
mise run setup
mise run build
mise run dev
```

Open http://127.0.0.1:5173/kb/incidents/4471-reassessment for the interactive page. `mise run build` regenerates every portable page under `rendered/`.

The renderer executes Svelte and mdsvex. Counts, dates, classifications, stale-page warnings and the signature-derived desk reference come from the actual components rather than hand-written screenshots or HTML.