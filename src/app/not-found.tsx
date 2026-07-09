"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Glitch Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
         <span className="text-[40vw] font-serif font-bold leading-none">404</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-6"
      >
        <div className="inline-flex items-center gap-2 text-neutral-500 mb-6 border border-neutral-800 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="font-mono text-[10px] uppercase tracking-widest">Error 404: Data Corrupted</span>
        </div>

        <h1 className="font-serif text-6xl md:text-9xl text-white mb-2">Redacted</h1>
        
        <p className="text-neutral-400 font-mono text-xs md:text-sm tracking-wide max-w-md mx-auto leading-relaxed mb-12">
          The file you are attempting to access does not exist within the infinite archive. It may have been moved, deleted, or classified by the administrator.
        </p>

        <Link 
          href="/work" 
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:bg-neutral-200"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest relative z-10">Return to Archive</span>
        </Link>
      </motion.div>
    </div>
  );
}
