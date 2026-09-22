import type { Metadata } from 'next';
import { hero, contactLinks, startHere, portfolioSections } from '../../data/portfolio';
import { YouTubeEmbed } from '../../components/YouTubeEmbed';
import { InstagramEmbeds } from '../../components/InstagramEmbeds';

export const metadata: Metadata = {
  title: 'Portfolio | Dean Oriade',
  description:
    'Video and photo portfolio by Dean Oriade — program recaps, social content, and interviews for arts, film, and community organizations in the Greater Toronto Area.',
  alternates: { canonical: '/portfolio' },
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-32 pt-16 md:px-6 md:pb-36 md:pt-28">
      <header className="mb-16 border-b border-border pb-12 md:mb-20 md:pb-16">
        <p className="mb-6 font-sans text-xs uppercase tracking-widest text-muted md:mb-8">{hero.label}</p>
        <h1 className="mb-6 font-serif text-6xl leading-[0.95] tracking-tight sm:text-7xl md:mb-8 md:text-8xl lg:text-9xl">
          {hero.name}
        </h1>
        <p className="mb-8 max-w-2xl font-serif text-xl leading-snug text-text md:mb-10 md:text-2xl lg:text-3xl">
          {hero.intro}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
          {contactLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`glass-panel inline-flex min-h-[44px] items-center rounded-full px-[18px] font-sans text-sm text-text transition-colors hover:bg-white/[0.08] ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <main className="space-y-16 md:space-y-20">
        <section aria-labelledby="start-here">
          <div className="mb-8 md:mb-10">
            <h2 id="start-here" className="mb-3 font-serif text-4xl md:text-5xl">
              {startHere.heading}
            </h2>
            <p className="max-w-xl text-base text-muted md:text-lg">{startHere.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {startHere.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-panel group flex min-h-[170px] flex-col justify-between gap-8 rounded-md p-7 transition-colors hover:bg-white/[0.07] ${focusRing}`}
              >
                <span className="font-serif text-2xl leading-snug md:text-3xl">{link.title}</span>
                <span className="font-sans text-xs uppercase tracking-wide text-muted">{link.subtitle}</span>
              </a>
            ))}
          </div>
        </section>

        {portfolioSections.map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="border-t border-border pt-16 md:pt-20">
            <div className="mb-8 md:mb-10">
              <h2 id={section.id} className="mb-3 font-serif text-4xl md:text-5xl">
                {section.heading}
              </h2>
              <p className="max-w-xl text-base text-muted md:text-lg">{section.description}</p>
            </div>

            {section.videos && section.videos.length > 0 && (
              <div
                className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 ${
                  section.reels && section.reels.length > 0 ? 'mb-10 md:mb-12' : ''
                }`}
              >
                {section.videos.map((video) => (
                  <YouTubeEmbed key={video.id} {...video} />
                ))}
              </div>
            )}

            {section.reels && section.reels.length > 0 && <InstagramEmbeds reels={section.reels} />}
          </section>
        ))}
      </main>
    </div>
  );
}
