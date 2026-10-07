import { getGithubStats } from "@/lib/github";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { StackStrip } from "@/components/sections/stack-strip";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { CodeLog } from "@/components/sections/code-log";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

// Full-static baked a stale contribution snapshot into index.html forever
// (build-time fetch on the runner has no GITHUB_TOKEN). ISR keeps it fresh:
// the VPS re-renders every 5 min using the runtime token from .env.local.
export const revalidate = 300;

export default async function Page() {
  const stats = await getGithubStats();

  return (
    <>
      <SmoothScroll />
      <SiteNav />
      <main>
        <Hero />
        <StackStrip />
        <About />
        <Projects />
        <Experience />
        <CodeLog stats={stats} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
