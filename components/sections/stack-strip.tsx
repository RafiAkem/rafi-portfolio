import { stack } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/**
 * Brand marks come from the Simple Icons CDN and are used as CSS masks, so a
 * single element per logo picks up the current text color in both themes.
 * To go offline, vendor the SVGs into /public/logos and swap the mask URL.
 */
export function StackStrip() {
  return (
    <section
      aria-label="Teknologi yang sehari-hari saya pakai"
      className="border-y border-border"
    >
      <Reveal className="mx-auto max-w-[1360px] px-5 py-9 sm:px-10 sm:py-10">
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-14">
          {stack.map((tech) => {
            const url = `https://cdn.simpleicons.org/${tech.slug}`;
            return (
              <li key={tech.slug}>
                <span
                  role="img"
                  aria-label={tech.name}
                  className="block size-6 bg-faint transition-colors duration-300 hover:bg-text sm:size-7"
                  style={{
                    maskImage: `url(${url})`,
                    WebkitMaskImage: `url(${url})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
