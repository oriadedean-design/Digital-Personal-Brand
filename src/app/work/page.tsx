"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, SITE_CONTENT } from '../../constants';
import { FilterCategory, Project } from '../../types';
import { Clock } from 'lucide-react';
import { client, isSanityConfigured } from '@/sanity/client';
import { PROJECTS_QUERY, WORK_META_QUERY, toProject } from '@/sanity/queries';

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019];
const DEFAULT_META = SITE_CONTENT.work;

export default function Work() {
  const [projects, setProjects]             = useState<Project[]>(PROJECTS);
  const [meta, setMeta]                     = useState(DEFAULT_META);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory | 'All'>('All');
  const [selectedYear, setSelectedYear]     = useState<number | null>(null);
  const [columnsCount, setColumnsCount]     = useState(3);
  const [hasError, setHasError]             = useState(false);

  useEffect(() => {
    if (!isSanityConfigured) return;

    Promise.all([
      client.fetch(PROJECTS_QUERY),
      client.fetch(WORK_META_QUERY),
    ]).then(([items, metaData]) => {
      if (items && items.length > 0) setProjects(items.map(toProject));
      if (metaData) {
        setMeta({
          title:   metaData.title   || DEFAULT_META.title,
          caption: metaData.caption || DEFAULT_META.caption,
          wink:    metaData.wink    || DEFAULT_META.wink,
        });
      }
    }).catch((err) => {
      console.error(err);
      setHasError(true);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setColumnsCount(2);
      else if (window.innerWidth < 1024) setColumnsCount(2);
      else setColumnsCount(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = useMemo(() => projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesYear     = selectedYear === null || p.year === selectedYear;
    return matchesCategory && matchesYear;
  }), [projects, selectedCategory, selectedYear]);

  const masonryColumns = useMemo(() => {
    const cols: Project[][] = Array.from({ length: columnsCount }, () => []);
    filteredProjects.forEach((p, i) => cols[i % columnsCount].push(p));
    return cols;
  }, [filteredProjects, columnsCount]);

  const toggleYear = (year: number) => setSelectedYear(prev => prev === year ? null : year);

  return (
    <div className="w-full px-4 md:px-12 pt-16 md:pt-32 min-h-screen">

      {/* Sticky filter bar */}
      <div className="sticky top-4 md:top-6 z-30 mb-8 md:mb-24">
        <div className="glass-panel rounded-full p-2 flex flex-col md:flex-row justify-between items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="pl-6 pr-4 hidden md:block whitespace-nowrap">
            <h1 className="font-serif text-xl text-white tracking-wide">{meta.title}</h1>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full w-full md:w-auto p-1 md:p-0">
            {Object.values(FilterCategory).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? 'All' : cat)}
                className={`
                  px-4 md:px-5 py-2.5 rounded-full text-[10px] font-medium uppercase tracking-widest
                  transition-all duration-300 whitespace-nowrap flex-shrink-0 min-h-[40px]
                  ${cat === selectedCategory
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {hasError && (
          <p className="text-center text-[10px] font-mono text-neutral-700 mt-2">Showing cached data.</p>
        )}

        {/* Mobile year filter */}
        <div className="md:hidden mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 rounded-full text-[10px] font-mono border min-h-[36px] ${selectedYear === null ? 'bg-white text-black border-white' : 'border-white/10 text-neutral-500'}`}
          >
            ALL TIME
          </button>
          {YEARS.map(year => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`px-4 py-2 rounded-full text-[10px] font-mono border min-h-[36px] ${selectedYear === year ? 'bg-white text-black border-white' : 'border-white/10 text-neutral-500'}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-0 md:gap-12 relative">

        {/* Desktop year sidebar */}
        <div className="hidden md:flex flex-col w-24 shrink-0 sticky top-48 self-start h-[50vh]">
          <div className="flex items-center gap-2 mb-6 text-neutral-500">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] uppercase tracking-widest font-mono">Timeline</span>
          </div>
          <div className="relative border-l border-white/10 pl-6 space-y-4">
            <motion.div
              className="absolute left-[-1px] w-[2px] bg-white"
              animate={{ height: 20, top: selectedYear ? YEARS.indexOf(selectedYear) * 36 + 2 : -100, opacity: selectedYear ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => toggleYear(year)}
                className={`block text-left font-serif text-xl transition-all duration-300 relative group ${selectedYear === year ? 'text-white scale-110 origin-left' : 'text-neutral-600 hover:text-neutral-300'}`}
              >
                {year}
                <span className="absolute -left-[29px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-50 transition-opacity" />
              </button>
            ))}
            <button
              onClick={() => setSelectedYear(null)}
              className={`block text-left font-mono text-[10px] uppercase tracking-widest mt-8 transition-colors ${selectedYear === null ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
            >
              View All
            </button>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="flex-1 min-h-[50vh]">
          <div
            className="grid gap-2 md:gap-8 items-start"
            style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}
          >
            {masonryColumns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-2 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {column.map((project, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.2, 0.65, 0.3, 0.9] }}
                      key={project.id}
                      className="group relative w-full"
                    >
                      <Link href={`/work/project/${project.slug}`} className="block w-full">
                        <div className="relative overflow-hidden rounded-sm bg-neutral-900 transition-transform duration-700 hover:-translate-y-1">
                          <div className="relative">
                            <img
                              src={project.thumbnail.url}
                              alt={project.thumbnail.alt}
                              className="w-full h-auto object-cover grayscale contrast-[1.1] group-hover:grayscale-0 transition-all duration-700 ease-in-out will-change-transform"
                              loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).classList.add('opacity-0'); }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                          </div>

                          <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                            <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                              <span className="inline-block px-2 py-1 rounded border border-white/20 bg-black/30 backdrop-blur-md text-[9px] font-mono uppercase tracking-widest text-white mb-2">
                                {project.year}
                              </span>
                              <h3 className="font-serif text-2xl md:text-3xl text-white leading-none mb-1">{project.title}</h3>
                              <p className="text-xs text-neutral-300 font-mono uppercase tracking-wider">{project.category}</p>
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full group-hover:opacity-0 transition-opacity duration-300">
                            <div className="flex justify-between items-end border-t border-white/20 pt-3 md:pt-4">
                              <h3 className="font-serif text-base md:text-lg text-white/80">{project.title}</h3>
                              <span className="text-[10px] font-mono uppercase text-neutral-500">{project.category}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-[40vh] flex flex-col items-center justify-center text-neutral-600 border border-white/5 rounded-lg mt-8"
            >
              <p className="font-serif text-2xl italic mb-2">Silence.</p>
              <p className="font-mono text-xs uppercase tracking-widest">
                {selectedYear ? `No archives found in ${selectedYear}.` : 'No archives found.'}
              </p>
              {selectedYear && (
                <button onClick={() => setSelectedYear(null)} className="mt-4 text-xs underline hover:text-white transition-colors">
                  Reset Timeline
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="h-32" />
    </div>
  );
}
