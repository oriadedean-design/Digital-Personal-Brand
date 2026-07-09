"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNAL, SITE_CONTENT } from '../../constants';
import { X, AlertCircle } from 'lucide-react';
import { client, isSanityConfigured } from '@/sanity/client';
import { JOURNAL_QUERY, toJournalEntry } from '@/sanity/queries';
import type { JournalEntry } from '../../types';

export default function Journal() {
  const [entries, setEntries]           = useState<JournalEntry[]>(JOURNAL);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isLoading, setIsLoading]       = useState(false);
  const [hasError, setHasError]         = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return;
    setIsLoading(true);
    client.fetch(JOURNAL_QUERY)
      .then((data) => {
        if (data && data.length > 0) setEntries(data.map(toJournalEntry));
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const activeEntry = entries.find(j => j.id === selectedEntry);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = selectedEntry ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedEntry]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-12 pb-28 md:pb-12">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <h1 className="font-serif text-4xl md:text-7xl">The Journal</h1>
        {hasError && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
            <AlertCircle className="w-3 h-3" /> cached
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-px">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse p-6 md:p-8 flex gap-4 border-b border-white/5">
              <div className="w-24 h-3 bg-white/5 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-white/5 rounded w-2/3" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-px bg-white/10 border-y border-white/10">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              onClick={() => setSelectedEntry(entry.id)}
              className="group relative bg-background hover:bg-white/5 transition-colors cursor-pointer p-5 md:p-8 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-4"
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <span className="font-mono text-xs text-neutral-500 shrink-0 md:w-32">{entry.date}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-xl md:text-3xl group-hover:italic transition-all truncate md:whitespace-normal">{entry.title}</h2>
                <p className="text-neutral-500 mt-1 md:mt-2 text-sm line-clamp-1 md:line-clamp-none">{entry.excerpt}</p>
              </div>
              <span className="font-mono text-xs text-neutral-600 border border-white/5 px-2 py-1 rounded uppercase self-start shrink-0">
                {entry.category}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reader Drawer */}
      <AnimatePresence>
        {activeEntry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setSelectedEntry(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 280 }}
              className="fixed top-0 right-0 w-full md:w-[600px] h-full bg-neutral-900 border-l border-white/10 z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-6 md:p-12">
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:bg-white/10 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <div className="mt-10 md:mt-12">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">{activeEntry.category}</span>
                  <h2 className="font-serif text-3xl md:text-5xl mt-3 md:mt-4 mb-6 md:mb-8 leading-tight">{activeEntry.title}</h2>

                  <div className="flex items-center gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/10">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 overflow-hidden shrink-0">
                      <img
                        src={SITE_CONTENT.about.portraitImage.url}
                        alt="Dean"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dean Oriade</p>
                      <p className="text-xs text-neutral-500">{activeEntry.date}</p>
                    </div>
                  </div>

                  {activeEntry.coverImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6 md:mb-8 rounded-lg overflow-hidden"
                    >
                      <img
                        src={activeEntry.coverImage.url}
                        alt={activeEntry.coverImage.alt}
                        className="w-full h-auto"
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                      />
                    </motion.div>
                  )}

                  <div className="prose prose-invert prose-base md:prose-lg font-serif leading-relaxed text-neutral-300">
                    <p>{activeEntry.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
