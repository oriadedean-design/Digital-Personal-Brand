"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import type { InstagramReel } from '../data/portfolio';

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function InstagramEmbeds({ reels }: { reels: InstagramReel[] }) {
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds.process()}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {reels.map((reel) => {
          const permalink = `https://www.instagram.com/reel/${reel.code}/`;
          return (
            <div key={reel.code} className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: 3,
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: 0,
                  maxWidth: 540,
                  minWidth: 280,
                  padding: 0,
                  width: '100%',
                }}
              >
                <div style={{ padding: 16 }}>
                  <a
                    href={permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2"
                    style={{ fontFamily: 'Arial,sans-serif', fontSize: 14, color: '#3897f0', textDecoration: 'none' }}
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </div>
          );
        })}
      </div>
    </>
  );
}
