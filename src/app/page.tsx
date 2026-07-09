"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SITE_CONTENT } from '../constants';
import { ArrowRight } from 'lucide-react';
import { client, urlFor, isSanityConfigured } from '@/sanity/client';
import { HOME_QUERY } from '@/sanity/queries';

export default function Home() {
  const [homeData, setHomeData] = useState(SITE_CONTENT.home);
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isSanityConfigured) return;
    client.fetch(HOME_QUERY).then((data) => {
      if (data) {
        setHomeData({
          intro:   data.intro   || SITE_CONTENT.home.intro,
          subtext: data.subtext || SITE_CONTENT.home.subtext,
          ctaText: data.ctaText || SITE_CONTENT.home.ctaText,
          heroImage: data.heroImage
            ? { url: urlFor(data.heroImage).width(1200).format('webp').quality(80).url(), alt: 'Hero' }
            : SITE_CONTENT.home.heroImage,
        });
      }
    }).catch(console.error);
  }, []);

  const fullText = homeData.intro;

  useEffect(() => {
    let index = 0;
    let isMounted = true;
    setText('');
    setIsTypingComplete(false);

    const typeChar = () => {
      if (!isMounted) return;
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
        setTimeout(typeChar, Math.random() * 50 + 30);
      } else {
        setIsTypingComplete(true);
      }
    };
    const startDelay = setTimeout(typeChar, 800);
    return () => { isMounted = false; clearTimeout(startDelay); };
  }, [fullText]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        >
          <img
            src={homeData.heroImage.url}
            alt={homeData.heroImage.alt}
            className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
            onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
          />
        </motion.div>
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

            <h2 className="font-serif text-3xl md:text-7xl leading-[1.1] text-white mix-blend-overlay min-h-[4em] md:min-h-[2.2em]">
              {text}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
                className="inline-block w-[0.1em] h-[0.8em] bg-white ml-1 align-baseline"
              />
            </h2>

            <div className="mt-8 md:mt-12 min-h-[5rem]">
              {isTypingComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                >
                  <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md">
                    {homeData.subtext}
                  </p>
                  <button
                    onClick={() => router.push('/work')}
                    className="group relative px-6 md:px-8 py-3 md:py-4 overflow-hidden rounded-full bg-white text-black transition-all hover:bg-neutral-200 shrink-0 min-h-[44px]"
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {homeData.ctaText || 'Initialize Archive'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
