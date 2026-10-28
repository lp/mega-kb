<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { causeOf, groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const unique = uniqueById(reports as Report[]);
  const merged = unique.filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const issueOf: Record<string, string> = {
    parser: 'https://github.com/lp/mega-kb/issues/1',
    hint: 'https://github.com/lp/mega-kb/issues/2',
  };
  const mismatches = merged.filter((r) => r.meta.intakeTag !== causeOf(r, tenantOf(r)));
  const anomalies = merged.filter((r) => notes.oneDayMove.includes(r.id));
  const bulkDay = '2026-07-02';
  const bulk = merged.filter((r) => r.mergedAt?.startsWith(bulkDay));
  const backlog = bulk.filter((r) => r.receivedAt.slice(0, 10) < bulkDay);
  const months = [...new Set(merged.map((r) => r.receivedAt.slice(0, 7)))].sort();
</script>

<h2>Count once, classify by tenant and path</h2>
<p>The export has <strong>{reports.length}</strong> rows, <strong>{unique.length}</strong> unique report IDs,
  and <strong>{reports.length - unique.length}</strong> overlapping rows. All <strong>{merged.length}</strong>
  unique reports are merged into #4471. Tenant locale, tenant form and entry channel determine the
  exported classification; <strong>{mismatches.length}</strong> intake tags disagree with it.</p>
<table>
  <thead><tr><th>Cause</th><th>Unique reports</th><th>Own issue</th><th>Report IDs</th></tr></thead>
  <tbody>
    {#each groups as group (group.cause)}
      <tr><td>{group.cause}</td><td>{group.reports.length}</td>
        <td><a href={issueOf[group.cause]}>Track {group.cause} separately</a></td>
        <td><details><summary>Membership</summary>{group.reports.map((r) => r.id).join(', ')}</details></td></tr>
    {/each}
  </tbody>
</table>

<h2>Receipt dates are not merge dates</h2>
<p>On {bulkDay}, <strong>{bulk.length}</strong> reports were merged, of which
  <strong>{backlog.length}</strong> had arrived earlier. The merge spike is a desk action, not evidence
  that the defect began that day. Reports already arrived in April and continue into October.</p>
<table>
  <thead><tr><th>Month</th><th>Received</th><th>Merged</th></tr></thead>
  <tbody>
    {#each months as month (month)}
      <tr><td>{month}</td><td>{merged.filter((r) => r.receivedAt.startsWith(month)).length}</td>
        <td>{merged.filter((r) => r.mergedAt?.startsWith(month)).length}</td></tr>
    {/each}
  </tbody>
</table>

<h2>Timing reports remain unresolved evidence</h2>
<p>The desk marked <strong>{anomalies.length}</strong> reports as read as a one-day move. The exported
  classifier files all of them under parser by tenant and channel. That is a filing rule, not proof
  that their symptoms share the parser's mechanism. Do not silently subtract them or invent a third
  confirmed cause from their wording.</p>
<ul>
  {#each anomalies as report (report.id)}
    <li><strong>{report.id}</strong> ({report.tenant}, {report.channel}): {report.body}</li>
  {/each}
</ul>
<p>Ask for intended civil dates, original input, timezone, booking timestamps and invite delivery
  history. Cross-timezone display and an invite preceding its booking are different observations;
  neither establishes a single common defect without further evidence.</p>
