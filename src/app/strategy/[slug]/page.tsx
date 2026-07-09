"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../../../constants';
import { ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { client, isSanityConfigured } from '@/sanity/client';
import { STRATEGY_QUERY, toStrategyItem } from '@/sanity/queries';
import type { StrategyItem } from '../../../types';

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-0 pb-24 animate-pulse">
      <div className="h-4 w-32 bg-white/5 rounded mb-10" />
      <div className="mb-16 border-b border-white/10 pb-16 space-y-4">
        <div className="h-3 w-40 bg-white/5 rounded" />
        <div className="h-14 bg-white/5 rounded w-3/4" />
        <div className="h-14 bg-white/5 rounded w-1/2" />
        <div className="h-16 w-48 bg-white/5 rounded-lg mt-4" />
      </div>
      <div className="space-y-16">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-3">
            <div className="h-3 w-32 bg-white/5 rounded" />
            <div className="h-6 bg-white/5 rounded" />
            <div className="h-6 bg-white/5 rounded w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-0">
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-neutral-500 hover:text-white mb-12 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest">Back to Film Strip</span>
      </button>
      <div className="flex flex-col items-center justify-center h-[40vh] text-center">
        <AlertCircle className="w-8 h-8 text-neutral-600 mb-4" />
        <p className="font-serif text-2xl italic text-neutral-500 mb-2">Case study not found.</p>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-700">This entry could not be located.</p>
      </div>
    </div>
  );
}

export default function StrategyDetail() {
  const params  = useParams();
  const slug    = params?.slug as string;
  const router  = useRouter();

  const [item, setItem]       = useState<StrategyItem | null>(
    RESUME_DATA.find(i => i.slug === slug) || null
  );
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    if (!isSanityConfigured) {
      setItem(RESUME_DATA.find(i => i.slug === slug) || null);
      setLoading(false);
      return;
    }

    client.fetch(STRATEGY_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          const found = data.map(toStrategyItem).find((s: StrategyItem) => s.slug === slug);
          if (found) setItem(found);
          else setItem(RESUME_DATA.find(i => i.slug === slug) || null);
        } else {
          setItem(RESUME_DATA.find(i => i.slug === slug) || null);
        }
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
        setItem(RESUME_DATA.find(i => i.slug === slug) || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSkeleton />;
  if (!item || !item.content) return <NotFound onBack={() => router.push('/strategy')} />;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-0 pt-8 md:pt-0 pb-24">
      <button
        onClick={() => router.push('/strategy')}
        className="group flex items-center gap-2 text-neutral-500 hover:text-white mb-10 md:mb-12 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest">Back to Film Strip</span>
      </button>

      {hasError && (
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-6">
          <AlertCircle className="w-3 h-3" /> Showing cached data
        </div>
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16 border-b border-white/10 pb-12 md:pb-16"
      >
        {item.image?.url && (
          <div className="w-full h-48 md:h-72 rounded-lg overflow-hidden mb-8 relative">
            <img
              src={item.image.url}
              alt={item.image.alt || item.company}
              className="w-full h-full object-cover opacity-40"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}
        <span className="font-mono text-neutral-400 text-xs md:text-sm">{item.role} @ {item.company}</span>
        <h1 className="font-serif text-4xl md:text-7xl mt-3 md:mt-4 mb-6 md:mb-8 leading-tight">
          {item.description}
        </h1>
        <div className="inline-block px-4 md:px-6 py-3 bg-white/5 border border-white/10 rounded-lg">
          <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">Impact</span>
          <span className="font-serif text-2xl md:text-3xl">{item.stat}</span>
        </div>
      </motion.header>

      {/* Content Sections */}
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

      {/* CTA */}
      <div className="mt-20 md:mt-24 pt-10 md:pt-12 border-t border-white/10 text-center">
        <p className="font-serif text-xl md:text-2xl italic mb-5 md:mb-6">Want results like this?</p>
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
