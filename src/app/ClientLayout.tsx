"use client";

import React from 'react';
import { Navigation } from '../components/Navigation';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/studio')) {
    return <>{children}</>;
  }

  return (
    <MotionConfig reducedMotion="user">
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen bg-background text-text font-sans selection:bg-white/30 selection:text-white overflow-x-hidden flex flex-col">
        {/* --- CINEMATIC LAYERS (Fixed to Viewport) --- */}
        
        {/* 1. Noise Grain Overlay (Texture) */}
        <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* 2. Vignette Overlay (Focus) */}
        <div className="fixed inset-0 pointer-events-none z-[40] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* 3. Ambient Lighting (Atmosphere) */}
        <div className="fixed -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

        {/* --- MAIN STAGE --- */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex-1 w-full" 
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* --- FOOTER --- */}
        <footer className="relative z-10 w-full px-6 md:px-12 py-6 mt-auto flex justify-between items-end text-[10px] font-mono uppercase tracking-widest pb-24 md:pb-8">
          <div className="text-neutral-500">
            &copy; {new Date().getFullYear()} Dean Oriade. All Rights Reserved.
          </div>
        </footer>

        {/* --- LIQUID INTERFACE --- */}
        <Navigation />
      </div>
    </ReactLenis>
    </MotionConfig>
  );
}
