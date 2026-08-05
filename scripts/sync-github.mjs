/**
 * Regenerates lib/github-snapshot.json from the live GitHub account.
 *
 *   npm run gh:sync
 *
 * Why a committed snapshot exists at all: the contribution calendar is not
 * available from any unauthenticated GitHub API. The only public source is the
 * HTML at github.com/users/<login>/contributions, and scraping that from a
 * serverless function in production would be both fragile (undocumented markup)
 * and rate-limited (shared egress IPs). So the scrape happens here, by hand,
 * and the result is committed. lib/github.ts prefers a live GraphQL read when
 * GITHUB_TOKEN is set and falls back to this file otherwise, which means the
 * section renders real data whether or not a token is configured.
 *
 * Set GITHUB_TOKEN before running to raise the REST rate limit from 60/hr to
 * 5000/hr. It is optional; the script works without one.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const LOGIN = "RafiAkem";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "lib", "github-snapshot.json");

const token = process.env.GITHUB_TOKEN;
const headers = {
  "User-Agent": `${LOGIN}-portfolio-sync`,
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Unauthenticated GitHub allows 60 requests an hour and this script needs one
 * per repository, so a cold run without a token will hit the wall partway
 * through. When it does, wait for the documented reset rather than returning
 * short: a partial language read produces shares that look plausible and are
 * wrong, which is worse than no snapshot at all.
 */
async function json(url, attempt = 0) {
  const res = await fetch(url, { headers });

  if ((res.status === 403 || res.status === 429) && attempt < 2) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    if (res.headers.get("x-ratelimit-remaining") === "0" && reset) {
      const waitMs = Math.max(0, reset * 1000 - Date.now()) + 2000;
      console.warn(`  rate limited, waiting ${Math.ceil(waitMs / 1000)}s for reset...`);
      await sleep(waitMs);
      return json(url, attempt + 1);
    }
  }

  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

/**
 * Pulls the contribution calendar out of the profile HTML.
 *
 * Each day is a <td data-date="YYYY-MM-DD" id="contribution-day-component-C-R">
 * and the count lives in a sibling <tool-tip for="<that id>">. The tooltip is
 * the only place the real number appears; data-level is a bucketed 0-4.
 *
 * Note the totals: GitHub's own <h2> prints a larger number than the days sum
 * to, because its window starts a few days before the first rendered cell. The
 * sum of the rendered days is used instead, so the headline figure and the grid
 * below it can never disagree.
 */
async function contributions() {
  const res = await fetch(`https://github.com/users/${LOGIN}/contributions`, {
    headers: { "User-Agent": headers["User-Agent"] },
  });
  if (!res.ok) throw new Error(`contributions: ${res.status} ${res.statusText}`);
  const html = await res.text();

  const counts = new Map();
  for (const m of html.matchAll(
    /<tool-tip[^>]*for="(contribution-day-component-[^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
  )) {
    const n = /^([\d,]+)\s+contribution/.exec(m[2]);
    counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
  }

  const days = [];
  for (const m of html.matchAll(
    /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-[^"]+)"/g,
  )) {
    days.push({ date: m[1], count: counts.get(m[2]) ?? 0 });
  }
  // The id attribute sits after data-date on some cells and before it on
  // others, so catch the other ordering too rather than silently dropping days.
  for (const m of html.matchAll(
    /<td[^>]*id="(contribution-day-component-[^"]+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g,
  )) {
    if (!days.some((d) => d.date === m[2])) days.push({ date: m[2], count: counts.get(m[1]) ?? 0 });
  }

  if (days.length < 300) throw new Error(`only parsed ${days.length} days; markup likely changed`);
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

/** Longest run of consecutive days with any activity. */
function longestStreak(days) {
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

const [user, repos, days] = await Promise.all([
  json(`https://api.github.com/users/${LOGIN}`),
  json(`https://api.github.com/users/${LOGIN}/repos?per_page=100&sort=pushed`),
  contributions(),
]);

const owned = repos.filter((r) => !r.fork);

/**
 * Language share is weighted by BYTES, not by repository count.
 *
 * Repo count is actively misleading here: a folder of one-file university
 * exercises outnumbers every production project, so counting repos reports a
 * language that barely appears in the actual code. Bytes report what was
 * really written.
 */
const bytes = new Map();
for (const repo of owned) {
  // Deliberately not caught. Skipping a repository silently rebalances every
  // other language's percentage, so a failure here has to stop the run and
  // leave the previous snapshot in place.
  const langs = await json(repo.languages_url);
  for (const [name, n] of Object.entries(langs)) {
    bytes.set(name, (bytes.get(name) ?? 0) + n);
  }
}

const totalBytes = [...bytes.values()].reduce((a, b) => a + b, 0);
const languages = [...bytes.entries()]
  .map(([name, n]) => ({ name, bytes: n, share: n / totalBytes }))
  .sort((a, b) => b.bytes - a.bytes);

const snapshot = {
  capturedAt: new Date().toISOString(),
  login: LOGIN,
  rangeStart: days[0].date,
  rangeEnd: days[days.length - 1].date,
  totalContributions: days.reduce((sum, d) => sum + d.count, 0),
  activeDays: days.filter((d) => d.count > 0).length,
  busiestDay: days.reduce((max, d) => (d.count > max.count ? d : max), days[0]),
  longestStreak: longestStreak(days),
  publicRepos: owned.length,
  accountCreated: user.created_at,
  totalBytes,
  languages,
  days,
};

await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

console.log(`wrote ${OUT}`);
console.log(
  `  ${snapshot.totalContributions} contributions, ${snapshot.activeDays}/${days.length} active days, ` +
    `longest streak ${snapshot.longestStreak}`,
);
console.log(`  ${owned.length} own repos, ${(totalBytes / 1e6).toFixed(2)} MB across ${languages.length} languages`);
console.log(`  top: ${languages.slice(0, 4).map((l) => `${l.name} ${(l.share * 100).toFixed(1)}%`).join(", ")}`);
