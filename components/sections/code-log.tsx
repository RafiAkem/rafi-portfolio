import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/content";
import { getGithubStats } from "@/lib/github";
import {
  buildPlate,
  longDate,
  megabytes,
  percent,
  thousands,
  topLanguages,
} from "@/lib/contributions";
import { Reveal } from "@/components/reveal";
import { ContributionPlate } from "@/components/contribution-plate";

/**
 * Public code, reported rather than advertised.
 *
 * Two figures do the work here and neither is a scoreboard number. Language
 * share by bytes is the load-bearing one: it turns "Fullstack Web & AI
 * Developer" from an assertion into something a reader can check. The activity
 * plate is the second, and it is only defensible next to the scope note above
 * it, because public repositories are not where the client work lives.
 *
 * Deliberately absent: followers, stars, streaks, current activity, and
 * account age. Every one of them measures audience or discipline rather than
 * work, and printing a weak number beside three shipped products costs more
 * than leaving it out. Share by repository count is absent for a different
 * reason: it is real, and it is misleading.
 *
 * The section is not in the nav. A nav entry would give a contribution graph
 * the same billing as the products, which is not the claim being made.
 */
export async function CodeLog() {
  const stats = await getGithubStats();
  const plate = buildPlate(stats.days);
  const { head, rest } = topLanguages(stats.languages);
  const rows = rest ? [...head, rest] : head;

  return (
    <section
      id="kode"
      className="mx-auto max-w-[1360px] px-5 py-24 sm:px-10 lg:py-36"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <p className="folio-caps text-faint">GitHub · {profile.handle}</p>
            <h2 className="display mt-3 text-[clamp(1.625rem,3.4vw,2.75rem)]">
              Catatan kode
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="folio-caps inline-flex items-center gap-2 border border-border-strong px-4 py-2.5 whitespace-nowrap transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Profil GitHub
            <ArrowUpRight size={12} weight="bold" aria-hidden />
          </a>
        </div>
      </Reveal>

      <Reveal>
        {/* The entire honesty burden of the section sits in this paragraph:
            scope stated once, factually, then the page moves on. */}
        <p className="measure mt-10 text-[1.0625rem] leading-[1.7] text-muted lg:mt-12">
          Angka di bawah dibaca langsung dari GitHub dan hanya mencakup repositori
          publik. Sebagian besar pekerjaan klien dan produk yang sedang berjalan
          tersimpan di repositori privat, jadi yang tergambar di sini adalah ritme
          kerja, bukan seluruh keluaran.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-16 border-t border-border pt-8 lg:mt-20">
          <h3 className="display-sm text-[1.25rem]">Aktivitas 12 bulan</h3>

          <div className="mt-6">
            <ContributionPlate
              plate={plate}
              totalContributions={stats.totalContributions}
              activeDays={stats.activeDays}
              rangeStart={stats.rangeStart}
              rangeEnd={stats.rangeEnd}
            />
          </div>

        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 border-t border-border pt-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <h3 className="display-sm text-[1.25rem]">Komposisi bahasa</h3>

          {/* A ruler, not a bar chart: a hairline the full width of the column
              with the measured span inked over it, the way a printed table
              rules its own figures. */}
          <table className="mt-7 w-full border-collapse">
            <caption className="sr-only">
              Komposisi bahasa berdasarkan volume kode di {stats.publicRepos} repositori
              publik non-fork
            </caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Bahasa</th>
                <th scope="col">Porsi</th>
                <th scope="col">Volume</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((language) => (
                <tr key={language.name} className="group align-middle">
                  <th
                    scope="row"
                    className="w-[9.5rem] py-3 pr-4 text-left text-[1rem] font-normal transition-colors duration-200 group-hover:text-accent"
                  >
                    {language.name}
                  </th>
                  <td className="py-3">
                    <span className="relative block h-px w-full bg-border">
                      <span
                        className="absolute left-0 top-1/2 block h-[2px] -translate-y-1/2 bg-accent transition-[height] duration-200 group-hover:h-[3px]"
                        style={{ width: `${Math.max(language.share * 100, 0.4)}%` }}
                      />
                    </span>
                  </td>
                  <td className="folio w-[4.5rem] py-3 pl-4 text-right tabular-nums text-muted">
                    {percent(language.share)}%
                    <span className="sr-only">, {thousands(language.bytes)} byte</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* The base every percentage above is a share of. A percentage
              printed without its denominator is the most respectable-looking
              lie available in a chart. */}
          <p className="measure folio mt-6 border-t border-border pt-4 text-faint">
            Dihitung dari volume kode ({thousands(stats.totalBytes)} byte,{" "}
            {megabytes(stats.totalBytes)}) di {stats.publicRepos} repositori publik
            non-fork, bukan dari jumlah repositori, yang akan didominasi berkas
            latihan kuliah.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
          <p className="measure-tight text-[1.0625rem] leading-[1.7]">
            Setengahnya TypeScript dan seperlimanya PHP: Next.js di sisi antarmuka,
            Laravel di sisi server. Sisanya C#, ShaderLab, dan HLSL, yang datang dari
            proyek Unity di luar kerja web.
          </p>

          <p className="folio mt-8 border-t border-border pt-4 text-faint">
            Sumber: GitHub API. Terakhir dibaca {longDate(stats.capturedAt)}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
