import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/content";
import { getGithubStats } from "@/lib/github";
import {
  buildPlate,
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

    </section>
  );
}
