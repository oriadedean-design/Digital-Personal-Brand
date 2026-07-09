"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import type { Project, JournalEntry } from '../types';
import { VideoFacade } from './VideoFacade';

export function ProjectDetailView({
  project,
  nextProject,
  relatedJournal,
}: {
  project: Project;
  nextProject: Project | null;
  relatedJournal: JournalEntry | null;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-0 pt-16 md:pt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 items-end"
      >
        <div>
          <h1 className="font-serif text-4xl md:text-7xl mb-4 md:mb-6">{project.title}</h1>
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs font-mono text-neutral-400 border-t border-white/10 pt-4">
            {project.client   && <div><span className="block text-neutral-600 mb-1">CLIENT</span>{project.client}</div>}
            {project.year     && <div><span className="block text-neutral-600 mb-1">YEAR</span>{project.year}</div>}
            {project.category && <div><span className="block text-neutral-600 mb-1">CATEGORY</span>{project.category}</div>}
            {project.discipline       && <div><span className="block text-neutral-600 mb-1">DISCIPLINE</span>{project.discipline}</div>}
            {project.metadataCamera   && <div><span className="block text-neutral-600 mb-1">CAMERA</span>{project.metadataCamera}</div>}
            {project.metadataLocation && <div><span className="block text-neutral-600 mb-1">LOCATION</span>{project.metadataLocation}</div>}
          </div>
        </div>
        <div className="text-neutral-300 text-base md:text-lg leading-relaxed">
          {project.body && project.body.length > 0 ? (
            <div className="prose prose-invert prose-neutral max-w-none">
              <PortableText value={project.body} />
            </div>
          ) : (
            project.description
          )}
          {project.pullQuote && (
            <p className="mt-4 text-sm text-neutral-500 italic">&ldquo;{project.pullQuote}&rdquo;</p>
          )}
        </div>
      </motion.div>

      {/* Media */}
      <div className="space-y-4 md:space-y-8 mb-16 md:mb-24">
        {project.mediaType === 'video' && project.videoUrl ? (
          <VideoFacade videoUrl={project.videoUrl} thumbnail={project.videoThumbnail} title={project.title} />
        ) : (
          project.gallery.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full overflow-hidden rounded-sm"
            >
              <Image
                src={img.url}
                alt={img.alt || project.title}
                width={img.width || 1200}
                height={img.height || 800}
                sizes="(max-width: 768px) 100vw, 900px"
                className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-1000"
                loading="lazy"
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Next steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-8 md:pt-12 pb-16 md:pb-24">
        {relatedJournal && (
          <Link
            href={`/journal/${relatedJournal.slug}`}
            className="block group p-6 md:p-8 border border-white/5 bg-white/5 hover:bg-white/10 transition-all rounded-lg"
          >
            <span className="text-xs font-mono text-neutral-500 uppercase mb-2 block">Related Thought</span>
            <h3 className="font-serif text-xl md:text-2xl italic mb-2 group-hover:text-white transition-colors">{relatedJournal.title}</h3>
            <p className="text-sm text-neutral-400 line-clamp-2">{relatedJournal.excerpt}</p>
          </Link>
        )}

        {nextProject && (
          <Link
            href={`/work/project/${nextProject.slug}`}
            className="block group p-6 md:p-8 text-right relative overflow-hidden rounded-lg border border-transparent hover:border-white/10 transition-all"
          >
            <div className="absolute inset-0 bg-neutral-900 -z-10" />
            <Image
              src={nextProject.thumbnail.url}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm"
              alt=""
            />
            <div className="relative z-10">
              <span className="text-xs font-mono text-neutral-400 uppercase mb-2 block">Next Project</span>
              <h3 className="font-serif text-2xl md:text-3xl text-white">{nextProject.title}</h3>
              <div className="mt-3 md:mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest">
                View Case <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
