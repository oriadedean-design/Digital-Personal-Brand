"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { StrategyItem } from '../types';

export function StrategyDetailView({ item }: { item: StrategyItem }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-0 pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16 border-b border-white/10 pb-12 md:pb-16"
      >
        {item.image?.url && (
          <div className="w-full h-48 md:h-72 rounded-lg overflow-hidden mb-8 relative">
            <Image
              src={item.image.url}
              alt={item.image.alt || item.company}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}
        <span className="font-mono text-neutral-400 text-xs md:text-sm">{item.role} @ {item.company}</span>
        <h1 className="font-serif text-4xl md:text-7xl mt-3 md:mt-4 mb-6 md:mb-8 leading-tight">
          {item.description}
        </h1>
        {item.stat && (
          <div className="inline-block px-4 md:px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
            <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Impact</span>
            <span className="font-serif text-2xl md:text-3xl">{item.stat}</span>
          </div>
        )}
      </motion.header>

      {/* Content Sections */}
      {item.content && (
        <div className="space-y-12 md:space-y-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest mb-3 md:mb-4">01. The Challenge</h3>
            <p className="text-xl md:text-2xl leading-relaxed text-neutral-200 font-serif">
              {item.content.challenge}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest mb-3 md:mb-4">02. The Solution</h3>
            <p className="text-base md:text-lg leading-relaxed text-neutral-400">
              {item.content.solution}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest mb-3 md:mb-4">03. The Result</h3>
            <p className="text-xl md:text-2xl leading-relaxed text-white font-serif border-l-2 border-white pl-4 md:pl-6">
              {item.content.result}
            </p>
          </motion.section>
        </div>
      )}

      {/* CTA */}
      <div className="mt-20 md:mt-24 pt-10 md:pt-12 border-t border-white/10 text-center">
        <p className="font-serif text-xl md:text-2xl italic mb-5 md:mb-6">Let's build results like this.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-medium hover:scale-105 active:scale-95 transition-transform min-h-[44px]"
        >
          <Mail className="w-4 h-4" />
          Hire Me
        </Link>
      </div>
    </div>
  );
}
