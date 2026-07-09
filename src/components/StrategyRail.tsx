"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { StrategyItem, PageMeta } from '../types';

export function StrategyRail({ items, meta }: { items: StrategyItem[]; meta: PageMeta }) {
  return (
    <div className="flex flex-col justify-center py-8 md:py-0 md:h-[80vh]">
      <div className="mb-8 flex justify-between items-end px-4 md:px-2">
        <div>
          <h1 className="font-serif text-4xl md:text-6xl mb-2">{meta.title}</h1>
          <p className="text-neutral-500 font-mono text-xs uppercase">{meta.caption}</p>
        </div>
        {meta.wink && (
          <p className="text-xs text-neutral-600 italic hidden md:block">{meta.wink}</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-4 md:px-2 text-neutral-600 font-mono text-xs uppercase tracking-widest">
          No case studies published yet.
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 md:pb-12 px-4 md:px-2 snap-x snap-mandatory no-scrollbar">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="snap-center shrink-0 w-[88vw] md:w-[600px] relative group"
            >
              <Link
                href={`/strategy/${item.slug}`}
                className="block h-[420px] md:h-[500px] relative bg-neutral-900 rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
              >
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 88vw, 600px"
                    className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-neutral-400 border border-white/10 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                      FRAME 0{index + 1}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">{item.period}</span>
                  </div>

                  <div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-2">{item.company}</h2>
                    <p className="text-base md:text-lg text-neutral-300 mb-4">{item.role}</p>

                    {item.stat && (
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3 md:p-4 rounded-lg inline-block mb-4 md:mb-6">
                        <p className="text-xs uppercase text-neutral-400 tracking-wider mb-1">Key Metric</p>
                        <p className="font-serif text-2xl md:text-3xl text-white">{item.stat}</p>
                      </div>
                    )}

                    <p className="text-neutral-400 max-w-md mb-4 md:mb-6 line-clamp-2 text-sm md:text-base">
                      {item.description}
                    </p>

                    <span className="inline-block text-xs uppercase tracking-widest border-b border-transparent group-hover:border-white transition-all pb-1">
                      View Case Study
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          <div className="shrink-0 w-[5vw] md:w-[200px]" />
        </div>
      )}
    </div>
  );
}
