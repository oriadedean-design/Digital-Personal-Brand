"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VENTURES, SITE_CONTENT } from '../../constants';
import { ExternalLink } from 'lucide-react';
import { client, isSanityConfigured } from '@/sanity/client';
import { VENTURES_QUERY, VENTURES_META_QUERY, toVenture } from '@/sanity/queries';
import type { Venture } from '../../types';

const DEFAULT_META = SITE_CONTENT.ventures;

export default function Ventures() {
  const [ventures, setVentures] = useState<Venture[]>(VENTURES);
  const [meta, setMeta] = useState(DEFAULT_META);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return;

    Promise.all([
      client.fetch(VENTURES_QUERY),
      client.fetch(VENTURES_META_QUERY),
    ]).then(([items, metaData]) => {
      if (items && items.length > 0) setVentures(items.map(toVenture));
      if (metaData) {
        setMeta({
          title:   metaData.title   || DEFAULT_META.title,
          caption: metaData.caption || DEFAULT_META.caption,
          wink:    metaData.wink    || DEFAULT_META.wink,
        });
      }
    }).catch((err) => {
      console.error(err);
      setHasError(true);
    });
  }, []);

  return (
    <div className="flex flex-col px-4 md:px-0 pt-6 md:pt-0 pb-28 md:pb-0 md:h-[85vh]">
      <div className="mb-6 text-center md:text-left">
        <h1 className="font-serif text-4xl md:text-6xl mb-2">{meta.title}</h1>
        <p className="text-neutral-500 font-mono text-xs uppercase">{meta.caption}</p>
        {hasError && (
          <p className="text-[10px] font-mono text-neutral-700 mt-1">Showing cached data.</p>
        )}
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8">
        {ventures.map((venture, index) => (
          <motion.div
            key={venture.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-1 min-h-[60vw] md:min-h-0 group overflow-hidden rounded-2xl border border-white/5 bg-neutral-900"
          >
            <img
              src={venture.image.url}
              alt={venture.image.alt}
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />

            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-start">
              <motion.div
                className="w-full"
                initial={{ y: 8 }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h2 className="font-serif text-3xl md:text-6xl mb-2">{venture.name}</h2>
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">{venture.role}</p>
                <p className="text-neutral-300 max-w-md mb-5 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {venture.description}
                </p>
                {venture.link && (
                  <a
                    href={venture.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 min-h-[44px] md:min-h-0"
                  >
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {meta.wink && (
        <p className="text-center mt-6 text-xs text-neutral-700 italic">{meta.wink}</p>
      )}
    </div>
  );
}
