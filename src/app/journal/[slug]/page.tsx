import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JOURNAL } from '../../../constants';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return JOURNAL.map((entry) => ({ slug: entry.slug }));
}

export default function JournalPostPage({ params }: Props) {
  const entry = JOURNAL.find((e) => e.slug === params.slug);

  if (!entry) notFound();

  const paragraphs = entry.content.split('\n\n').filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 pt-8 md:pt-16 pb-28 md:pb-24">
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest hover:text-neutral-300 transition-colors mb-10 md:mb-14"
      >
        ← Journal
      </Link>

      <header className="mb-10 md:mb-14">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
          {entry.category}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl mt-3 mb-6 leading-tight">
          {entry.title}
        </h1>
        <div className="flex items-center gap-3 pb-8 border-b border-white/10">
          <span className="font-mono text-xs text-neutral-500">{entry.date}</span>
        </div>
      </header>

      {entry.coverImage && (
        <div className="mb-10 md:mb-14 rounded-lg overflow-hidden">
          <img
            src={entry.coverImage.url}
            alt={entry.coverImage.alt}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="prose prose-invert prose-base md:prose-lg font-serif leading-relaxed text-neutral-300 max-w-none">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
