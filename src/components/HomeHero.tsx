"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { HomeData } from '../types';

const FALLBACK_INTRO = 'Photography, film, and brand strategy.';
const FALLBACK_SUBTEXT = 'Marketing strategist and filmmaker in Toronto, founder of Lotus Media and ROSSE Creative Collective.';

export function HomeHero({ data }: { data: HomeData | null }) {
  const intro = data?.intro || FALLBACK_INTRO;
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let index = 0;
    let isMounted = true;
    setText('');
    setIsTypingComplete(false);

    const typeChar = () => {
      if (!isMounted) return;
      if (index <= intro.length) {
        setText(intro.slice(0, index));
        index++;
        setTimeout(typeChar, Math.random() * 50 + 30);
      } else {
        setIsTypingComplete(true);
      }
    };
    const startDelay = setTimeout(typeChar, 800);
    return () => { isMounted = false; clearTimeout(startDelay); };
  }, [intro]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
        {data?.heroImage ? (
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          >
            <Image
              src={data.heroImage.url}
              alt={data.heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale-[30%] contrast-[1.1]"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
        )}
      </div>

      {/* Glass panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-5xl px-4 md:px-6"
      >
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />

          <div className="relative p-6 md:p-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-white/10 pb-6 gap-3">
              <div className="flex items-center gap-2 order-2 md:order-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">System: Online</span>
              </div>
              <h1 className="font-serif text-2xl md:text-4xl italic text-white order-1 md:order-2 tracking-wide">Dean Oriade</h1>
            </div>

            {/*
              The typed-out text below is purely a visual effect (aria-hidden) so
              screen readers don't hear it build up character by character. The
              sr-only span carries the real text immediately, so it's present in
              the server-rendered HTML for crawlers and assistive tech even
              before the animation runs.
            */}
            <h2 className="font-serif text-3xl md:text-7xl leading-[1.1] text-white mix-blend-overlay min-h-[4em] md:min-h-[2.2em]">
              <span className="sr-only">{intro}</span>
              <span aria-hidden="true">
                {text}
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
                  className="inline-block w-[0.1em] h-[0.8em] bg-white ml-1 align-baseline"
                />
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="mt-8 md:mt-12 min-h-[5rem] flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
            >
              <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
                {data?.subtext || FALLBACK_SUBTEXT}
              </p>
              <button
                onClick={() => router.push('/work')}
                className="group relative px-6 md:px-8 py-3 md:py-4 overflow-hidden rounded-full bg-white text-black transition-all hover:bg-neutral-200 shrink-0 min-h-[44px]"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {data?.ctaText || 'View the Work'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
