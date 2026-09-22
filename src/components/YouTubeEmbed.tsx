"use client";

import { useState } from 'react';
import type { YouTubeVideo } from '../data/portfolio';

export function YouTubeEmbed({ id, caption, role }: YouTubeVideo) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="m-0">
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border bg-surface">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={caption}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${caption}`}
            className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, incompatible with the Sanity image loader */}
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              onError={(event) => {
                const img = event.currentTarget;
                const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                if (img.src !== fallback) img.src = fallback;
              }}
              alt={caption}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/25"
            />
            <span
              aria-hidden="true"
              className="glass-panel absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-text"
            >
              <svg width="18" height="20" viewBox="0 0 20 22" className="ml-0.5">
                <path d="M0 0 L20 11 L0 22 Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3">
        <span className="font-serif text-xl leading-tight md:text-2xl">{caption}</span>
        {role && <span className="mt-1 block font-sans text-xs text-muted">{role}</span>}
      </figcaption>
    </figure>
  );
}
