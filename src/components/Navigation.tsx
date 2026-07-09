"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Aperture, Briefcase, BookOpen, User, Mail, Layers } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/work', label: 'Archive', icon: Aperture },
  { path: '/strategy', label: 'Strategy', icon: Layers },
  { path: '/ventures', label: 'Ventures', icon: Briefcase },
  { path: '/journal', label: 'Journal', icon: BookOpen },
  { path: '/about', label: 'Story', icon: User },
  { path: '/contact', label: 'Connect', icon: Mail },
];

export const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.5 }}
        className="relative flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-1.5 md:py-2 rounded-full"
      >
        {/* Liquid Glass Background Layer */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />
        
        {/* Items */}
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative z-10 group"
            >
              <motion.div
                className={`relative p-2 md:p-3 rounded-full transition-all duration-300 flex items-center justify-center
                  ${isActive ? 'text-black' : 'text-neutral-400 hover:text-white'}
                `}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Active Indicator (The Pill) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover Spotlight (Invisible unless hovering inactive) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200" />
                )}

                <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
              </motion.div>
              
              {/* Tooltip - Floating Label */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 scale-90 group-hover:scale-100 origin-bottom">
                <div className="px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-widest uppercase text-black bg-white/90 backdrop-blur-md shadow-lg whitespace-nowrap">
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};