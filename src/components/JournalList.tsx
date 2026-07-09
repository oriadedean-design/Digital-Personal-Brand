"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { JournalEntry } from '../types';

export function JournalList({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-12 pb-28 md:pb-12">
      <div className="flex items-center justify-between mb-10 md:mb-16">
        <h1 className="font-serif text-4xl md:text-7xl">The Journal</h1>
      </div>

      {entries.length === 0 ? (
        <p className="text-neutral-600 font-mono text-xs uppercase tracking-widest">No entries published yet.</p>
      ) : (
        <div className="space-y-px bg-white/10 border-y border-white/10">
          {entries.map((entry) => (
            <Link key={entry.id} href={`/journal/${entry.slug}`} className="block">
              <motion.div
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
