import snapshot from "./github-snapshot.json";

/**
 * GitHub activity, read at request time when possible and from a committed
 * snapshot when not.
 *
 * The contribution calendar has no unauthenticated API. GraphQL exposes it via
 * `contributionsCollection` but requires a token, so:
 *
 *   GITHUB_TOKEN set  -> one GraphQL request, revalidated every six hours
 *   no token, or the request fails -> lib/github-snapshot.json
 *
 * The snapshot is real data produced by `npm run gh:sync`, not placeholder
 * numbers, and it carries the date it was captured. Whichever source wins, the
 * section prints that date, so a visitor is never shown a figure without
 * knowing how old it is. There is no code path that invents a number.
 *
 * Preferring GraphQL over the profile-page scrape also fixes a real
 * inconsistency: GitHub's profile heading counts a slightly wider window than
 * the squares it draws, so the printed total and the grid disagree. The
 * GraphQL calendar returns a total and the days it is made of, together.
 */

export type ContributionDay = {
  /** YYYY-MM-DD */
  date: string;
  count: number;
};

export type Language = {
  name: string;
  bytes: number;
  /** Fraction of all bytes written across owned repositories, 0-1. */
  share: number;
};

export type GithubStats = {
  login: string;
  /** ISO timestamp of when these numbers were read. */
  capturedAt: string;
  source: "live" | "snapshot";
  rangeStart: string;
  rangeEnd: string;
  totalContributions: number;
  activeDays: number;
  busiestDay: ContributionDay;
  longestStreak: number;
  publicRepos: number;
  accountCreated: string;
  totalBytes: number;
  languages: Language[];
  days: ContributionDay[];
};

/** Six hours. Contribution counts do not move fast enough to justify less. */
const REVALIDATE_SECONDS = 60 * 60 * 6;

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      createdAt
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        totalCount
        nodes {
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
    }
  }
`;

/** Longest run of consecutive days with any activity. */
function longestStreak(days: ContributionDay[]): number {
  let best = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    if (run > best) best = run;
  }
  return best;
}

function derive(
  login: string,
  days: ContributionDay[],
  totalContributions: number,
  publicRepos: number,
  accountCreated: string,
  bytesByLanguage: Map<string, number>,
): GithubStats {
  const totalBytes = [...bytesByLanguage.values()].reduce((a, b) => a + b, 0);

  return {
    login,
    capturedAt: new Date().toISOString(),
    source: "live",
    rangeStart: days[0].date,
    rangeEnd: days[days.length - 1].date,
    totalContributions,
    activeDays: days.filter((d) => d.count > 0).length,
    busiestDay: days.reduce((max, d) => (d.count > max.count ? d : max), days[0]),
    longestStreak: longestStreak(days),
    publicRepos,
    accountCreated,
    totalBytes,
    languages: [...bytesByLanguage.entries()]
      .map(([name, bytes]) => ({ name, bytes, share: bytes / totalBytes }))
      .sort((a, b) => b.bytes - a.bytes),
    days,
  };
}

const fallback: GithubStats = { ...(snapshot as Omit<GithubStats, "source">), source: "snapshot" };

export async function getGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return fallback;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": `${fallback.login}-portfolio`,
      },
      body: JSON.stringify({ query: QUERY, variables: { login: fallback.login } }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const body = await res.json();
    if (body.errors?.length) throw new Error(body.errors[0].message);

    const user = body.data?.user;
    if (!user) throw new Error("no user in response");

    const calendar = user.contributionsCollection.contributionCalendar;
    const days: ContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    );

    if (days.length < 300) throw new Error(`calendar returned only ${days.length} days`);

    // Bytes, not repository count. A folder of one-file university exercises
    // outnumbers every production project, so counting repositories reports a
    // language that barely appears in the actual code.
    const bytes = new Map<string, number>();
    for (const repo of user.repositories.nodes ?? []) {
      for (const edge of repo.languages?.edges ?? []) {
        bytes.set(edge.node.name, (bytes.get(edge.node.name) ?? 0) + edge.size);
      }
    }
    if (bytes.size === 0) throw new Error("no language data");

    return derive(
      fallback.login,
      days,
      calendar.totalContributions,
      user.repositories.totalCount,
      user.createdAt,
      bytes,
    );
  } catch (error) {
    // Never surfaces to the visitor and never blanks the section: the committed
    // snapshot is real data, and the section prints its capture date either way.
    console.warn(
      `[github] live read failed, using snapshot from ${fallback.capturedAt}:`,
      error instanceof Error ? error.message : error,
    );
    return fallback;
  }
}
