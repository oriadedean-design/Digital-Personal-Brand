"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { Brand } from '../types';

export function BrandDetail({ brand }: { brand: Brand }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-16 md:pt-24 pb-24 md:pb-32">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16 border-b border-white/10 pb-10 md:pb-12"
      >
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{brand.role}</span>
        <h1 className="font-serif text-5xl md:text-8xl mt-3 mb-4">{brand.name}</h1>
        {brand.tagline && (
          <p className="text-neutral-400 text-lg md:text-xl max-w-xl">{brand.tagline}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-mono text-neutral-500">
          {brand.founded && <span>Founded {brand.founded}</span>}
          {brand.instagramUrl && (
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
          )}
        </div>
      </motion.header>

      {brand.description && brand.description.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="prose prose-invert prose-base md:prose-lg max-w-none mb-12 md:mb-16 text-neutral-300"
        >
          <PortableText value={brand.description} />
        </motion.div>
      )}

      {brand.accomplishments && brand.accomplishments.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-10 md:pt-12 mb-12 md:mb-16"
        >
          <h3 className="text-sm font-mono uppercase text-neutral-400 mb-6 tracking-widest">Highlights</h3>
          <div className="space-y-6">
            {brand.accomplishments.map((a, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-baseline md:gap-4 border-b border-white/5 pb-5 last:border-0">
                {a.year && <span className="text-xs font-mono text-neutral-600 shrink-0 md:w-16">{a.year}</span>}
                <div>
                  <h4 className="font-serif text-xl text-white">{a.title}</h4>
                  {a.detail && <p className="text-sm text-neutral-400 mt-1">{a.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {brand.gallery && brand.gallery.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16">
          {brand.gallery.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-lg overflow-hidden"
            >
              <Image
                src={img.url}
                alt={img.alt}
                width={img.width || 1200}
                height={img.height || 800}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      )}

      {brand.pressLinks && brand.pressLinks.length > 0 && (
        <div className="border-t border-white/10 pt-8">
          <h3 className="text-sm font-mono uppercase text-neutral-400 mb-4 tracking-widest">Press</h3>
          <div className="flex flex-wrap gap-3">
            {brand.pressLinks.map((p, idx) => (
              <a
                key={idx}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white border border-white/10 rounded-full px-4 py-2 transition-colors"
              >
                {p.label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
