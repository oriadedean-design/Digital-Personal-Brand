"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

function toEmbedUrl(videoUrl: string): string | null {
  const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  const ytMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;

  return null;
}

export function VideoFacade({
  videoUrl,
  thumbnail,
  title,
}: {
  videoUrl: string;
  thumbnail?: { url: string; alt: string };
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);

  if (playing && embedUrl) {
    return (
      <div className="w-full aspect-video rounded-sm overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      disabled={!embedUrl}
      className="group relative w-full aspect-video rounded-sm overflow-hidden bg-neutral-900 block"
      aria-label={`Play video: ${title}`}
    >
      {thumbnail ? (
        <Image src={thumbnail.url} alt={thumbnail.alt} fill sizes="(max-width: 768px) 100vw, 900px" className="object-cover" />
      ) : (
        <div className="w-full h-full bg-neutral-900" />
      )}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-black fill-black ml-1" />
        </div>
      </div>
    </button>
  );
}
